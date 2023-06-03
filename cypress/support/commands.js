// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("fillGraphData", function (){
    cy.get('#chart-title-input').click().type("Valorant vs. Apex")
    cy.get('.x-label').click().type("Valorant")
    cy.get('.y-label').click().type("Apex")
    cy.get('.x-value-input').click().type("1")
    cy.get('.y-value-input').click().type("2")
    cy.get('#add-values-btn').click()
    cy.get(':nth-child(6) > .x-value-input').type("3")
    cy.get(':nth-child(7) > .y-value-input').type("1")
    cy.get('#add-values-btn').click()
    cy.get(':nth-child(8) > .x-value-input').type("4")
    cy.get(':nth-child(9) > .y-value-input').type("5")
    cy.get('#add-values-btn').click()
    cy.get(':nth-child(10) > .x-value-input').type("5")
    cy.get(':nth-child(11) > .y-value-input').type("7")
    cy.get('#add-values-btn').click()
    cy.get(':nth-child(12) > .x-value-input').type("4")
    cy.get(':nth-child(13) > .y-value-input').type("2")
    cy.get('#generate-chart-btn').click()
})

Cypress.Commands.add("constructChart", function (graphType){
    cy.get(graphType).click()
    cy.fillGraphData()
    cy.get('#chart-img').should('be.visible')
})

Cypress.Commands.add("shouldContain", function(){
    cy.get('input#chart-title-input').should('have.value', 'Valorant vs. Apex');
    cy.get('#x-label-input').should('have.value', 'Valorant');
    cy.get('#y-label-input').should('have.value', 'Apex');
    cy.get(':nth-child(4) > .x-value-input').should('have.value', '1');
    cy.get(':nth-child(5) > .y-value-input').should('have.value', '2');
    cy.get(':nth-child(6) > .x-value-input').should('have.value', '3');
    cy.get(':nth-child(7) > .y-value-input').should('have.value', '1');
    cy.get(':nth-child(8) > .x-value-input').should('have.value', '4');
    cy.get(':nth-child(9) > .y-value-input').should('have.value', '5');
    cy.get(':nth-child(10) > .x-value-input').should('have.value', '5');
    cy.get(':nth-child(11) > .y-value-input').should('have.value', '7');
    cy.get(':nth-child(12) > .x-value-input').should('have.value', '4');
    cy.get(':nth-child(13) > .y-value-input').should('have.value', '2');
})

