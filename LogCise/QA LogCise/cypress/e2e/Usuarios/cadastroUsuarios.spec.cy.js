describe('Testes de Cadastro de Usuários', () => {
  const baseUrl = 'https://cisehomologa.z13.web.core.windows.net/';
  const email = 'c2@c2ss.com.br';
  const password = '123456';
  const urlUsuarios = 'https://cisehomologa.z13.web.core.windows.net/users/list';

  before(() => {
    cy.visit(baseUrl);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(4000);
    cy.contains('h4', 'Dashboard');
  });

  beforeEach(() => {
    // Acessa a página principal
    cy.visit(urlUsuarios);
    //cy.wait(4000); // Ajuste o tempo se necessário
  
    // Agora clique nos elementos conforme necessário
    cy.xpath('//*[@id="main-side-menu"]/li[2]/a').click();
    cy.xpath('//*[@id="sidebarDashboards"]/li/a').click();
    cy.xpath('//*[@id="mainRoot"]/div[2]/div[3]/div/div/div[2]/div/div/div/div[1]/div/button').click();
  });
  

  it('Cadastro de usuário bem-sucedido', () => {
    cy.xpath('//*[@id="formGridAddress1"]').type('Gabriel TSTAUT');
    cy.xpath('//*[@id="formGridEmail"]').type('gabriel.tstaut@teste.com.br');
    cy.xpath('//*[@id="formGridPassword"]').type('senhacorreta');
    cy.get('button[type="button"]').click();
    cy.contains('Usuário cadastrado com sucesso').should('be.visible');
  });

  it('Campos obrigatórios vazios', () => {
    cy.get('button[type="button"]').click();
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('E-mail é obrigatório').should('be.visible');
    cy.contains('Senha é obrigatória').should('be.visible');
  });

  it('Cadastro com e-mail inválido', () => {
    cy.xpath('//*[@id="formGridAddress1"]').type('123@#$GaB');
    cy.xpath('//*[@id="formGridEmail"]').type('gabriel.tstaut.teste.com.br');
    cy.xpath('//*[@id="formGridPassword"]').type('s1');
    cy.get('button[type="button"]').click();
    cy.contains('Digite um e-mail válido').should('be.visible');
  });

  it('Cadastro com senha curta', () => {
    cy.xpath('//*[@id="formGridAddress1"]').type('Gabriel TSTAUT');
    cy.xpath('//*[@id="formGridEmail"]').type('gabriel.tstaut@teste.com.br');
    cy.xpath('//*[@id="formGridPassword"]').type('s1');
    cy.get('button[type="button"]').click();
    cy.contains('A senha deve ter pelo menos 8 caracteres').should('be.visible');
  });

  it('Cadastro com campos intercalados - nome preenchido', () => {
    cy.xpath('//*[@id="formGridAddress1"]').type('Gabriel TSTAUT');
    cy.get('button[type="button"]').click();
    cy.contains('E-mail é obrigatório').should('be.visible');
    cy.contains('Senha é obrigatória').should('be.visible');
  });

  it('Cadastro com campos intercalados - email preenchido', () => {
    cy.xpath('//*[@id="formGridEmail"]').type('gabriel.tstaut@teste.com.br');
    cy.get('button[type="button"]').click();
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('Senha é obrigatória').should('be.visible');
  });

  it('Cadastro com campos intercalados - senha preenchida', () => {
    cy.xpath('//*[@id="formGridPassword"]').type('senhacorreta');
    cy.get('button[type="button"]').click();
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('E-mail é obrigatório').should('be.visible');
  });

  it('Cadastro com campos intercalados - nome e email preenchidos', () => {
    cy.xpath('//*[@id="formGridAddress1"]').type('Gabriel TSTAUT');
    cy.xpath('//*[@id="formGridEmail"]').type('gabriel.tstaut@teste.com.br');
    cy.get('button[type="button"]').click();
    cy.contains('Senha é obrigatória').should('be.visible');
  });

  it('Cadastro com campos intercalados - nome e senha preenchidos', () => {
    cy.xpath('//*[@id="formGridAddress1"]').type('Gabriel TSTAUT');
    cy.xpath('//*[@id="formGridPassword"]').type('senhacorreta');
    cy.get('button[type="button"]').click();
    cy.contains('E-mail é obrigatório').should('be.visible');
  });

  it('Cadastro com campos intercalados - email e senha preenchidos', () => {
    cy.xpath('//*[@id="formGridEmail"]').type('gabriel.tstaut@teste.com.br');
    cy.xpath('//*[@id="formGridPassword"]').type('senhacorreta');
    cy.get('button[type="button"]').click();
    cy.contains('Nome é obrigatório').should('be.visible');
  });

  it('Cadastro de usuário duplicado', () => {
    cy.xpath('//*[@id="formGridAddress1"]').type('Gabriel Teste');
    cy.xpath('//*[@id="formGridEmail"]').type('planejamento@cise.com.br');
    cy.xpath('//*[@id="formGridPassword"]').type('215136');
    cy.get('button[type="button"]').click();
    cy.contains('Usuário já cadastrado').should('be.visible');
  });

  it('Excluir usuário', () => {
    cy.xpath('//*[@id="mainRoot"]/div[2]/div[3]/div/div/div[2]/div/div/div/div[2]/table/tbody/tr[3]/td[3]').click(); // botão visualizar/editar
    cy.contains('Excluir').click(); // botão excluir
    cy.contains('Usuário excluído com sucesso').should('be.visible');
  });

  // Cenário de visualização e edição pode ser adicionado aqui, se necessário
});
