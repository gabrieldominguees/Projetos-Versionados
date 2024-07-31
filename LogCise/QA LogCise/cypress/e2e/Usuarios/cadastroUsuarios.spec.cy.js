describe('Testes de Cadastro de Usuários', () => {
    beforeEach(() => {
      cy.visit('https://cisehomologa.z13.web.core.windows.net/users/list'); // Ajuste a URL conforme necessário
      cy.contains('Cadastrar').click(); // Clica no botão para abrir o formulário de cadastro
    });
  
    it('Cadastro de usuário bem-sucedido', () => {
      cy.get('input[name="name"]').type('Carlos');
      cy.get('input[name="email"]').type('carlos@exemplo.com.br');
      cy.get('input[name="password"]').type('SenhaSegura123');
      cy.contains('Adicionar Usuários').click();
      cy.contains('Usuário cadastrado com sucesso').should('be.visible'); // Ajuste a mensagem conforme necessário
    });
  
    it('Campos obrigatórios vazios', () => {
      cy.contains('Adicionar Usuários').click();
      cy.contains('Nome é obrigatório').should('be.visible'); // Ajuste a mensagem conforme necessário
      cy.contains('E-mail é obrigatório').should('be.visible'); // Ajuste a mensagem conforme necessário
      cy.contains('Senha é obrigatória').should('be.visible'); // Ajuste a mensagem conforme necessário
    });
  
    it('E-mail inválido', () => {
      cy.get('input[name="name"]').type('Carlos');
      cy.get('input[name="email"]').type('emailinvalido');
      cy.get('input[name="password"]').type('SenhaSegura123');
      cy.contains('Adicionar Usuários').click();
      cy.contains('Digite um e-mail válido').should('be.visible'); // Ajuste a mensagem conforme necessário
    });
  
    it('Senha muito curta', () => {
      cy.get('input[name="name"]').type('Carlos');
      cy.get('input[name="email"]').type('carlos@exemplo.com.br');
      cy.get('input[name="password"]').type('123');
      cy.contains('Adicionar Usuários').click();
      cy.contains('A senha deve ter pelo menos 8 caracteres').should('be.visible'); // Ajuste a mensagem conforme necessário
    });
  });
  