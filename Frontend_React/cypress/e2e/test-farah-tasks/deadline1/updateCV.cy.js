describe('template spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3005/signin");
    cy.getByData("login").type("24000");
    cy.getByData("mdp").type("etu123");
    cy.get("#demo-simple-select").click(); 
    cy.get('[data-value="etudiant"]').click();
    

    cy.getByData("valider").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.visit('http://localhost:3005/updateCV/9')
  })

  // Update CV - Positive Case
  it("Update a CV with valid data", () => {
    const mockData = {
      idCv: "9",
      bio: "Bio description",
      location: "Location",
      linkedIn: "https://www.linkedin.com/in/username",
      formation: [
        {
          title: "Formation title",
          emplacement: "Formation location",
          startDate: "2022-01-01",
          endDate: "2022-12-31",
          description: "Formation description",
        },
      ],
      experience: [
        {
          title: "Experience title",
          emplacement: "Experience location",
          startDate: "2020-01-01",
          endDate: "2021-12-31",
          description: "Experience description",
        },
      ],
    };

    
    cy.intercept("PUT", `http://localhost:3000/Cv/update/9`, {
      statusCode: 200,
      body: mockData,
    }).as("updateCv");

    cy.visit(`http://localhost:3005/updatecv/9`);

    cy.wait(2000); 

    
    cy.get('[data-test="bio"]').clear().type(mockData.bio);
    cy.get('[data-test="location"]').clear().type(mockData.location);
    cy.get('[data-test="linkedIn"]').clear().type(mockData.linkedIn);

    
    cy.get('[data-test="formation-title"]').clear().type(mockData.formation[0].title);
    cy.get('[data-test="formation-location"]').clear().type(mockData.formation[0].emplacement);
    cy.get('[data-test="formation-startDate"]').type(mockData.formation[0].startDate);
    cy.get('[data-test="formation-endDate"]').type(mockData.formation[0].endDate);
    cy.get('[data-test="formation-description"]').clear().type(mockData.formation[0].description);

    
    cy.get('[data-test="experience-title"]').clear().type(mockData.experience[0].title);
    cy.get('[data-test="experience-location"]').clear().type(mockData.experience[0].emplacement);
    cy.get('[data-test="experience-startDate"]').type(mockData.experience[0].startDate);
    cy.get('[data-test="experience-endDate"]').type(mockData.experience[0].endDate);
    cy.get('[data-test="experience-description"]').clear().type(mockData.experience[0].description);

    
    cy.get('[data-test="valider"]').click();

    
    cy.wait("@updateCv").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.deep.equal(mockData);
    });

    
    cy.url().should("include", `/cv/${mockData.idCv}`);
  });






  // Update CV - Negative Case
  it("should show an error message when the form is submitted with invalid data", () => {
    const mockData = {
      idCv: "9",
      bio: 1,
      location: 0,
      linkedIn: 3,
      Competences: 8,
      formation: [
        {
          title: 1,
          emplacement: 0,
          startDate: "2023-01-01",
          endDate: "2020-05-01",
          description: 3,
        },
      ],
      experience: [
        {
          title: 1,
          emplacement: 0,
          startDate: "2023-01-01",
          endDate: "2020-05-01",
          description: 3,
        },
      ],
    };

    
    cy.intercept("PUT", `http://localhost:3000/Cv/update/9`, {
      statusCode: 400,
      body: { error: "Invalid data" },
    }).as("updateCv");

    cy.visit(`http://localhost:3005/updatecv/9`);

    cy.wait(2000); 

   
    cy.get('[data-test="bio"]').clear().type(mockData.bio);
    cy.get('[data-test="location"]').clear().type(mockData.location);
    cy.get('[data-test="linkedIn"]').clear().type(mockData.linkedIn);
    
    cy.get('[data-test="Competences"]').clear().type(mockData.Competences);

    
    cy.get('[data-test="formation-title"]').clear().type(mockData.formation[0].title);
    cy.get('[data-test="formation-location"]').clear().type(mockData.formation[0].emplacement);
    cy.get('[data-test="formation-startDate"]').clear().type(mockData.formation[0].startDate);
    cy.get('[data-test="formation-endDate"]').clear().type(mockData.formation[0].endDate);
    cy.get('[data-test="formation-description"]').clear().type(mockData.formation[0].description);

    
    cy.get('[data-test="experience-title"]').clear().type(mockData.experience[0].title);
    cy.get('[data-test="experience-location"]').clear().type(mockData.experience[0].emplacement);
    cy.get('[data-test="experience-startDate"]').clear().type(mockData.experience[0].startDate);
    cy.get('[data-test="experience-endDate"]').clear().type(mockData.experience[0].endDate);
    cy.get('[data-test="experience-description"]').clear().type(mockData.experience[0].description);

    
    cy.get('[data-test="valider"]').click();

    
    cy.get(".error-message").should("be.visible").contains("Invalid data");

   
    cy.wait("@updateCv").then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      expect(interception.response.body).to.deep.equal({ error: "Invalid data" });
    });
  });










})