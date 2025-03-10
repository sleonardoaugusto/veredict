describe('template spec', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/v1/attendances/',
      },
      { fixture: 'appointments.json' }
    ).as('getAppointments')
    cy.visit('http://localhost:3000/appointments')
  })

  it('grid content should be rendered', () => {
    const appointments = cy.get('[role="row"]')
    appointments.should('have.length', 4) // 3 appointments + header
  })

  it('sidebar should be opened on click on row', () => {
    cy.intercept(
      {
        method: 'GET', //
        url: '/api/v1/attendances/*/notes',
      },
      { fixture: 'appointmentNotes.json' }
    ).as('getAppointmentNotes')
    cy.intercept(
      {
        method: 'GET', //
        url: '/api/v1/attendances/*/documents',
      },
      { fixture: 'appointmentDocuments.json' }
    ).as('getAppointmentDocuments')

    const appointmentsGrid = cy.get('[data-test="appointments-grid"]')
    appointmentsGrid.get('[role="row"]').eq(1).click()

    const sidebar = cy.get('[data-test="sidebar"]')
    sidebar.get('h2').contains('Lucas Resende da Silva')

    const notes = sidebar.get('div[data-test="note"]')
    notes.should('have.length', 2)

    const note = notes.eq(0)
    note.get('h3').contains('DPVAT')

    const documentsGrid = sidebar.get('[data-test="documents-grid"]')
    documentsGrid.find('[role="row"]').should('have.length', 4) // 3 documents + header
  })
})
