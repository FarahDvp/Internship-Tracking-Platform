describe('template spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("24000");
    cy.getByData("mdp").type("etu123");
    cy.get("#demo-simple-select").click(); 
    cy.get('[data-value="etudiant"]').click();
    

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.visit('http://localhost:3005/Editprofile/22')
  })
  // Update Profile - Positive Case
it("should update a profile with valid data", () => {
  const mockData = {
    EtudiantActId: "22",
    nom: "John Doe",
    email: "john.doe@example.com",
    niveau: "BAC+3",
    Classe: "A",
    dateNaissance: "1990-01-01",
  };

  
  cy.intercept("PUT", `http://localhost:3000/etudiant-actuel/update/22`, {
    statusCode: 200,
    body: mockData,
  }).as("Editprofile");

  cy.visit(`http://localhost:3005/Editprofile/22`);

  cy.wait(2000); 

  
  cy.get('[data-test="nom"] input').clear().type(mockData.nom);
  cy.get('[data-test="email"]').clear().type(mockData.email);
  cy.get('[data-test="niveau"]').clear().type(mockData.niveau);
  cy.get('[data-test="Classe"]').clear().type(mockData.Classe);
  cy.get('[data-test="dateNaissance"]').clear().type(mockData.dateNaissance);

  
  cy.get('[data-test="valider"]').click();

  
  cy.wait("@Editprofile").then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
    expect(interception.response.body).to.deep.equal(mockData);
  });

  
  cy.url().should("include", "/profile");
});

// Update Profile - Negative Case
it("should show an error message when the form is submitted with invalid data", () => {
  const mockData = {
    EtudiantActId: "22",
    nom: 1,
    email: "john.doe@example.com",
    niveau: "BAC+3",
    Classe: 3,
    dateNaissance: "1990-01-01",
  };

  
  cy.intercept("PUT", `http://localhost:3000/etudiant-actuel/update/22`, {
    statusCode: 400,
    body: { error: "Invalid data" },
  }).as("Editprofile");

  cy.visit(`http://localhost:3005/Editprofile/22`);

  cy.wait(2000); 

  
  cy.get('[data-test="nom"] input').clear().type(mockData.nom);
  cy.get('[data-test="email"]').clear().type(mockData.email);
  cy.get('[data-test="niveau"]').clear().type(mockData.niveau);
  cy.get('[data-test="Classe"]').clear().type(mockData.Classe);
  cy.get('[data-test="dateNaissance"]').clear().type(mockData.dateNaissance);

  
  cy.get('[data-test="valider"]').click();


  
  cy.wait("@Editprofile").then((interception) => {
    expect(interception.response.statusCode).to.equal(400);
    expect(interception.response.body).to.deep.equal({ error: "Invalid data" });
  });
});



})