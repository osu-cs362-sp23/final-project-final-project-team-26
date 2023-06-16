describe('Able to reopen a line graph', () => {
  it('successfully generates a line graph', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('Line').click() //clicks the line graph button
    cy.fillGraphData() //fills in graph, command can be found in commands.js
    cy.get('#chart-img').should('be.visible') //checks that the graph image is visible
  })
})