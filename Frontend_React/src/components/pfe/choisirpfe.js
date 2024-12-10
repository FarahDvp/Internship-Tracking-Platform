import {
  Alert,
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Choisirpfe() {
  const [data, setData] = useState([]);
  const [etudiant, setEtudiant] = useState([]);
  const [button, setButton] = useState(false);
  let et;
  const navigate = useNavigate();
  const encadrerPfe = (id) => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const sub = user.sub;
    console.log("Front", id, sub);
    axios
      .post("http://localhost:3000/pfe/encadrant", {
        idpfe: id,
        idEnseignant: sub,
      })
      .then(() => {
        navigate("/getpfeenseignant");
        setButton(false);
      })
      .catch(setButton(true));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get("http://localhost:3000/etudiant-actuel/pfe").then((res) => {
      const datatofilter = res.data;
      console.log(datatofilter);
      const filtereddata = datatofilter.filter((d) => d.idEnseignant == null);
      console.log(filtereddata);
      setData(filtereddata);
      console.log(data);
    });
  }, []);

  return (
    <Container>
      <FormContainer>
        {button && (
          <Alert severity="error">
            Un erreur est survenue ... Veuillez Essayer Plus Tard !{" "}
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sujet</TableCell>
                <TableCell align="right">Nom Etudiant</TableCell>
                <TableCell align="right">Affectation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="right"
                      onClick={() => {
                        navigate(`/pfe/${row.idpfe}`, {
                          replace: true,
                        });
                        console.log("row====", row);
                      }}
                    >
                      {" "}
                      <a>{row.sujet}</a>
                    </TableCell>
                    <TableCell align="right">
                      <a
                        onClick={() => {
                          navigate(`/etudiant/${row.etudiant.login}`, {
                            replace: true,
                          });
                          console.log("row====", row);
                        }}
                      >
                        {row.etudiant.nom + " " + row.etudiant.prenom}
                      </a>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          encadrerPfe(row.idpfe);
                        }}
                      >
                        {" "}
                        Encadrer{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FormContainer>
    </Container>
  );
}
const Container = styled.div`
  background-color: #dfdfdf;
  width: auto;
  display: flex;
  jusitfy-content : center;
    @media (max-width: 768px) {
      width: auto;

    height auto;
  }
`;
const FormContainer = styled.div`
  width : 90%;
  height : auto;


 margin-left:3em;


border-radius: 30px;
@media (max-width: 768px) {
  width : auto;
  height auto;
  margin : 0.2em;
}

`;
