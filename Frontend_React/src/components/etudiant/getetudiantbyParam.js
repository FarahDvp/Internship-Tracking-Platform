import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";

import { Alert, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function GetEtudiantByParam() {
  const [etudiantData, setEtudiantData] = useState({
    nom: "",
    prenom: "",
    email: "",
    Competences: "",
    formation: "",
    experience: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/etudiant-actuel/" + id)
      .then((response) => {
        console.log(response);
        setEtudiantData((prevState) => {
          return {
            nom: response.data.nom,
            prenom: response.data.prenom,
            email: response.data.email,
            Competences: response.data.cv.Competences,
            formation: response.data.cv.formation,
            experience: response.data.cv.experience,
          };
        });
      })
      .catch();
    console.log(etudiantData);
  }, []);
  return (
    <FormComponent height="160%">
      <div className="cv-box">
        <DobContainer>
          <TitleLogin>
            {etudiantData.nom + " " + etudiantData.prenom}
          </TitleLogin>
          <InputName>Email</InputName>
          <p>{etudiantData.email}</p>

          <InputName>Competences</InputName>
          {/* <TextField
          id="filled-basic"
          label="nom"
          variant="filled"
          name="nom"
          value={etudiantData.Competences}
          disabled={true}
        /> */}
          <p>{etudiantData.Competences}</p>
          <InputName>Formation</InputName>
          {/* <TextField
          id="filled-basic"
          label="prénom"
          variant="filled"
          name="prenom"
          value={etudiantData.formation}
          disabled={true}
        /> */}
          <p>{etudiantData.formation}</p>

          <InputName>Experience</InputName>

          {/* <TextField
          id="filled-basic"
          label="email"
          variant="filled"
          name="email"
          value={etudiantData.experience}
          disabled={true}
        /> */}
          <p>{etudiantData.experience}</p>
        </DobContainer>
      </div>
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
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 0.5em;
`;
