describe('Testes de Cadastro de Ajudante', () => {
    beforeEach(() => {
      cy.visit('https://cisehomologa.z13.web.core.windows.net/'); // Ajuste a URL conforme necessário
      // Realizar login para acessar a página de cadastro
      cy.get('input[name="email"]').type('c2@c2ss.com.br');
      cy.get('input[name="senha"]').type('123456');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/pagina-principal'); // Ajuste a URL conforme necessário
      cy.visit('/assistants/create'); // Ajuste a URL conforme necessário
    });
  
    it('Cadastro bem-sucedido', () => {
      cy.get('input[name="nome"]').type('Ajudante Teste');
      cy.get('input[name="nome_reduzido"]').type('AjTeste');
      cy.get('input[name="cep"]').type('12345-678');
      cy.get('input[name="endereco"]').type('Rua Teste, 123');
      cy.get('input[name="bairro"]').type('Centro');
      cy.get('input[name="estado"]').type('SP');
      cy.get('input[name="municipio"]').type('São Paulo');
      cy.get('input[name="cpf"]').type('123.456.789-00');
      cy.get('input[name="telefone"]').type('99999-9999');
      cy.get('button[type="submit"]').click();
      cy.contains('Ajudante cadastrado com sucesso').should('be.visible');
    });
  
    it('Campo obrigatório vazio', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Nome é obrigatório').should('be.visible');
      cy.contains('Nome Reduzido é obrigatório').should('be.visible');
      cy.contains('CEP é obrigatório').should('be.visible');
      cy.contains('Endereço é obrigatório').should('be.visible');
      cy.contains('Bairro é obrigatório').should('be.visible');
      cy.contains('Estado é obrigatório').should('be.visible');
      cy.contains('Município é obrigatório').should('be.visible');
      cy.contains('CPF é obrigatório').should('be.visible');
      cy.contains('Telefone é obrigatório').should('be.visible');
    });
  });
  