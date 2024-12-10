import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";
import { Alert, Button, Input, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPFA() {
  const [PFA, setPFA] = useState({
    idPfa:"",
    titre: "",
    description: "",
    technologie: "",
    nbEtudiants:0
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPFA((prevState) => {
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
        "http://localhost:3000/pfa",
        PFA
      )
      .then(setError(false), navigate("/getallenseignantpfa"))
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };
  useEffect(() => {
    console.log(PFA);
    setError(false);
  }, [PFA]);

  return (
    <FormComponent
        height="530%"
        width="100%"
        imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU"
    >
        <TitleLogin>Ajouter PFA</TitleLogin>
        <InputRow>
            <InputContainer>
                <InputName>Id PFA</InputName>
                <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    name="idPfa"
                    onChange={handleChange}
                />
            </InputContainer>
            <InputContainer>
                <InputName>Titre du sujet</InputName>
                <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    name="titre"
                    onChange={handleChange}
                />
            </InputContainer>
        </InputRow>
        <InputRow>
            <InputContainer>
                <InputName>Description du sujet</InputName>
                <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    name="description"
                    onChange={handleChange}
                />
            </InputContainer>
            <InputContainer>
                <InputName>Technologies utilisées</InputName>
                <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    name="technologie"
                    onChange={handleChange}
                />
            </InputContainer>
        </InputRow>
        <InputRow>
            <InputContainer style={{marginLeft:"100px"}}>
                <InputName> Nb Etudiants </InputName>
                <TextField
                    id="filled-basic"
                    label="Filled"
                    variant="filled"
                    name="nbEtudiants"
                    onChange={handleChange}
                />
            </InputContainer>
            
        </InputRow>
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
color: grey;
text-align: center;
@media (max-width: 768px) {
  margin-top: 0.5em;
  font-size: 1.5em;
`;

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
`;

const InputContainer = styled.div`
    flex-basis: 48%;
`;

const ButtonDiv = styled.div`
width: auto;
margin-top: 1em;
margin-bottom: 1em;
align-items: center;
display: flex;
justify-content: center;
    `;
