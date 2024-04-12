#include "totvs.ch"

user function FPROG01

    Local nNumero1       := Val(FwInputBox( 'Digite o primeiro número: ' ))
    Local nNumero2       := Val(FwInputBox( 'Digite o segundo número: ' ))
    Local nSoma          := nNumero1 + nNumero2
    Local nSubtracao     := nNumero1 - nNumero2
    Local nMultiplicacao := nNumero1 * nNumero2
    Local nDivisao       := nNumero1 / nNumero2

    Private cTexto       := "Testando!"

    // Exibe a mensagem no log do Application Server
    info(cTexto)
    info("Os resultados são: Soma = " + cValToChar(nSoma) + ", Subtração = " + cValToChar(nSubtracao) + ", Multiplicação = " + cValToChar(nMultiplicacao) + ", Divisão = " + cValToChar(nDivisao) + ".");

return()





