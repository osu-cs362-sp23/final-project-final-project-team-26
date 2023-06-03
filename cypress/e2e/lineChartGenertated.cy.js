describe('Generate Line Chart', () => {
  it('successfully generates a line chart', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.get(':nth-child(1) > a').click()
    cy.fillGraphData()
    cy.get('#chart-img').should('be.visible')
  })
})