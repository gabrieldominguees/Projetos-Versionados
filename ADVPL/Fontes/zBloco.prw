#include "totvs.ch"


/*
O que � Bloco de c�digo?

Um ClodeBlock nada mais � do que uma fun��o �inline�, 
onde podem ser declarados par�metros de entrada, e dentro 
dele podemos colocar uma ou mais express�es Advpl separadas 
por v�rgulas, como por exemplo atribui��es de valores em 
vari�veis e chamadas de fun��es ou m�todos.

Sintaxe

{ | [parm1][,parm2...N] | [expr1] [,expr2...N] }


Os par�metros s�o declarados entre um par de pipes �||�. 
Caso o CodeBlock n�o receba par�metros, usamos um par de 
pipes sem nada entre eles. As express�es ADVPL colocadas 
ap�s o par de pipes devem ser separadas por v�rgulas, e 
ser�o executadas da esquerda para a direita.

A �ltima express�o do bloco de c�digo ser� o seu retorno. 
Dentro das express�es n�o � poss�vel usar estruturas de 
programa��o, como WHILE , CASE e afins. � permitido usar 
as fun��es IF() e/ou IIF(), que veremos posteriormente.


Chamada

Para executar o CodeBlock, voc� deve usar a fun��o EVAL(), 
onde informamos no primeiro par�metro o CodeBLock ou a vari�vel 
ou propriedade onde o mesmo est� contido, e a partir do segundo 
par�metro podemos informar os par�metros que ser�o repassados 
para o CodeBlock. A fun��o Eval() retorna o resultado da �ltima 
express�o do CodeBlock executado.

*/


// CodeBlock sem par�metros, chamando uma fun��o de interface para mostrar uma caixa de di�logo com uma mensagem fixa
User Function Ola01()

    Local bCB := {|| MsgInfo("Ol� CodeBlock") }

    Eval(bCB)

Return(Nil)


// CodeBlock recebendo um par�metro, chamando uma fun��o de interface para
// mostrar uma caixa de di�logo com o texto informado na chamada.
User Function Ola02()

    Local bCB := {| cMsg | MsgInfo(cMsg) }

    Eval(bCB,"Ol� CodeBlock")
    Eval(bCB,"Adeus CodeBlock")

Return(Nil)


// CodeBlock para retornar o menor argumento, a partir de dois
// argumentos fornecidos na chamada, mostrando o resultado em uma
// caixa de di�logo no SmartClient
User Function Ola03()

    Local bCB := {| x1,x2 | IIF( X1 < x2 , x1 , x2 ) }
    Local nRet
    Local cRet

    nRet := Eval(bCB,10,5)

    MsgInfo( cValToChar(nRet),"N�mero")

    cRet := Eval(bCB,"ABC","ACD")

    MsgInfo( cRet,"String")

Return(Nil)

/*
Quando voc� cria um bloco de c�digo para seu uso, voc� define 
quantos par�metros ele deve receber, e ou qual ser� seu retorno.
Os par�metros podem ser nomeados usando a regra de nomenclatura de
vari�veis ADVPL, e o escopo dos par�metros � restrito ao corpo do
CodeBlock. Atribui��es em linha s�o permitidas no CodeBlock, inclusive
podemos passar par�metros por refer�ncia na chamada do CodeBlock,
e obter assim mais de um retorno.
*/

// Passagem de par�metros por refer�ncia para m�ltiplos retornos
User Function Ola04()

    Local bCB := {| x,y,z | y := x/2 , z := x*2 , x%2 == 0 }
    Local nTeste := 4
    Local lPar
    Local nY , nZ

    // O bloco de codigo recebe em x o valor de nTeste
    // e recebe em y e z a refer�ncia das vari�veis
    // nY e nZ respectivamente
    lPar := Eval( bCB , nTeste , @nY , @nZ )

    MsgInfo(lPar , "O numero � par ? ")
    MsgInfo(nY , "Numero / 2 ")
    MsgInfo(nZ , "Numero * 2 ")

Return(Nil)



// C�lculo da m�dia de valores em um array de n�meros
User Function Ola05()

    Local aValores := {}
    Local nSoma := 0
    Local bSoma := {| nValor , nPos | nSoma += nValor }

    aadd(aValores,3)
    aadd(aValores,4)
    aadd(aValores,3)
    aadd(aValores,10)

    aEval(aValores,bSoma)

    MsgInfo(nSoma,"Valores Somados")


/*
Repare que no exemplo acima foi feito algo diferente:
A vari�vel local nSoma foi declarada e inicializada
dentro da fun��o Ola05(), mas n�o foi passada como
par�metro para o CodeBlock, ela simplesmente foi usada
na express�o dentro do CodeBlock para acumular a soma
do elemento nValor recebido como par�metro no CodeBlock.
Logo, um code-block declarado dentro de uma fun��o pode
acessar diretamente as vari�veis locais dispon�veis nesta fun��o.
*/

Return(Nil)
