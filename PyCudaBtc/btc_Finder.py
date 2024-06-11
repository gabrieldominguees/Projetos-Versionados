import hashlib
import ecdsa
import pycuda.driver as cuda
import pycuda.autoinit
from pycuda.compiler import SourceModule
import json
import os

# Funções auxiliares para manipulação de chaves
def sha256(data):
    return hashlib.sha256(data).digest()

def ripemd160(data):
    h = hashlib.new('ripemd160')
    h.update(data)
    return h.digest()

def base58_encode(data):
    alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    num = int.from_bytes(data, 'big')
    encode = ''
    while num > 0:
        num, rem = divmod(num, 58)
        encode = alphabet[rem] + encode
    return encode

def generate_address(private_key):
    sk = ecdsa.SigningKey.from_string(private_key, curve=ecdsa.SECP256k1)
    vk = sk.get_verifying_key()
    public_key = b'\x04' + vk.to_string()
    sha256_pubkey = sha256(public_key)
    ripemd160_pubkey = ripemd160(sha256_pubkey)
    address = b'\x00' + ripemd160_pubkey
    checksum = sha256(sha256(address))[:4]
    address += checksum
    address_base58 = base58_encode(address)
    return address_base58

def save_progress(filename, progress_data):
    with open(filename, 'w') as f:
        json.dump(progress_data, f)

def load_progress(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    return {}

# Kernel CUDA
mod = SourceModule("""
__global__ void check_keys(unsigned char *result, unsigned char *target, unsigned long long start, unsigned long long end) {
    unsigned long long idx = start + blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < end) {
        // Simulate address generation (simplified for demonstration purposes)
        if (idx == *(unsigned long long*)target) {
            result[0] = 1;
        }
    }
}
""")

check_keys = mod.get_function("check_keys")

# Parâmetros
public_keys = [
    "13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so",
    "1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9",
    "1MVDYgVaSN6iKKEsbzRUAYFrYJadLYZvvZ",
    "19vkiEajfhuZ8bs8Zu2jgmC6oqZbWqhxhG",
    "1PWo3JeB9jrGwfHDNpdGK54CRas7fsVzXU",
    "1JTK7s9YVYywfm5XUH7RNhHJH1LshCaRFR",
    "12VVRNPi4SJqUTsp6FmqDqY5sGosDtysn4",
    "1FWGcVDK3JGzCC3WtkYetULPszMaK2Jksv",
    "1DJh2eHFYQfACPmrvpyWc8MSTYKh7w9eRF",
    "1Bxk4CQdqL9p22JEtDfdXMsng1XacifUtE",
    "15qF6X51huDjqTmF9BJgxXdt1xcj46Jmhb",
    "1ARk8HWJMn8js8tQmGUJeQHjSE7KRkn2t8",
    "15qsCm78whspNQFydGJQk5rexzxTQopnHZ",
    "13zYrYhhJxp6Ui1VV7pqa5WDhNWM45ARAC",
    "14MdEb4eFcT3MVG5sPFG4jGLuHJSnt1Dk2",
    "1CMq3SvFcVEcpLMuuH8PUcNiqsK1oicG2D",
    "1K3x5L6G57Y494fDqBfrojD28UJv4s5JcK",
    "1PxH3K1Shdjb7gSEoTX7UPDZ6SH4qGPrvq",
    "16AbnZjZZipwHMkYKBSfswGWKDmXHjEpSf",
    "19QciEHbGVNY4hrhfKXmcBBCrJSBZ6TaVt",
    "1EzVHtmbN4fs4MiNk3ppEnKKhsmXYJ4s74",
    "1AE8NzzgKE7Yhz7BWtAcAAxiFMbPo82NB5",
    "17Q7tuG2JwFFU9rXVj3uZqRtioH3mx2Jad",
    "1K6xGMUbs6ZTXBnhw1pippqwK6wjBWtNpL",
    "15ANYzzCp5BFHcCnVFzXqyibpzgPLWaD8b",
    "18ywPwj39nGjqBrQJSzZVq2izR12MDpDr8",
    "1CaBVPrwUxbQYYswu32w7Mj4HR4maNoJSX",
    "1CKCVdbDJasYmhswB6HKZHEAnNaDpK7W4n",
    "1PXv28YxmYMaB8zxrKeZBW8dt2HK7RkRPX",
    "1AcAmB6jmtU6AiEcXkmiNE9TNVPsj9DULf",
    "1EQJvpsmhazYCcKX5Au6AZmZKRnzarMVZu",
    "18KsfuHuzQaBTNLASyj15hy4LuqPUo1FNB",
    "15EJFC5ZTs9nhsdvSUeBXjLAuYq3SWaxTc",
    "1HB1iKUqeffnVsvQsbpC6dNi1XKbyNuqao",
    "1GvgAXVCbA8FBjXfWiAms4ytFeJcKsoyhL",
    "1824ZJQ7nKJ9QFTRBqn7z7dHV5EGpzUpH3",
    "18A7NA9FTsnJxWgkoFfPAFbQzuQxpRtCos",
    "1NeGn21dUDDeqFQ63xb2SpgUuXuBLA4WT4",
    "174SNxfqpdMGYy5YQcfLbSTK3MRNZEePoy",
]
range_start = 0x2000000000000000
range_end = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
progress_file = 'progress.json'
progress_data = load_progress(progress_file)

# Perguntar ao usuário a porcentagem inicial
start_percentage = float(input("Digite a porcentagem do range para começar (0-100): "))

# Calcular o ponto de partida com base na porcentagem
start_point = int(range_start + (range_end - range_start) * (start_percentage / 100))

# Inicializar GPU
num_blocks = 1024
threads_per_block = 256
target_key = public_keys[0].encode('utf-8')
target_key_gpu = cuda.mem_alloc(len(target_key))
cuda.memcpy_htod(target_key_gpu, target_key)
result_gpu = cuda.mem_alloc(1)

# Loop principal
for public_key in public_keys:
    current_start = progress_data.get(public_key, start_point)
    found = False
    
    while current_start < range_end and not found:
        batch_end = min(current_start + num_blocks * threads_per_block, range_end)
        check_keys(result_gpu, target_key_gpu, current_start, batch_end, block=(threads_per_block, 1, 1), grid=(num_blocks, 1))
        result = cuda.from_device(result_gpu, (1,), 'uint8')[0]
        
        if result == 1:
            print(f"Chave privada encontrada para a chave pública {public_key}")
            found = True
        else:
            current_start = batch_end
            progress_data[public_key] = current_start
            save_progress(progress_file, progress_data)
            print(f"Progresso salvo para {public_key}: {current_start}/{range_end}")

print("Busca concluída.")
