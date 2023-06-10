describe('Generate Line Chart', () => {
    it('successfully reopening bar graph', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.get(':nth-child(3) > a').click()
      cy.fillGraphData() //fills in graph
      cy.get('#save-chart-btn').click() //click the save button
      cy.get('.right > a').click() //click the gallery button
      cy.get('.chart-img').click()
      cy.shouldContain()
      cy.get('#chart-img').should('be.visible') //checking that the chart is visible
    })
  })