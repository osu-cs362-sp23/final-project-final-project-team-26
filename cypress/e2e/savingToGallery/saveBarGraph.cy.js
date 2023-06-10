describe('Generate Line Chart', () => {
    it('successfully saves a bar graph to the gallery', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.contains('Bar').click() //clicks on the bar graph button
      cy.fillGraphData() //fills in graph
      cy.contains('Save').click() //click the save button
      cy.contains('Gallery').click() //click the gallery button
      cy.get('.chart-img').should('be.visible') //checking that the chart is visible
    })
  })