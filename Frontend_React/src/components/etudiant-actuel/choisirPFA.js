import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './PFA.css'
import jwtDecode from "jwt-decode";
import {Alert, Button} from "@mui/material" ;

function ChoisirPfa() {
    const [data, setData] = useState([]);
    const [etudiant, setEtudiant] = useState([]);
    const [button, setButton] = useState(false);
    let et;
    const navigate = useNavigate();
    const encadrerPfa = (id) => {
        const token = localStorage.getItem("token");
        const user = jwtDecode(token);
        const sub = user.sub;
        console.log("Front", id, sub);
        axios
            .post("http://localhost:3000/choosepfa", {
                idPfa: id,
                idEtudiant: sub,
            })
            .then(() => {
                navigate("/getallenseignantpfa");
                setButton(false);
            })
            .catch(setButton(true));
    };

    const arr = data.map((i) => {
        return (
            <tr>
                <td className="colonne" onClick={() => {
                        navigate(`/pfa/${i.idPfa}`, {
                          replace: true,
                        });
                        console.log("row====", i);
                      }}
                    >
                      {" "}
                      <a>{i.idPfa}</a>
                </td>
                <td className="colonne" onClick={() => {
                        navigate(`/pfa/${i.idPfa}`, {
                          replace: true,
                        });
                        console.log("row====", i);
                      }}
                    >
                      {" "}
                      <a>{i.titre}</a>
                </td>
                <td className="colonne">
                <a
                        onClick={() => {
                          navigate(`/etudiant/${i.etudiant.login}`, {
                            replace: true,
                          });
                          console.log("row====", i);
                        }}
                      >
                        {i.etudiant.nom + " " + i.etudiant.prenom}
                      </a>
                </td>
                <td className="colonne">
                <Button
                        onClick={() => {
                          encadrerPfa(i.idPfa);
                        }}
                      >
                        {" "}
                        Encadrer{" "}
                      </Button>
                </td>
            </tr>
        )

    })

    return (
        <Fragment>
            <div className="container">
                {button && (
                    <Alert severity="error">
                        Un erreur est survenue ... Veuillez Essayer Plus Tard !{" "}
                    </Alert>
                )}
                <div style={{ margin: "4rem", marginTop: "3rem" }}>
                    <table className="custom-table" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="table_head">
                                    Id PFA
                                </th>
                                <th className="table_head">
                                    Titre
                                </th>
                                <th className="table_head">
                                    Nom Etudiant
                                </th>
                                <th className="table_head">
                                    Affectation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )

}

export default ChoisirPfa;