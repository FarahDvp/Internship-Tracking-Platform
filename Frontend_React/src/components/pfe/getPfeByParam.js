import React, { useEffect, useState } from "react";
import FormComponent from "../formContainer";
import styled from "styled-components";

import { Alert, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function GetPfeByParam() {
  const [pfe, setPfe] = useState({
    sujet: " ",
    societe: "",
    type: "",
    pays: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/pfe/" + id)
      .then((response) => {
        console.log(response);
        setPfe((prevState) => {
          return {
            sujet: response.data.sujet,
            societe: response.data.societe,
            type: response.data.type,
            pays: response.data.pays,
          };
        });
      })
      .catch();
    console.log(pfe);
  }, []);
  return (
    <FormComponent height="160%">
      <div className="cv-box">
        <DobContainer>
          <TitleLogin>{pfe.sujet}</TitleLogin>
          <InputName>Societe</InputName>
          <p>{pfe.societe}</p>

          <InputName>Type</InputName>

          <p>{pfe.type}</p>

          <InputName>Pays</InputName>

          <p>{pfe.pays}</p>
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
