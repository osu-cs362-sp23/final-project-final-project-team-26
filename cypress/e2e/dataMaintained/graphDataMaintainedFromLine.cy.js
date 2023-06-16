describe('Data Maintained from Line Graph to Scatter and Bar', () => {
  it('successfully saves data', () => {
    cy.visit('/') // change URL to match your dev URL
    const graphType = 'Line';
    cy.constructChart(graphType); //constructs a line graph, command is in commands.js
    cy.contains('Scatter').click() //clicks the scatter graph button
    cy.shouldContain('Scatter'); 
    cy.contains('Bar').click() //clicks the bar graph button
    cy.shouldContain('Bar'); 
  })
})

