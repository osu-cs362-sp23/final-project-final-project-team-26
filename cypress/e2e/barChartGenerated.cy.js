describe('Generate Bar Graph', () => {
    it('successfully generates a bar graph', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.get(':nth-child(3) > a').click()
      cy.fillGraphData()
      cy.get('#chart-img').should('be.visible')
    })
  })