describe('Testes de Cadastro de Usuários', () => {
  const baseUrl = 'https://cisehomologa.z13.web.core.windows.net/';
  const email = 'c2@c2ss.com.br';
  const password = '123456';

  before(() => {
    cy.visit(baseUrl);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.get('.logo-sm > .text-white').should('be.visible');
  });

  beforeEach(() => {
    // Certifique-se de que o menu esteja visível antes de interagir com ele
    cy.get('.ri-user-fill').click(); 
    cy.wait(4000);
    cy.contains('Usuários').click({ force: true }); // Força o clique
    cy.wait(4000));
    cy.contains('Cadastrar').click({ force: true }); // Força o clique
  });

  it('Cadastro de usuário bem-sucedido', () => {
    cy.get('input[name="name"]').type('TesteGabriel');
    cy.get('input[name="email"]').type('testegabriel@cise.com.br');
    cy.get('input[name="password"]').type('SenhaSegura123');
    cy.contains('Adicionar Usuários').click();
    cy.contains('Usuário cadastrado com sucesso').should('be.visible');
  });

  it('Campos obrigatórios vazios', () => {
    cy.contains('Adicionar Usuários').click();
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('E-mail é obrigatório').should('be.visible');
    cy.contains('Senha é obrigatória').should('be.visible');
  });

  it('E-mail inválido', () => {
    cy.get('input[name="name"]').type('Carlos');
    cy.get('input[name="email"]').type('emailinvalido');
    cy.get('input[name="password"]').type('SenhaSegura123');
    cy.contains('Adicionar Usuários').click();
    cy.contains('Digite um e-mail válido').should('be.visible');
  });

  it('Senha muito curta', () => {
    cy.get('input[name="name"]').type('Carlos');
    cy.get('input[name="email"]').type('carlos@exemplo.com.br');
    cy.get('input[name="password"]').type('123');
    cy.contains('Adicionar Usuários').click();
    cy.contains('A senha deve ter pelo menos 8 caracteres').should('be.visible');
  });
});
