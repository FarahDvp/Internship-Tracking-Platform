import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getEtudiantAlumni, getVacations } from '../../api/api';

function VoirVacation() {

    const [vacation, setVacation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getVacations();
          const vacationInfo = await Promise.all(data.map(async (i) => {
            const dataC = await getEtudiantAlumni(i.EtudiantAluId);
            return {
              titre: i.titre,
              description: i.description,
              nomEtudiant: dataC.nom,
              prenomEtudiant: dataC.prenom
            };
          }));
          console.log(vacationInfo);
          setVacation(vacationInfo);
        };
        fetchData();
    },[]);

    const data = vacation.map((i,index) => {
        return (
                <GridBox>
                    <SectionTitle>Demande n° {index+1}</SectionTitle>
                    <Top>
                        <InfoRow>
                            <Title>Par</Title>
                            <Value>{i.nomEtudiant} {i.prenomEtudiant}</Value>  
                        </InfoRow>
                        <InfoRow>
                            <Title>Titre</Title>
                            <Value>{i.titre}</Value>
                        </InfoRow>
                        <InfoRow>
                            <Title>Description</Title>
                            <Value>{i.description}</Value>
                        </InfoRow>
                    </Top>
                    <Bottom>
                        <Button >Voir CV</Button>
                    </Bottom>
                </GridBox>
        );
    });

  return (
    <Container>
        <PageTitle>Demandes de vacation</PageTitle>
        {vacation.length === 0 ? <Empty>Aucune vacation n'est demandée</Empty> : data}
    </Container>
    
  )
}

export default VoirVacation;

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
    cursor: pointer;
    @media (max-width: 910px) {
        font-size: 0.6rem;
    }
    @media (max-width: 580px) {
        font-size: 0.8rem;
        width: 50%;
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
    width: 100%;
    display: flex;
    gap:2em;
    flex-direction: column;
    background-color:#f0f0f0;
    border-radius:15px 15px 0px 0px ;
    border : 1px solid #C8CCCD;
    margin-bottom:2em;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    
`
const InfoRow = styled.div`
    display: flex;
    width:100%;
    gap:2em;
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
const Empty = styled.p`
    font-size: 1.5rem;
    font-family: "montserrat";
    font-weight: 1000;
    width: 100%;
    color: black;
    text-align:center;
    @media (max-width: 3.50px) {
        font-size: 0.8rem;
    }
    @media (max-width: 300px) {
        font-size: 0.75rem;
    }
`
const Value = styled.p`
    font-size: 1rem;
    width:40%;
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
    @media (max-width: 460px) {
        font-size: 2rem;
        width: 7em;
    }
    @media (max-width: 280px) {
        background-color:#F0F0F0;
        color:#4981f5;
        width:fit-content;
        font-size: 1.5rem;
    }
`
