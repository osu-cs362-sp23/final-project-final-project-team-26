describe('Generate Scatter Graph', () => {
    it('successfully generates a scatter graph', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('Scatter').click() //clicks the scatter graph button
      cy.fillGraphData() //fills in graph, command can be found in commands.js
      cy.get('#chart-img').should('be.visible') //checks that the graph image is visible
    })
  })