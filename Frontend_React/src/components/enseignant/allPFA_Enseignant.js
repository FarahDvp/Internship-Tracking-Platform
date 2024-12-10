import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import styled from 'styled-components';
import './pfa.css'

function ListPfasEnseignant() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    const handleDelete = (id) => {
        setData(data.filter(item => item.idPfa !== id));
    }

    //valide
 /*    const MakeState = ({ project_life_cycle = "Pending_Validation" }) => {
        switch (project_life_cycle) {
            case "Pending_Accept_By_Resp":
                return (
                    <div
                        label="Attend Responsable"
                        color="error"
                    />
                );
            case "Pending_Validation":
                return (
                    <div
                        label="Attend Validation"
                        color="warning"
                    />
                );
            case "Validated":
                return <div label="Validée" color="success"  />;
            default:
                return (
                    <div
                        label="Attend Responsable"
                        color="error"
                        // className={styles.chip}
                    />
                );
        }
    };
 */

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const user = jwtDecode(token);
        axios
            .get("http://localhost:3000/pfa")
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            });
    }, []);

    const DeletePfa = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3000/pfa/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => console.log("this is the Delete method", res),
                handleDelete(id)
            ).catch(err => console.log(err));
    }


    const filteredData = data.filter(item => item.technologie.includes(searchTerm));

    const arr = filteredData.map((i) => {
        return (
            <tr>
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
                    <button className="list_btn" onClick={() => navigate(`/updatepfa/${i.idPfa}`, { replace: true })} >edit</button>
                </td>
                <td className="colonne">
                    <button className="list_btn" onClick={() => DeletePfa(i.idPfa)} >delete</button>
                </td>
            </tr>
        )

    })
    return (
        <Fragment>
            <div className="container">

                <button style={{ float: "Right", margin: "4rem" }} className="list_btn" onClick={() => navigate(`/addpfa`, { replace: true })} >add</button>

                <h2 style={{ marginLeft: "70px", marginTop: "3rem", marginBottom: "-20px" }} className="list_title" >La Liste des PFA </h2>
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

                                </th>
                                <th className="table_head">

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

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 35px;
  margin-top: -40px;
  width:98%;
`;

export default ListPfasEnseignant; 