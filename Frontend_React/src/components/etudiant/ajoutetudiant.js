import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";
import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EtudiantADD() {
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
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = () => {
    if (etudiantData.type == "Actuel") {
      axios
        .post("http://localhost:3000/etudiant-actuel/insert", {
          nom: etudiantData.nom,
          prenom: etudiantData.prenom,
          dateNaissance: etudiantData.DOB,
          Classe: etudiantData.classe,
          niveau: etudiantData.niveau,
          login: parseInt(etudiantData.cin),
          mdp: etudiantData.cin,
          email: etudiantData.email,
          EtudiantActId: etudiantData.cin,
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => setError(true));
    } else {
      axios
        .post("http://localhost:3000/etudiant-alumni/inserting", {
          nom: etudiantData.nom,
          prenom: etudiantData.prenom,
          dateNaissance: etudiantData.DOB,
          login: parseInt(etudiantData.cin),
          mdp: etudiantData.cin,
          email: etudiantData.email,
          EtudiantAluId: etudiantData.cin,
        })
        .then(navigate("/"))
        .catch((err) => setError(true));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEtudiantData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (
      etudiantData.type == "" ||
      etudiantData.DOB == "" ||
      etudiantData.niveau == "" ||
      etudiantData.classe == "" ||
      etudiantData.email == "" ||
      etudiantData.cin == 0
    ) {
      setDisableButton(true);
    } else {
      if (isNaN(etudiantData.cin)) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    }
    setError(false);
  }, [etudiantData]);
  return (
    <AllContainer>
      <FormComponent height="160%">
        <TitleLogin>Ajouter un Etudiant</TitleLogin>
        <InputName>Nom</InputName>
        <TextField
          id="filled-basic"
          label="nom"
          variant="filled"
          name="nom"
          value={etudiantData.nom}
          onChange={handleChange}
        />
        <InputName>Prénom</InputName>
        <TextField
          id="filled-basic"
          label="prénom"
          variant="filled"
          name="prenom"
          value={etudiantData.prenom}
          onChange={handleChange}
        />

        <InputName>CIN</InputName>
        <TextField
          id="filled-basic"
          label="cin"
          variant="filled"
          name="cin"
          value={etudiantData.cin}
          onChange={handleChange}
        />
        <InputName>Email</InputName>
        <TextField
          id="filled-basic"
          label="email"
          variant="filled"
          name="email"
          value={etudiantData.email}
          onChange={handleChange}
        />
        <InputName>Classe</InputName>
        <TextField
          id="filled-basic"
          label="classe"
          variant="filled"
          name="classe"
          value={etudiantData.classe}
          onChange={handleChange}
        />
        <InputName>Niveau</InputName>
        <TextField
          id="filled-basic"
          label="niveau"
          variant="filled"
          name="niveau"
          value={etudiantData.niveau}
          onChange={handleChange}
        />
        <DobContainer>
          <div>
            <InputName>Date de naissance</InputName>
            <DatePicker type="date" name="DOB" onChange={handleChange} />
          </div>
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
        </DobContainer>
        <ButtonDiv>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={disableButton}
          >
            Valider
          </Button>
          {error && <Alert severity="error">Un erreur est survenue!</Alert>}
        </ButtonDiv>
      </FormComponent>
    </AllContainer>
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
const DatePicker = styled.input`
  height: 3em;
  width: 7.5em;
  padding: 0.5em;
  outline-style: hidden;
  outline-color: grey;
`;
const ButtonDiv = styled.div`
  width: auto;
  margin-bottom: 1em;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const AllContainer = styled.div`
  margin-top: 10em;
  @media (max-width: 768px) {
    margin-top: 0.5em;
  }
`;
