describe('Style Testing', () => {

  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("24000");
    cy.getByData("mdp").type("etu123");
    cy.get("#demo-simple-select").click(); 
    cy.get('[data-value="etudiant"]').click();
   

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.visit('http://localhost:3005/getCV/22')
  })

  it('should toggle dark mode', () => {
    cy.get('button').contains('Basculer en Mode sombre').click() 
    cy.get('body').should('have.css', 'background-color', 'rgb(211, 208, 208)') 
    cy.get('h1').should('have.css', 'color', 'rgb(135, 206, 235)') 
    cy.get('input').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    cy.wait(2000); 

    cy.get('button').contains('Basculer en Mode clair').click() 
    cy.get('body').should('have.css', 'background-color', 'rgb(211, 208, 208)') 
    cy.get('h1').should('have.css', 'color', 'rgb(51, 51, 51)') 
    cy.get('input').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.wait(2000); 

    cy.get('button').contains('Basculer en Mode sombre').click() 
    cy.get('body').should('have.css', 'background-color', 'rgb(211, 208, 208)') 
    cy.get('h1').should('have.css', 'color', 'rgb(135, 206, 235)') 
    cy.get('input').should('have.css', 'background-color', 'rgb(255, 255, 255)') 
  
    cy.wait(2000);
    
  })

  it('should save and retrieve dark mode preference from database', () => {
    cy.get('button').contains('Basculer en Mode sombre').click() 
    cy.get('body').should('have.css', 'background-color', 'rgb(211, 208, 208)') 
    cy.get('h1').should('have.css', 'color', 'rgb(135, 206, 235)') 
    cy.get('input').should('have.css', 'background-color', 'rgb(255, 255, 255)') 

  })
})
