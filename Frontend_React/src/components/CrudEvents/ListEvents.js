import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Events.css'

function ListEvents() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const navigate = useNavigate();



    const handleDelete = (id) => {
        setData(data.filter(item => item.idEvenement !== id));
    }
    useEffect(() => {
        axios.get('http://localhost:3000/evenement', {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("Getting", res.data)
            setData(res.data)
        }).catch(err => console.log(err));
    }, [])

    const DeleteEvent = (id) => {
        axios.delete(`http://localhost:3000/evenement/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => console.log("this is the Delete method", res),
                handleDelete(id)
            ).catch(err => console.log(err));
    }

    const arr = data.map((i) => {
        return (
            <tr>
                <td className="colonne">
                    {i.idEvenement}
                </td>
                <td className="colonne">
                    {i.nom}
                </td>
                <td className="colonne">
                    {i.dateEvenement}
                </td>
                <td className="colonne">
                    {i.description}
                </td>
                <td className="colonne">
                    <button className="list_btn" onClick={() => navigate(`/Events/${i.idEvenement}`, { replace: true })} >edit</button>
                </td>
                <td className="colonne">
                    <button className="list_btn" onClick={() => DeleteEvent(i.idEvenement)} >delete</button>
                </td>
            </tr>
        )

    })
    return (
        <Fragment>
            <div className="container">
                <h2 className="list_title" >La Liste des Evenements </h2>
                <div style={{ margin: "4rem", marginTop: "3rem" }}>
                    <table className="custom-table" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="table_head">
                                    IdEvent
                                </th>
                                <th className="table_head">
                                    Even Name
                                </th>
                                <th className="table_head">
                                    Date
                                </th>
                                <th className="table_head">
                                    Description
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

export default ListEvents;