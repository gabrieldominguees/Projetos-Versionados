#include "Totvs.ch"

user function zExemFor()

	Local nCnt		:= 0
	Local nSomaPar 	:= 0

	For nCnt := 0 To 10 Step 2

		nSomaPar += nCnt

	Next

	Alert( "A soma dos 100 primeiros n�meros pares s�o: " + ;
	cValToChar(nSomaPar) )

Return(Nil)
