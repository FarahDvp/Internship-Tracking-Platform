import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jwt_decode from 'jwt-decode';
import { deletePublication, getEtudiantAlumni, viewPublications } from '../../api/api';
import { useNavigate } from "react-router-dom";
import { getToken } from '../../api/api';
import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Empty } from "../ContratExpert/VoirContratExpert";

function ViewMyPublications() {
    const [publication, setPublication] = useState([]);
    const navigate = useNavigate();
    const decodedToken = jwt_decode(getToken());

    const handleDelete = (id) => {
        setPublication(publication.filter(item => item.idPublication !== id));
    }
    useEffect(() => {
        const fetchData = async () => {
          const data = await viewPublications();
          const publicationInfo = await Promise.all(data.map(async (i) => {
            const dataC = await getEtudiantAlumni(i.EtudiantAluId);
            return {
              EtudiantAluId:i.EtudiantAluId,
              idPublication:i.idPublication,
              contenu: i.contenu,
              type: i.type,
              nomEtudiant: dataC.nom,
              prenomEtudiant: dataC.prenom
            };
          }));
          const myPosts=publicationInfo.filter(item => item.EtudiantAluId == decodedToken.sub)
          console.log(publicationInfo);
          console.log(myPosts);
          setPublication(myPosts);
        };
        fetchData();
    },[]);

    const DeletePublication = (id) => {
        deletePublication(id).then((res) => {
            console.log(res);
            handleDelete(id);
        }).catch((er) => {
            console.log("ERROR CATCHED BY ME ", er);
        });
    };

    const data = publication.map((i,index) => {
        return (
                <GridBox>
                    <SectionTitle>{i.type}</SectionTitle>
                    <Top>
                        <InfoRow>
                            <Picture src="..\profile.png"/>
                            <Value>{i.nomEtudiant} {i.prenomEtudiant}</Value>  
                        </InfoRow>
                        <InfoRow>
                            <Value>{i.contenu}</Value>
                        </InfoRow>
                        
                    </Top>
                    <Bottom>
                        <Button onClick={() => DeletePublication(i.idPublication)} style={{"backgroundColor":'red'}}>Supprimer</Button>
                        <Button onClick={() => navigate(`/updatePublication/${i.idPublication}` , { replace: true })}  >Modifier</Button>
                    </Bottom>
                </GridBox>
        );
    });

  return (  
    <Container>
        <PageTitle>My publications</PageTitle>
        <IconButton onClick={() => navigate(`/postpublication` , { replace: true })}>
            <AddCircleIcon style={{"color":"#4981f5" , "font-size":"4rem"}}/><p style={{fontFamily:'proximanovasemi',fontSize:"2rem",color:"#4981f5"}}> Add</p>
        </IconButton>
        {publication.length === 0 ? <Empty>Vous n'avez aucune publication</Empty> : data}
    </Container>
  )
}

export default ViewMyPublications;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding:20px;
    width: 95%; 
    margin: 10% auto;
    border-width: 0.5px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    border-radius: 30px;
    background-color:rgb(255, 255, 255) ;
    padding-block: 20px;

`
const Picture=styled.img`
    width:5em;
    height:5em;
    align-self: center;
    @media (max-width: 550px) {
        width:3em;
        height:3em;
    }
`
const PageTitle = styled.h1`
    font-family: 'montserrat';
    color: #4981f5;
    font-weight:800;
    font-size: 3rem;
    align-self: center;  
    @media (max-width: 750px) {
        font-size: 2rem;
    }
    @media (max-width: 550px) {
        font-size: 1.5rem;
    }
    @media (max-width: 400px) {
        font-size: 1rem;
        text-align:center;
    }
`


const Button = styled.button`
    width: 100%;
    height: 2.5em;
    border: none;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    background: #4981f5;
    font-family: "montserrat";
    font-weight: 800;
    font-size: 0.8rem;
    color: #ffffff;
    margin-bottom: 0.5em;
    cursor: pointer;
    @media (max-width: 910px) {
        font-size: 0.6rem;
    }
    @media (max-width: 580px) {
        font-size: 0.8rem;
        height: 3em;
        align-self: center;
    }
`

const Top = styled.div`
    display: flex;
    gap:20%;
    flex-direction: column;
`
const Bottom = styled.div`
    width:100%;
    text-align:center;
    margin-top: -2em;
    margin-bottom: 0.5em;
`
const GridBox = styled.div`
    width: 80%;
    display: flex;
    align-self: center;
    gap:2em;
    flex-direction: column;
    background-color:#f0f0f0;
    border-radius:15px 15px 0px 0px ;
    border : 1px solid #C8CCCD;
    margin-bottom:2em;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    transition: all ease-in 0.1s;
    :hover{
        background-color:#f8f8f8; 
    }
    
`
const InfoRow = styled.div`
    display: flex;
    width:100%;
    gap:0.5em;
    padding:10px;
    flex-direction: row;
`
const Title = styled.p`
    font-size: 1rem;
    width:50%;
    font-family: "montserrat";
    font-weight: 1000;
    white-space:nowrap;
    @media (max-width: 350px) {
        font-size: 0.8rem;
    }
    @media (max-width: 300px) {
        font-size: 0.75rem;
    }
`
const Value = styled.p`
    font-size: 1rem;
    width:80%;
    align-self: center;
    font-family: "montserrat";
    word-wrap: break-word;
    white-space: pre-line;
    text-align: start;
    @media (max-width: 350px) {
        font-size: 0.8rem;
    }
    @media (max-width: 300px) {
        font-size: 0.7rem;
    }
`
const SectionTitle=styled.h2`
    font-family: 'montserrat';
    color:white ;
    font-size: 2.3rem;
    background-color: #4981f5;
    border-radius: 15px 0px 15px 0px;
    width: 10em;
    padding-left:0.5em;
    margin:0;
    text-align: start;
    @media (max-width: 550px) {
        font-size: 2rem;
        width: 7em;
    }
    @media (max-width: 345px) {
        background-color:#F0F0F0;
        color:#4981f5;
        width:fit-content;
        font-size: 1.5rem;
    }
`