import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import './profile.css'
import styled from "styled-components";
import { Alert, Button, Input, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [profile, setProfile] = useState({
        EtudiantActId: "",
        nom: "",
        email: "",
        niveau: "",
        Classe: "",
        dateNaissance: null
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/etudiant-actuel/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("this is the get method", res.data)
            setProfile(res.data)
        }).catch(err => console.log(err));
    }, [id])
    const navigate = useNavigate();
    const handleInput = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }
    const UpdateProfile = () => {
        axios.put(`http://localhost:3000/etudiant-actuel/update/${id}`, profile, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => console.log("this is the update method", res, navigate(`/profile/${id}`)),

        ).catch(err => {
            console.log(err);
            setErrorMessage("Please enter Valid data.");
        });
    }

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="container">
        <FormComponent
            height="530%"
            width="100%"
            imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU"
        >
            <TitleLogin>Modifier Profile</TitleLogin>
            <InputRow>
                <InputContainer>
                    <InputName>Id Etudiant Actuel</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="EtudiantActId"
                        data-test="EtudiantActId"
                        value={profile.EtudiantActId || ''} onChange={handleInput}
                    />
                </InputContainer>
                <InputContainer>
                    <InputName>Nom</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="nom"
                        data-test="nom"
                        value={profile.nom || ''} onChange={handleInput}
                    />
                </InputContainer>
            </InputRow>
            <InputRow>
                <InputContainer>
                    <InputName>Email</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="email"
                        data-test="email"
                        value={profile.email || ''} onChange={handleInput}
                    />
                </InputContainer>


                <InputContainer>
                    <InputName>Niveau</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="niveau"
                        data-test="niveau"
                        value={profile.niveau || ''} onChange={handleInput}
                    />
                </InputContainer>
            </InputRow>
            <InputRow>
                <InputContainer>
                    <InputName>Classe</InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="Classe"
                        data-test="Classe"
                        value={profile.Classe || ''} onChange={handleInput}
                    />
                </InputContainer>

                <InputContainer>
                    <InputName> Date de naissance </InputName>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        name="dateNaissance"
                        data-test="dateNaissance"
                        value={profile.dateNaissance || ''} onChange={handleInput}
                    />
                </InputContainer>
            </InputRow>
            
            <ButtonDiv>
                <Button
                    data-test="valider"
                    variant="contained"
                    onClick={UpdateProfile}
                //   disabled={disableButton}
                >
                    Valider
                </Button>
            </ButtonDiv>
            {/* Display the error message */}
            {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                )}
        </FormComponent>
        </div>
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




    