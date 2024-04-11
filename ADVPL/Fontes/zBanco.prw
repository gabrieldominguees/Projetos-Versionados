//Bibliotecas
#include "protheus.ch"

/*/{Protheus.doc} zBanco
Exemplo de manipula��o de Banco de Dados via AdvPL
@author Aleluia
@since 29/09/2017
@version 1.0
    @example
    u_zBanco()
/*/

User function zBanco()

    local aArea     := {} //GetArea() serve para pegar a Area em mem�ria que esta aberta, RestArea() devolve a rotina sem alterar a integridade
    local aAreaB1   := {}
    local cMens     := ""
    Local cCodProd  := "000001"

    // comandos para inicializa��o do ambiente
    RpcSetType(3)
    RpcSetEnv("99","01")
    
    aArea     := GetArea() //GetA
    aAreaB1   := SB1->(GetArea())

    //Verifica se a tabela j� estiver posicionada, ou j� est� aberta! SB1 � a tabela de produtos
    // if select alias > 0 ent�o mostre a mensagem
    If Select("SB1") > 0
        MsgStop("Tabela SB1 j� est� aberta!", "Aten��o")
    EndIf

    //Selecionando a tabela de produtos ou abre a tabela
    DbSelectArea("SB1")
    SB1->(DbSetOrder(1)) 	//B1_FILIAL+B1_COD	//DbSetOrder(1) posiciona o indicie 1
    SB1->(DbGoTop())		//Posiciona no topo da tabela ou no primeiro registro que encontrar

    //Posicionando no produto de c�digo cCodProd, percorre o resultado para pegar a filial corrente com o FWxFilial("SB1") e o produto de c�dito
    //cCodProd, se eu conseguir dar um seek nele, ou seja se eu conseguir achar esse registro, dou um alert do campo descri�ao do produto,
    //com o campo B1_DESC
    If SB1->(DbSeek(FWxFilial("SB1") + cCodProd))
        Alert(SB1->B1_DESC)
    EndIf

    //Agora, percorro todos os registros e adiciono a descri��o em uma vari�vel
    //Enquanto n�o for final do arquivo -> EoF()
    //variavel cMens recebe a descri��o do produto e com uma quebra de linha
    //depois o comando DbSkip() serve para pular o registro atual
    SB1->(DbGoTop())
    While ! SB1->( EoF() )
        cMens += Alltrim( SB1->B1_DESC ) + ";" + CRFL

        SB1->(DbSkip())
    EndDo

    //Mostrando a mensagem
    Aviso('Aten��o', cMens, {'OK'}, 03)

    RestArea(aAreaB1)
    RestArea(aArea)
Return

/*
O ideal de usar refer�ncias: EX: SB1->(EoF())
Modo Errado:
    DbSelectArea("SB1")

    While ! EoF()
        //Tratamentos para o relat�rio....

        DbSelectArea("SB2")
        //Pega o saldo do produto

        DbSkip()
    EndDo

Modo Certo:
    DbSelectArea("SB1")
    DbSelectArea("SB2")

    //Referencia a tabela de produtos
    While ! SB1->(EoF())
        //Tratamentos para o relat�rio....

        DbSelectArea("SB2")
        //Pega o saldo do produto

        SB1->(DbSkip())
    EndDo
*/
