describe('Testes de Cadastro de Usuários', () => {
  const baseUrl = 'https://cisehomologa.z13.web.core.windows.net/';
  const email = 'c2@c2ss.com.br';
  const password = '123456';
  const urlUsuarios = 'https://cisehomologa.z13.web.core.windows.net/users/list';
  const urlTransportadoras = 'https://cisehomologa.z13.web.core.windows.net/shipping-company/create';

  before(() => {
    cy.visit(baseUrl);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait(4000);
    cy.contains('h4', 'Dashboard');
    cy.select('#main-side-menu > li.side-nav-item.menuitem-active > a').click();
    //cy.xpath('//*[@id="main-side-menu"]/li[3]/a').click();
  });
  
  it('Cadastro bem-sucedido', () => {
    cy.visit(urlTransportadoras); // Ajuste a URL conforme necessário
    cy.get('input[name="nome"]').type('Transportadora Teste');
    cy.get('input[name="nome_reduzido"]').type('TranspTeste');
    cy.get('input[name="via_transporte"]').select('RODOVIARIO');
    cy.get('input[name="cep"]').type('12345-678');
    cy.get('input[name="endereco"]').type('Rua Teste, 123');
    cy.get('input[name="estado"]').type('SP');
    cy.get('input[name="municipio"]').type('São Paulo');
    cy.get('input[name="bairro"]').type('Centro');
    cy.get('input[name="complemento"]').type('Apto 101');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('99999-9999');
    cy.get('input[name="celular"]').type('99999-9999');
    cy.get('input[name="cnpj"]').type('12.345.678/0001-99');
    cy.get('input[name="email"]').type('teste@transportadora.com');
    cy.get('input[name="inscricao_estadual"]').type('123.456.789.123');
    cy.get('input[name="inscricao_municipal"]').type('123456');
    cy.get('input[name="contato"]').type('Contato Teste');
    cy.get('input[name="rntrc"]').type('12345678');
    cy.get('input[name="homepage"]').type('www.exemplo.com.br');
    cy.get('input[name="suframa"]').type('12345678');
    cy.get('select[name="coligada"]').select('1');
    cy.get('select[name="tipo_transportador"]').select('Escolha');
    cy.get('button[type="submit"]').click();
    cy.contains('Transportadora cadastrada com sucesso').should('be.visible');
    });
  
  it('Campo obrigatório vazio', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('CEP é obrigatório').should('be.visible');
    cy.contains('Endereço é obrigatório').should('be.visible');
    cy.contains('Estado é obrigatório').should('be.visible');
    cy.contains('Município é obrigatório').should('be.visible');
    cy.contains('Bairro é obrigatório').should('be.visible');
    cy.contains('DDD é obrigatório').should('be.visible');
    cy.contains('Telefone é obrigatório').should('be.visible');
    cy.contains('CNPJ é obrigatório').should('be.visible');
    cy.contains('Inscrição Estadual é obrigatória').should('be.visible');
    cy.contains('Contato é obrigatório').should('be.visible');
  });
});
  