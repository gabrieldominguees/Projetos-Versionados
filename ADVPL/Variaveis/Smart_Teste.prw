#include "totvs.ch"

user function FPROG01

    Local nNumero1       := Val(FwInputBox( 'Digite o primeiro n�mero: ' ))
    Local nNumero2       := Val(FwInputBox( 'Digite o segundo n�mero: ' ))
    Local nSoma          := nNumero1 + nNumero2
    Local nSubtracao     := nNumero1 - nNumero2
    Local nMultiplicacao := nNumero1 * nNumero2
    Local nDivisao       := nNumero1 / nNumero2

    Private cTexto       := "Testando!"

    // Exibe a mensagem no log do Application Server
    info(cTexto)
    info("Os resultados s�o: Soma = " + cValToChar(nSoma) + ", Subtra��o = " + cValToChar(nSubtracao) + ", Multiplica��o = " + cValToChar(nMultiplicacao) + ", Divis�o = " + cValToChar(nDivisao) + ".");

return()





