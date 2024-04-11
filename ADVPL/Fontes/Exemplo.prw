#Include 'Protheus.ch'

User Function Exemplo()

    Local oFile     := Nil
    Local cTexto    := ""

    // Comandos para subir o ambiente do Protheus
    if select("SM0") == 0
        RpcSetType(3)
        RpcSetEnv("99","01")
    endif

    // Cria o objeto a partir da classe FWFILEWRITER
    oFile := FWFILEWRITER():new("C:\temp\ExFWFileWriter.csv")

    // Se o arquivo já existe, apaga
    If oFile:Exists()
        oFile:Erase()
    EndIf

    // Cria o arquivo
    If oFile:Create()

        //-------------- Se criou com sucesso, escreve ------------------------------
        // Abre a tabela e seta pra ela o indice 1
        ZX1->( dbSetOrder(1) )

        // Manda o ponteiro da tabela para o primeiro registro
        ZX1->( dbGoTop() )

        // Enquanto não for fim de arquivo
        while ! ZX1->( EOF() )

            cTexto :=;
                ZX1->ZX1_CODIGO             + ";" +;
                ZX1->ZX1_NOME               + ";" +;
                StrZero(ZX1->ZX1_IDADE, 2)  + ";" +;
                ZX1->ZX1_SEXO               + CRLF

            // Grava o conteúdo da variável no arquivo
            oFile:Write(cTexto)

            // Vai para o próximo registro
            ZX1->( dbSkip() )

        enddo

        // Fecha o arquivo
        oFile:Close()

    Endif

Return(Nil)
