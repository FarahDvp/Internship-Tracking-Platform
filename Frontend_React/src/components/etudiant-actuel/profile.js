import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const token = localStorage.getItem("token");
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
    axios
      .get(`http://localhost:3000/etudiant-actuel/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("this is the get method", res.data);
        setProfile(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  const handleInput = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <ButtonDiv>
        <Button style={{float:"left",marginLeft:"-320px",backgroundColor: "orange",color:"black"}}
          variant="contained"
          onClick={() => navigate(`/getCV/${id}`, { replace: true })}>
          Voir CV
        </Button>
        
        <Button style={{float:"left",backgroundColor: "green",color:"white"}}
          variant="contained"
          onClick={() => navigate(`/EditProfile/${id}`, { replace: true })}
        >
          Modifier le profil
        </Button>
      </ButtonDiv>
      <ProfileContainer>
        <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU" />
        <ProfileInfo>
          <Title >Profile Etudiant Actuel</Title>
          <ProfileField>
            <ProfileLabel>Id Etudiant Actuel:</ProfileLabel>
            <ProfileValue>{profile.EtudiantActId}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <ProfileLabel>Nom:</ProfileLabel>
            <ProfileValue>{profile.nom}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <ProfileLabel>Email:</ProfileLabel>
            <ProfileValue>{profile.email}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <ProfileLabel>Niveau:</ProfileLabel>
            <ProfileValue>{profile.niveau}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <ProfileLabel>Classe:</ProfileLabel>
            <ProfileValue>{profile.Classe}</ProfileValue>
          </ProfileField>
          <ProfileField>
            <ProfileLabel>Date de naissance:</ProfileLabel>
            <ProfileValue>{profile.dateNaissance}</ProfileValue>
          </ProfileField>
        </ProfileInfo>
      </ProfileContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;

  & > button {
    margin-right: 1em;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2em;
  margin-left:-2em;
  background-color:white;
  padding:1.5em;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 2em;
  margin-top:-330px;
  `;
  
  const ProfileInfo = styled.div``;
  
  const Title = styled.h1`
  color: grey;
  text-align: center;
  
  @media (max-width: 768px) {
  margin-top: 0.5em;
  font-size: 1.5em;
  }
  `;
  
  const ProfileField = styled.div` margin-bottom: 1em;`;
  
  const ProfileLabel = styled.h3 `color: #4981f5;`;
  
  const ProfileValue = styled.p `font-size: 16px; margin-top: 0.5em;`;