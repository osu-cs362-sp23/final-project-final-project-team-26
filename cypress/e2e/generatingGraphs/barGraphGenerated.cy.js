describe('Generate Bar Graph', () => {
    it('successfully generates a bar graph', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('Line').click() //clicks the bar graph button
      cy.fillGraphData() //fills in graph, command can be found in commands.js
      cy.get('#chart-img').should('be.visible') //checks that the graph image is visible
    })
  })