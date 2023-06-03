describe('Generate Scatter Graph', () => {
    it('successfully generates a scatter graph', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.get(':nth-child(2) > a').click()
      cy.fillGraphData()
      cy.get('#chart-img').should('be.visible')
    })
  })