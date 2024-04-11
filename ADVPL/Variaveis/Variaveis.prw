#include "totvs.ch"

user function FPriPrg()

    // declaração de variáveis
    Local nNum1 := 0
    Local nNum2 := 0
    Local cOperacao := ""
    Local nResult := 0

    // Desenvolvimento do programa

    nNum1 = Val(FwInputBox('Digite o primeiro número: '))
    nNum2 = Val(FwInputBox('Digite o segundo número: '))
    cOperacao = FwInputBox('Digite a operacao desejada (+,-,*,/)')

    if cOperacao == "+" 
        nResult = FSoma (nNum1,nNum2)
    endif

    //Encerramento
    Alert('O resultado da operacao é: ' + cValToChar(nResult))

return ()

static function Fsoma (n1, n2)

    // declaração de variáveis
    Local nResult := n1 + n2

return (nResult)
