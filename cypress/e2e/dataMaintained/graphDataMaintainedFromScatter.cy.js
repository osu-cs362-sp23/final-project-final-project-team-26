describe('Data Maintained from Scatter Graph to Line and Bar', () => {
  it('successfully saves data', () => {
    cy.visit('/') // change URL to match your dev URL
    const graphType = 'Scatter';
    cy.constructChart(graphType); //constructs a scatter graph, command is in commands.js
    cy.contains('Line').click() //clicks the line graph button
    cy.shouldContain('Line'); 
    cy.contains('Bar').click() //clicks the bar graph button
    cy.shouldContain('Bar'); 
  })
})