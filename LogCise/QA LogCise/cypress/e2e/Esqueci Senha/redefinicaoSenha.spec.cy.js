describe('Testes de Redefinição de Senha', () => {
    beforeEach(() => {
      cy.visit('https://cisehomologa.z13.web.core.windows.net/account/recover-password'); // Ajuste a URL conforme necessário
    });
  
    it('Redefinição de senha bem-sucedida', () => {
      cy.get('input[name="email"]').type('usuario@teste.com'); // Insira um email de teste válido
      cy.get('button[type="submit"]').click();
      cy.contains('Instruções de redefinição de senha enviadas para o seu e-mail').should('be.visible'); // Ajuste a mensagem conforme necessário
    });
  
    it('Campo de e-mail vazio', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('E-mail é obrigatório').should('be.visible'); // Ajuste a mensagem conforme necessário
    });
  
    it('E-mail inválido', () => {
      cy.get('input[name="email"]').type('emailinvalido');
      cy.get('button[type="submit"]').click();
      cy.contains('Digite um e-mail válido').should('be.visible'); // Ajuste a mensagem conforme necessário
    });
  });
  