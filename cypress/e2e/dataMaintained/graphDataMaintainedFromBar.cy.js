describe('Data Maintained from Bar Graph to Line and Scatter', () => {
  it('successfully saves data', () => {
    cy.visit('/') // change URL to match your dev URL
    const graphType = 'Bar';
    cy.constructChart(graphType); //constructs a bar graph, command is in commands.js
    cy.contains('Line').click() //clicks the line graph button
    cy.shouldContain('Line'); 
    cy.contains('Scatter').click() //clicks the bar graph button
    cy.shouldContain('Scatter'); 
  })
})