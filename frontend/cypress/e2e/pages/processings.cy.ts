describe('template spec', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/v1/processings/',
      },
      { fixture: 'processings.json' }
    ).as('getProcessings')
    cy.visit('http://localhost:3000/processings')
  })

  it('grid content should be rendered', () => {
    const appointments = cy.get('[role="row"]')
    appointments.should('have.length', 4) // 3 appointments + header
  })

  it('sidebar should be opened on click on row', () => {
    const processingsGrid = cy.get('[data-test="processings-grid"]')
    processingsGrid.get('[role="row"]').eq(1).click()

    const processingSidebar = cy.get('[data-test="sidebar"]')
    processingSidebar.get('h2').contains('Detalhes do Processamento')
  })
})
