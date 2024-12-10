import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import './PFA.css'

function ListPfas() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [select, setSelect] = useState(false);
    const navigate = useNavigate();

    const GetAllPfa = () => {
        let login = localStorage.getItem("login");

        axios.get(`http://localhost:3000/etudiant-actuel/get_by_login/${login}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("Getting", res.data.niveau)
            if (!res.data.niveau.includes("2")) {
                alert("You are not in the 2nd year");
                navigate("/");
            } else {
                axios.get('http://localhost:3000/validated_pfa', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(res => {
                    console.log("Getting", res.data);
                    setData(res.data);
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        GetAllPfa();
    }, []);

    useEffect(() => {
        let already_selected = false;
        data.forEach((dt) => {
            if (dt.idEtudiant === localStorage.getItem("login")) {
                already_selected = true;
            }
        });
        setSelect(already_selected);
    }, [data]);

    const choisirPfa = (pfa) => {
        axios.get(`http://localhost:3000/choisir_pfa/${pfa._id}/${localStorage.getItem("login")}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            GetAllPfa();
        }).catch(err => console.log(err));
    }

    const filteredData = data.filter(item => item.technologie.includes(searchTerm));

    const arr = filteredData.map((i) => {
        return (
            <tr key={i.idPfa}>
                <td className="colonne">
                    {i.idPfa}
                </td>
                <td className="colonne">
                    {i.titre}
                </td>
                <td className="colonne">
                    {i.description}
                </td>
                <td className="colonne">
                    {i.technologie}
                </td>
                <td className="colonne">
                    {i.nbEtudiants}
                </td>
                <td className="colonne">
                    {i.idEtudiant}
                </td>
                <td className="colonne">
                    {i.idEtudiant === localStorage.getItem("login") && "Mon PFA"}
                    {!(i.idEtudiant === localStorage.getItem("login")) && i.idEtudiant && "Choisissée"}
                    {!select && !i.idEtudiant && <button onClick={() => { choisirPfa(i) }}>Choisir</button>}
                </td>
            </tr>
        );
    });

    return (
        <Fragment>
            <div className="container">
                <h2 style={{ marginLeft: "70px", marginTop: "3rem", marginBottom: "-20px" }} className="list_title" >Choisir PFA </h2>
                <div style={{ margin: "4rem", marginTop: "3rem" }}>
                    <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Recherche par technologie" />
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
                                    Description
                                </th>
                                <th className="table_head">
                                    Technologie
                                </th>
                                <th className="table_head">
                                    Nb etudiants
                                </th>
                                <th className="table_head">
                                    Id Etudiant
                                </th>
                                <th className="table_head">
                                    Action
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
    );
}

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 35px;
  width: 98%;
`;

export default ListPfas;
