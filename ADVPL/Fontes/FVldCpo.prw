#include "totvs.ch"


user function FVldCpo()

    Local lRet := .T.

    // if( UPPER(ALLTRIM(M->BM_GRUPO)) == "ABC" , ( MsgAlert("conte�do inv�lido"), .F. ) , .T. )

    If UPPER( ALLTRIM( M->BM_GRUPO ) ) == "ABC"
        MsgAlert("conte�do inv�lido")
        lRet := .F.
    EndIf


return(lRet)
