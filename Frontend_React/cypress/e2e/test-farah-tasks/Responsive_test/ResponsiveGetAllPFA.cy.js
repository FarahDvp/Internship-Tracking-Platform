describe('Test de la partie responsive de la page ListPfas', () => {

  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("22000");
    cy.getByData("mdp").type("farah123");
    cy.get("#demo-simple-select").click(); 
    cy.get('[data-value="admin"]').click(); 
    

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.viewport(1440, 900) // Définir une résolution d'écran de bureau
    cy.visit('http://localhost:3005/getallpfa') // Remplacez l'URL par l'URL réelle de votre application
  })

  it('Affiche correctement la page sur un grand écran', () => {
    cy.get('.container').should('be.visible')
    cy.get('.list_title').should('be.visible')
    cy.get('table').should('have.css', 'font-size', '16px')
  })

  it('Affiche correctement la page sur un écran moyen', () => {
    cy.viewport(768, 900) // Définir une résolution d'écran de tablette
    cy.get('.container').should('be.visible')
    cy.get('.list_title').should('be.visible')
    cy.get('.custom-table').should('be.visible')
    cy.get('table').should('have.css', 'font-size', '16px')
  })

  it('Affiche correctement la page sur un petit écran', () => {
    cy.viewport(375, 667) // Définir une résolution d'écran de smartphone
    cy.get('.container').should('be.visible')
    cy.get('.list_title').should('be.visible')
    cy.get('input').should('be.visible')
    cy.get('input').should('have.css', 'font-size', '16px')
  })
})
