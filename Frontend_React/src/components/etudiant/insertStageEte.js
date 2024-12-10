import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";
import { Alert, Button, Input, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default function InsertStageEte() {
  const [stageEte, setStageEte] = useState({
    sujet: "",
    description: "",
    societe: "",
    DateDebut: "",
    DateDeFin: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStageEte((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios
      .post(
        "http://localhost:3000/etudiant-actuel/addstage/" + user.sub,
        stageEte
      )
      .then(setError(false))
      .catch(setError(true));
  };
  useEffect(() => {
    console.log(stageEte);
    setError(false);
  }, [stageEte]);

  return (
    <FormComponent
      height="130%"
      imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU"
    >
      <TitleLogin>Ajouter Stage d'été</TitleLogin>
      <InputName>Sujet</InputName>
      <TextField
        id="filled-basic"
        label="sujet"
        variant="filled"
        name="sujet"
        onChange={handleChange}
      />
      <InputName>Description</InputName>
      <TextField
        id="filled-multiline-flexible"
        label="Description"
        multiline
        maxRows={4}
        variant="filled"
        name="description"
        onChange={handleChange}
      />
      <InputName>Societe</InputName>
      <TextField
        id="filled-basic"
        label="Societe"
        variant="filled"
        name="societe"
        onChange={handleChange}
      />
      <InputName>Date de Début</InputName>
      <Input type="date" name="DateDebut" onChange={handleChange} />
      <InputName>Date de Fin</InputName>
      <Input type="date" name="DateDeFin" onChange={handleChange} />
      <ButtonDiv>
        <Button
          variant="contained"
          onClick={handleSubmit}
          //   disabled={disableButton}
        >
          Valider
        </Button>
        {error && <Alert severity="error">Un erreur est survenue!</Alert>}
      </ButtonDiv>
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
const ButtonDiv = styled.div`
  width: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  align-items: center;
  display: flex;
  justify-content: center;
`;
