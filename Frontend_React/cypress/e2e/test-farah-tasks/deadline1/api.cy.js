describe("Api Test", () => {
    let saveTaskUpdated = {};
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0MDAwLCJtZHAiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkYzZWMHdhalh4MXFzcXZZZEEzRUZ3dyRjeENOemFHa0I2aXZYeWJTemJKSGZQc2h5VCtuY016OTR5QWRlVWRpbGVNIiwicm9sZXMiOlsiZXR1ZGlhbnQiXSwiaWF0IjoxNjg1MTI5Mzk5LCJleHAiOjE2ODUxMzAyOTl9.U7RlfN222UXzDlQxqwu_9j25K8Ja4gjDOYp-fZTzdds"
    it("GEt Profile by id ", () => {

        cy.request({
            method: "GET",
            url: "http://localhost:3000/etudiant-actuel/22",
            headers: { 'Authorization': `Bearer ${token}` }
            // url:Cypress.env('urlBackend')+'/auth/login',
        }).then((resp) => {


            expect(resp.status).to.equal(200);

        });
    });

    it(" Update the profile with valid data ", () => {
        const data = {
            EtudiantActId: "22",
            nom: "Farah",
            email:"farah@gmail.com",
            niveau:"2ING",
            Classe:"2ING 01",
            dateNaissance:"1999-06-22"
        };
        console.log("saveTask in update");
        cy.request({
            method: "PUT",
            url: "http://localhost:3000/etudiant-actuel/update/22",
            headers: { 'Authorization': `Bearer ${token}` },
            body: data
            
            // url:Cypress.env('urlBackend')+'/auth/login',
        }).then((resp) => {


            expect(resp.status).to.equal(200);
            console.log("Tasks", resp.body.model);
            if (resp.body && resp.body.model) {
              expect(resp.body.model.EtudiantActId).to.eq(data.EtudiantAcId);
            } 
            if (resp.body && resp.body.model) {
              expect(resp.body.model.nom).to.eq(data.nom);
            } 
            if (resp.body && resp.body.model) {
              expect(resp.body.model.email).to.eq(data.email);
            } 
            if (resp.body && resp.body.model) {
              expect(resp.body.model.niveau).to.eq(data.niveau);
            } 
            if (resp.body && resp.body.model) {
              expect(resp.body.model.Classe).to.eq(data.Classe);
            } 
            if (resp.body && resp.body.model) {
              expect(resp.body.model.dateNaissance).to.eq(data.dateNaissance);
            } 
            saveTaskUpdated = resp.body.model;

        });
    });



    // Update Profile - Negative Case
    it(" Update the profile with invalid data", () => {
      const data = {
          EtudiantActId: "22",
          nom: 2,
          email:"farah@gmail.com",
          niveau:"2ING",
          Classe:"2ING 01",
          dateNaissance:"1999-06-22"
      };
      console.log("saveTask in update");
      cy.request({
          method: "PUT",
          url: "http://localhost:3000/etudiant-actuel/update/22",
          headers: { 'Authorization': `Bearer ${token}` },
          body: data
          
          // url:Cypress.env('urlBackend')+'/auth/login',
      }).then((resp) => {


          expect(resp.status).to.equal(200);
          console.log("Tasks", resp.body.model);
          if (resp.body && resp.body.model) {
            expect(resp.body.model.EtudiantActId).to.eq(data.EtudiantAcId);
          } 
          if (resp.body && resp.body.model) {
            expect(resp.body.model.nom).to.eq(data.nom);
          } 
          if (resp.body && resp.body.model) {
            expect(resp.body.model.email).to.eq(data.email);
          } 
          if (resp.body && resp.body.model) {
            expect(resp.body.model.niveau).to.eq(data.niveau);
          } 
          if (resp.body && resp.body.model) {
            expect(resp.body.model.Classe).to.eq(data.Classe);
          } 
          if (resp.body && resp.body.model) {
            expect(resp.body.model.dateNaissance).to.eq(data.dateNaissance);
          } 
          saveTaskUpdated = resp.body.model;

      });
  });





    let saveCv = {};

it(" Update the CV with valid data", () => {
  const data = {
    idCv: "9", // ID du CV à mettre à jour
    bio: "Description du candidat",
    location: "Lieu",
    linkedIn: "https://www.linkedin.com/in/username",
    diplome: ["Diplôme 1", "Diplôme 2"],
    Competences: ["Compétence 1", "Compétence 2"],
    formation: [
      {
        title: "Formation 1",
        emplacement: "Lieu de formation 1",
        startDate: "2020-01-01",
        endDate: "2022-12-31",
        description: "Description de la formation 1"
      },
      {
        title: "Formation 2",
        emplacement: "Lieu de formation 2",
        startDate: "2018-01-01",
        endDate: "2020-12-31",
        description: "Description de la formation 2"
      }
    ],
    experience: [
      {
        title: "Expérience 1",
        emplacement: "Lieu de l'expérience 1",
        startDate: "2016-01-01",
        endDate: "2018-12-31",
        description: "Description de l'expérience 1"
      },
      {
        title: "Expérience 2",
        emplacement: "Lieu de l'expérience 2",
        startDate: "2014-01-01",
        endDate: "2016-12-31",
        description: "Description de l'expérience 2"
      }
    ]
  };

  cy.request({
    method: "PATCH",
    url: "http://localhost:3000/Cv/update/9",
    body: data,
    // url: Cypress.env('urlBackend') + '/auth/login',
  }).then((resp) => {
    expect(resp.status).to.equal(200);
    console.log("CV mis à jour :", resp.body.model);
    if (resp.body && resp.body.model) {
      expect(resp.body.model.bio).to.eq(data.bio);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.location).to.eq(data.location);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.linkedIn).to.eq(data.linkedIn);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.diplome).to.eq(data.diplome);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.Competences).to.eq(data.Competences);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.formation).to.eq(data.formation);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.experience).to.eq(data.experience);
    }
    saveCv = resp.body.model;
  });
});



// Update CV - Negative Case
it(" Update the CV with invalid data", () => {
  const data = {
    idCv: "9", // ID du CV à mettre à jour
    bio: 3,
    location: "Lieu",
    linkedIn: 12,
    diplome: ["Diplôme 1", "Diplôme 2"],
    Competences: ["Compétence 1", "Compétence 2"],
    formation: [
      {
        title: "Formation 1",
        emplacement: "Lieu de formation 1",
        startDate: "2020-01-01",
        endDate: "2022-12-31",
        description: "Description de la formation 1"
      },
      {
        title: "Formation 2",
        emplacement: "Lieu de formation 2",
        startDate: "2020-01-01",
        endDate: "2018-12-31",
        description: "Description de la formation 2"
      }
    ],
    experience: [
      {
        title: "Expérience 1",
        emplacement: "Lieu de l'expérience 1",
        startDate: "2016-01-01",
        endDate: "2018-12-31",
        description: "Description de l'expérience 1"
      },
      {
        title: "Expérience 2",
        emplacement: "Lieu de l'expérience 2",
        startDate: "2014-01-01",
        endDate: "2016-12-31",
        description: "Description de l'expérience 2"
      }
    ]
  };

  cy.request({
    method: "PATCH",
    url: "http://localhost:3000/Cv/update/9",
    body: data,
    // url: Cypress.env('urlBackend') + '/auth/login',
  }).then((resp) => {
    expect(resp.status).to.equal(200);
    console.log("CV mis à jour :", resp.body.model);
    if (resp.body && resp.body.model) {
      expect(resp.body.model.bio).to.eq(data.bio);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.location).to.eq(data.location);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.linkedIn).to.eq(data.linkedIn);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.diplome).to.eq(data.diplome);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.Competences).to.eq(data.Competences);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.formation).to.eq(data.formation);
    }
    if (resp.body && resp.body.model) {
      expect(resp.body.model.experience).to.eq(data.experience);
    }
    saveCv = resp.body.model;
  });
});



});