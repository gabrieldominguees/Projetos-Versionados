#include "totvs.ch"


User Function TesteCad()

    // Local aRotAdic  := {}
    // Local bPre      := { || u_fMyFunc()}
    // Local bOK       := { || MsgAlert('Chamada ao clicar em OK'), .T.}
    // Local bTTS      := { || MsgAlert('Chamada durante transacao')}
    // Local bNoTTS    := { || MsgAlert('Chamada ap�s transacao')}
    // Local aButtons  := {}//adiciona bot�es na tela de inclus�o, altera��o, visualiza��o e exclusao

    // aadd(aButtons, { "PRODUTO", {|| MsgAlert("Teste")}, "Teste", "Bot�o Teste" }  ) //adiciona chamada no aRotina
    // aadd(aRotAdic, { "Adicional","U_Adic", 0 , 6 })
    // aadd(aRotAdic, { "Adicional_2","Alert('7a funcao')", 0 , 7 })

    AxCadastro("SBM", "Clientes", "U_DelOk()", "U_COK()", /*aRotAdic*/, /*bPre*/, /*bOK*/, /*bTTS*/, /*bNoTTS*/,Nil,Nil, /*aButtons*/,Nil,Nil )
    // AxCadastro("SA1", "Clientes",,,,,bOK)
    // AxCadastro:(cAlias, cTitle, cDel, cOk, aRotAdic, bPre, bOK, bTTS, bNoTTS, aAuto, nOpcAuto, aButtons, aACS, cTela, lMenuDef)

Return()


User Function DelOk()
    MsgAlert("Chamada antes do delete")
Return


User Function COK()
    MsgAlert("Clicou botao OK")
Return .t.


// User Function Adic()
//     MsgAlert("Rotina adicional")
// Return


// user function fMyFunc()
//     Alert( "Chamada My Func" )
// return()
