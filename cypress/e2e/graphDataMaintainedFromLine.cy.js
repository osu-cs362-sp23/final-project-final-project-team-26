describe('Data Maintained from Line Graph to Scatter and Bar', () => {
    it('successfully saves data', () => {
      cy.visit('/') // change URL to match your dev URL
      cy.constructChart(':nth-child(1) > a')
      cy.get(':nth-child(2) > a').click()
      cy.shouldContain();
      cy.get(':nth-child(3) > a').click()
      cy.shouldContain();
    })
  })