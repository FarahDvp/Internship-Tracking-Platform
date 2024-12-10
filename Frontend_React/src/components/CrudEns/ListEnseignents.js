import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./listeEns.css";

function ListEnseignants() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.idEnseignant !== id));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/enseignant", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Getting", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const DeleteEvent = (id) => {
    axios
      .delete(`http://localhost:3000/enseignant/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        (res) => console.log("this is the Delete method", res),
        handleDelete(id)
      )
      .catch((err) => console.log(err));
  };

  const arr = data.map((i) => {
    return (
      <tr>
        <td className="colonne">{i.idEnseignant}</td>
        <td className="colonne">{i.nom}</td>
        <td className="colonne">{i.prenom}</td>
        <td className="colonne">{i.login}</td>
        <td className="colonne">{i.mdp}</td>
        <td className="colonne">{i.email}</td>
        <td className="colonne">
          <button className="list_btn"
            onClick={() =>
              navigate(`/enseignants/${i.idEnseignant}`, { replace: true })
            }
          >
            edit
          </button>
        </td>
        <td className="colonne">
          <button className="list_btn" onClick={() => DeleteEvent(i.idEnseignant)}>delete</button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <div className="container">
        <h2 className="titre">La Liste des Enseignants </h2>
        <div style={{ margin: "4rem", marginTop: "3rem" }}>
          <table className="custom-table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="table_head">Id Enseignant</th>
                <th className="table_head">Nom</th>
                <th className="table_head">Prenom</th>
                <th className="table_head">Login</th>
                <th className="table_head">Mot De Passe</th>
                <th className="table_head">Email</th>

                <th className="table_head">

                </th>
                <th className="table_head">

                </th>
              </tr>
            </thead>
            <tbody>{arr}</tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ListEnseignants;
