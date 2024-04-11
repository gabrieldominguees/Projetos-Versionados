#include "totvs.ch"


/*/{Protheus.doc} FPriPrg
Meu primeiro programa
@type function
@version  
@author Marcos Aleluia
@since 07/02/2022
@return variant, return_description
/*/
user function FPriPrg()

	// Declara��o de vari�veis
	Local nNum1 := 0
	Local nNum2 := 0
	Local cOperacao := ""
	Local nResult := 0
	
	// Desenvolvimento do programa
	nNum1 := Val(FwInputBox("Digite o primeiro n�mero"))		// 10
	nNum2 := Val(FwInputBox("Digite o segundo n�mero"))			// 15
	cOperacao := FwInputBox("Informe a operacao desejada (+,-,*,/)")
	
	if cOperacao == "+"
		nResult := FSoma(nNum1,nNum2)
	endif
	
	// Encerramento
	Alert( "O resultado da operacao �: " + cValToChar(nResult) )

return()



/*/{Protheus.doc} FSoma
Efetua a soma dos dois n�meros
@type function
@version  
@author Marcos Aleluia
@since 07/02/2022
@param n1, numeric, param_description
@param n2, numeric, param_description
@return variant, return_description
/*/
static function FSoma( n1, n2 )

	Local nResult := n1 + n2

return(nResult)



