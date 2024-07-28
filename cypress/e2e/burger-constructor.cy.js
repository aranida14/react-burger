import { TEST_URL, BASE_URL } from "../../src/utils/constants";

describe('burger constructor', function() {

  const dropContainer = '[data-cy="dropTarget"]';
  const ingredientCard = '[data-cy^="ingredient"]';

  beforeEach('should be available on localhost:3000', function() {
    cy.intercept("GET", `${BASE_URL}/ingredients`, {
      fixture: "ingredients",
    });
    cy.intercept("GET", `${BASE_URL}/auth/user`, {
      fixture: "user",
    });
    cy.intercept("POST", `${BASE_URL}/orders`, {
      fixture: "order",
    });  

    // Устанавливаем токены:
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    window.localStorage.setItem(
      "accessTokem",
      JSON.stringify("test-accessToken")
    );

    cy.visit(TEST_URL);
  });
  
  it('should drag ingredients', () => {
    cy.get(ingredientCard).contains('div', 'булка').trigger('dragstart');
    cy.get(dropContainer).trigger('drop');
    cy.get(ingredientCard).contains('div', 'Соус').trigger('dragstart');
    cy.get(dropContainer).trigger('drop');
    cy.get(ingredientCard).contains('div', 'Мясо').trigger('dragstart');
    cy.get(dropContainer).trigger('drop');

    cy.get(dropContainer).contains('булка');
    cy.get(dropContainer).contains('Соус');
    cy.get(dropContainer).contains('Мясо');
  });

  it('open and close ingredient modal by button click', () => {
    cy.get(ingredientCard).contains('div', 'булка').click();
    cy.get('[class^=modal_closeBtn]').click();
    cy.get('#modal-root').should('not.have.descendants');
  });

  it('open and close ingredient modal by overlay click', () => {
    cy.get(ingredientCard).contains('div', 'булка').click();
    cy.get('[class^=modal-overlay]').click('topLeft', {force: true});
    cy.get('#modal-root').should('not.have.descendants');
  });

  it('open and close ingredient modal by Escape key press', () => {
    cy.get(ingredientCard).contains('div', 'булка').click();
    cy.get('body').type('{esc}');
    cy.get('#modal-root').should('not.have.descendants');
  });

  it("make an order", () => {
    cy.get('button').contains('Оформить заказ').as('orderButton');
		cy.get('@orderButton').should("be.disabled");

    cy.get(ingredientCard).contains('div', 'булка').trigger('dragstart');
    cy.get(dropContainer).trigger('drop');
    cy.get('@orderButton').should("be.disabled");

    cy.get(ingredientCard).contains('div', 'Мясо').trigger('dragstart');
    cy.get(dropContainer).trigger('drop');
    cy.get('@orderButton').should("not.be.disabled");
    cy.get('@orderButton').click();

    cy.get("[data-cy='orderId']").should("have.text", '123');
    cy.get('[class^=modal_closeBtn]').click();
	});
});