describe('Generate Line Chart', () => {
    it('successfully saves a line graph to the gallery', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('Line').click() //clicks the line graph button
      cy.fillGraphData() //fills in graph
      cy.contains('Save').click() //click the save button
      cy.contains('Gallery').click() //click the gallery button
      cy.get('.chart-img').click() //click on the image in the gallery
      cy.shouldContain()//buitl in command to check that the data in the graph is the same, in commnands.js
      cy.get('#chart-img').should('be.visible') //checking that the chart is visible
    })
  })