#include "totvs.ch"

user function FPriPrg()

    // declara��o de vari�veis
    Local nNum1 := 0
    Local nNum2 := 0
    Local cOperacao := ""
    Local nResult := 0

    // Desenvolvimento do programa

    nNum1 = Val(FwInputBox('Digite o primeiro n�mero: '))
    nNum2 = Val(FwInputBox('Digite o segundo n�mero: '))
    cOperacao = FwInputBox('Digite a operacao desejada (+,-,*,/)')

    if cOperacao == "+" 
        nResult = FSoma (nNum1,nNum2)
    endif

    //Encerramento
    Alert('O resultado da operacao �: ' + cValToChar(nResult))

return ()

static function Fsoma (n1, n2)

    // declara��o de vari�veis
    Local nResult := n1 + n2

return (nResult)
