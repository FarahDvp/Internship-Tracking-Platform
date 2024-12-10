import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";
import { Alert, Button, Input, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdatePFA() {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [PFA, setPFA] = useState({
        idPfa: "",
        titre: "",
        description: "",
        technologie: "",
        nbEtudiants: 0
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/pfa/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("this is the get method", res.data)
            setPFA(res.data)
        }).catch(err => console.log(err));
    }, [id])
    const navigate = useNavigate();
    const handleInput = (e) => {
        setPFA({ ...PFA, [e.target.name]: e.target.value })
    }
    const UpdatePFA = () => {
        axios.put(`http://localhost:3000/pfa/update/${id}`, PFA, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => console.log("this is the update method", res,navigate("/getallenseignantpfa")),

        ).catch(err => console.log(err));
    }

    return (
        <FormComponent
            height="530%"
            width="100%"
            imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU"
        >
            <TitleLogin>Modifier PFA</TitleLogin>
            <InputRow>
                <InputContainer>
                    <InputName>Id PFA</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="idPfa"
                        value={PFA.idPfa || ''} onChange={handleInput}
                    />
                </InputContainer>
                <InputContainer>
                    <InputName>Title</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="titre"
                        value={PFA.titre || ''} onChange={handleInput}
                    />
                </InputContainer>
            </InputRow>
            <InputRow>
                <InputContainer>
                    <InputName>Description</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="description"
                        value={PFA.description || ''} onChange={handleInput}
                    />
                </InputContainer>
                <InputContainer>
                    <InputName>Technologies</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="technologie"
                        value={PFA.technologie || ''} onChange={handleInput}
                    />
                </InputContainer>
            </InputRow>
            <InputRow>
                <InputContainer  style={{marginLeft:"100px"}}>
                    <InputName> Nb Etudiants </InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="nbEtudiants"
                        value={PFA.nbEtudiants || ''} onChange={handleInput}
                    />
                </InputContainer>
                
            </InputRow>
            <ButtonDiv>
                <Button
                    variant="contained"
                    onClick={UpdatePFA}
                //   disabled={disableButton}
                >
                    Valider
                </Button>
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
