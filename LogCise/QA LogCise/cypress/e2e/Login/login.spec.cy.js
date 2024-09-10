describe('Página de Login', () => {
    const baseUrl = 'https://cisehomologa.z13.web.core.windows.net/';
    const email = 'c2@c2ss.com.br';
    const password = '123456';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    it('Verifica se a página de login carrega corretamente', () => {
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('Faz login com credenciais válidas', () => {
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.contains('h4', 'Dashboard')
    });
  
    it('Tenta fazer login com credenciais inválidas', () => {
      cy.get('input[name="email"]').type('email@invalido@invalido.com.br.');
      cy.get('input[name="password"]').type('senhaerrada');
      cy.get('button[type="submit"]').click();
    });
  
    it('Tenta fazer login com campo de email vazio', () => {
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
    });
  
    it('Tenta fazer login com campo de password vazio', () => {
      cy.get('input[name="email"]').type(email);
      cy.get('button[type="submit"]').click();
    });
  });