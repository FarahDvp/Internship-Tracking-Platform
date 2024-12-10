import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getEtudiantAlumni,ValiderCompteAlu,RefuserCompteAlu} from '../../api/api';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Container, ProfilePicture , NameRow , Prenom , Nom , InformationRow , Title , Value  , Loading} from "../AlumniAccountState/AlumniAccountState";




function VerifyAlumniAccount () {

  const { id } = useParams();
  const navigate = useNavigate();
  const [etudiantAlumni, setEtudiantAlumni] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  
  useEffect(() => {
      const fetchData = async () => {
      const data = await getEtudiantAlumni(id);
      setEtudiantAlumni(data);
      };
      fetchData();
      if (isVerified!=null) {
        return navigate("/getunverified");
      }
  },[isVerified]);

  const ValiderCompte = (id) => {
      ValiderCompteAlu(id).then((res) => {
          console.log(res);
          setIsVerified(true);
      }).catch((er) => {
          console.log("ERROR CATCHED BY ME ", er);
      });
  };

  const RefuserCompte = (id) => {
    RefuserCompteAlu(id).then((res) => {
        console.log(res);
        setIsVerified(true);
    }).catch((er) => {
        console.log("ERROR CATCHED BY ME ", er);
    });
  };

  return (
    <div>
      {etudiantAlumni ? (
        <Container>
        <ProfilePicture src="..\profile.png"></ProfilePicture>
        <NameRow>
          <Prenom>{etudiantAlumni.prenom}<Nom> {etudiantAlumni.nom}</Nom></Prenom>
        </NameRow>
        <InformationRow>
          <Title>Email</Title><Value>{etudiantAlumni.email}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Date De Naissance</Title><Value>{etudiantAlumni.dateNaissance}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Formation</Title><Value>{etudiantAlumni.formation}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Poste</Title><Value>{etudiantAlumni.poste}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Date Obtention Diplome</Title><Value>{etudiantAlumni.dateObtentionDiplome}</Value>
        </InformationRow>
        <InformationRow>
          <Title>Date Embauche</Title><Value>{etudiantAlumni.dateEmbacuhe}</Value>
        </InformationRow>
        <Button onClick={() => ValiderCompte(etudiantAlumni.EtudiantAluId)}>Valider</Button>
        <Button style={{backgroundColor:"red"}} onClick={() => RefuserCompte(etudiantAlumni.EtudiantAluId)}>Refuser</Button>
      </Container>
      ) : (
        <Container><Loading>Loading...</Loading> </Container>
        
      )}
    </div>
  );
};

export default VerifyAlumniAccount;

const Button = styled.button`
    width: 90%;
    height: 2.5em;
    border: none;
    border-radius: 12.92vw;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    background: #4981f5;
    font-family: "montserrat";
    font-weight: 800;
    font-size: 0.8rem;
    color: #ffffff;
    align-self: center;
    cursor: pointer;
`