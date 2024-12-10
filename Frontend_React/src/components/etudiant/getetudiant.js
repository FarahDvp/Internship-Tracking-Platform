import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function GetEtudiant() {
  const [etudiantData, setEtudiantData] = useState({
    nom: "",
    prenom: "",
    classe: "",
    DOB: "",
    type: "",
    niveau: "",
    cin: 0,
    email: "",
  });

  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEtudiantData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleDelete = () => {
    if (etudiantData.type == "Alumni") {
      axios
        .delete("http://localhost:3000/etudiant-alumni/" + etudiantData.cin)
        .then(() => {
          setError(false);
          navigate("/");
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } else if (etudiantData.type == "Actuel") {
      axios
        .delete("http://localhost:3000/etudiant-actuel/" + etudiantData.cin)
        .then(() => {
          setError(false);
          navigate("/");
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } else {
      setError(true);
    }
  };
  const handleSearch = () => {
    console.log(etudiantData.cin);
    if (etudiantData.type == "Alumni") {
      axios
        .get("http://localhost:3000/etudiant-alumni/" + etudiantData.cin)
        .then((response) => {
          console.log(response);
          etudiantData.nom = response.data.nom;
          etudiantData.prenom = response.data.prenom;
          etudiantData.email = response.data.email;
          etudiantData.DOB = response.data.dateNaissance;
          setIsNotFound(false);
        })
        .catch(setIsNotFound(true));
    } else if (etudiantData.type == "Actuel") {
      axios
        .get("http://localhost:3000/etudiant-actuel/" + etudiantData.cin)
        .then((response) => {
          etudiantData.nom = response.data.nom;
          etudiantData.prenom = response.data.prenom;
          etudiantData.email = response.data.email;
          etudiantData.DOB = response.data.dateNaissance;
          etudiantData.classe = response.data.Classe;
          etudiantData.niveau = response.data.niveau;
          setIsNotFound(false);
        })
        .catch(setIsNotFound(true));
    } else {
      setIsNotFound(true);
    }
  };

  useEffect(() => {
    setError(false);
  }, [etudiantData, setIsNotFound]);
  return (
    <FormComponent height="160%">
      <TitleLogin>Chercher un Etudiant</TitleLogin>
      <InputName>CIN</InputName>
      <TextField
        id="filled-basic"
        label="cin"
        variant="filled"
        name="cin"
        value={etudiantData.cin}
        onChange={handleChange}
      />
      <div>
        <InputName>Type</InputName>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Type"
          name="type"
          style={{ padding: "1px" }}
          onChange={handleChange}
          value={etudiantData.type}
        >
          <MenuItem value={"Alumni"}>Alumni</MenuItem>
          <MenuItem value={"Actuel"}>Actuel</MenuItem>
        </Select>
      </div>
      <Button variant="contained" onClick={handleSearch}>
        Checher
      </Button>
      {isNotFound && (
        <Alert severity="error"> Impossible de trouver cet Etudiant !</Alert>
      )}

      <InputName>Nom</InputName>
      <TextField
        id="filled-basic"
        label="nom"
        variant="filled"
        name="nom"
        value={etudiantData.nom}
        disabled={true}
      />
      <InputName>Prénom</InputName>
      <TextField
        id="filled-basic"
        label="prénom"
        variant="filled"
        name="prenom"
        value={etudiantData.prenom}
        disabled={true}
      />
      <InputName>Email</InputName>
      <TextField
        id="filled-basic"
        label="email"
        variant="filled"
        name="email"
        value={etudiantData.email}
        disabled={true}
      />
      {etudiantData.type == "Actuel" ? (
        <div>
          <InputName>Classe</InputName>
          <TextField
            id="filled-basic"
            label="classe"
            variant="filled"
            name="classe"
            value={etudiantData.classe}
            onChange={handleChange}
            disabled={etudiantData.type == "Alumni" ? true : false}
          />
          <InputName>Niveau</InputName>
          <TextField
            id="filled-basic"
            label="niveau"
            variant="filled"
            name="niveau"
            value={etudiantData.niveau}
            onChange={handleChange}
            disabled={etudiantData.type == "Alumni" ? true : false}
          />
        </div>
      ) : (
        ""
      )}
      <DobContainer>
        <div>
          <InputName>Date de naissance</InputName>
          <p>{etudiantData.DOB}</p>
        </div>
      </DobContainer>
      <DobContainer>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DobContainer>
      {error && (
        <DobContainer>
          <Alert severity="error">Un erreur est survenue ... !</Alert>
        </DobContainer>
      )}
    </FormComponent>
  );
}

const InputName = styled.h3`
  color: #4981f5;
`;

const TitleLogin = styled.h1`
  color: #4981f5;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 0.5em;
    font-size: 1.5em;
  }
`;
const DobContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 0.5em;
`;
