import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";
import { Alert, Button, Input, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InsertPFE() {
  const [stagePFE, setStagePFE] = useState({
    sujet: "",
    type: "",
    societe: "",
    pays: "",
    idEnseignant: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStagePFE((prevState) => {
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
        "http://localhost:3000/etudiant-actuel/addpfe/" + user.sub,
        stagePFE
      )
      .then(setError(false), navigate("/"))
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  useEffect(() => {
    console.log(stagePFE);
    setError(false);
  }, [stagePFE]);

  return (
    <FormComponent
      height="130%"
      imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU"
    >
      <TitleLogin>Ajouter Stage PFE</TitleLogin>
      <InputName>Sujet</InputName>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        name="sujet"
        onChange={handleChange}
      />
      <InputName>Type</InputName>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        name="type"
        onChange={handleChange}
      />
      <InputName>Societe</InputName>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        name="societe"
        onChange={handleChange}
      />
      <InputName> Enseignant </InputName>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        name="idEnseignant"
        onChange={handleChange}
      />
      <InputName> Pays </InputName>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        name="pays"
        onChange={handleChange}
      />
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
