import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import './PFA.css';

function ListPfas() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [Filter, setFilter] = useState({ technologie: '', validated: 'All' });
  const [filtered_data, setFilteredData] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const navigate = useNavigate();

  const GetAllPfa = () => {
    axios.get('http://localhost:3000/pfa', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        console.log("Getting", res.data);
        setData(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    GetAllPfa();
  }, []);

  const validerPfa = (pfa) => {
    axios.get(`http://localhost:3000/validate_pfa/${pfa._id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        GetAllPfa();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setFilteredData([...data]);
    let all_technos = [];
    data.forEach((pf) => {
      if (typeof pf.technologie === 'string') {
        all_technos = [...all_technos, ...pf.technologie.split('-')];
      }
    });
    setTechnologies(['All', ...all_technos]);
  }, [data]);

 

  useEffect(() => {
    let filtered = [...data];
    if (Filter.technologie !== 'All') {
      filtered = data.filter((dt) => {
        if (typeof dt.technologie === 'string') {
          return dt.technologie.indexOf(Filter.technologie) !== -1;
        }
        return false;
      });
    }

    if (Filter.validated !== 'All') {
      let valid = Filter.validated === 'Validated';
      filtered = filtered.filter((dt) => {
        return dt.validated === valid;
      });
    }

    setFilteredData([...filtered]);
  }, [Filter, data]);

  const handleTechnologieChange = (e) => {
    setFilter({ ...Filter, technologie: e.target.value });
  };

  const handleValidationChange = (e) => {
    setFilter({ ...Filter, validated: e.target.value });
  };

  const arr = filtered_data.map((i) => {
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
          {i.idEtudiant}
        </td>
        <td className="colonne">
          {i.validated ? "Validée" : <button onClick={() => { validerPfa(i) }}>Valider</button>}
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <div className="container">
        <h2 style={{ marginLeft: "70px", marginTop: "3rem", marginBottom: "-20px" }} className="list_title" >La Liste des PFA </h2>
        <div style={{ margin: "4rem", marginTop: "3rem" }}>
          <Input type="text" value={Filter.technologie} onChange={handleTechnologieChange} placeholder="Recherche par technologie" />
          <Select value={Filter.validated} onChange={handleValidationChange}>
            <option value="All">Toutes les validations</option>
            <option value="Validated">Validées</option>
            <option value="NotValidated">Non validées</option>
          </Select>
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

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 35px;
  width: 98%;
`;

export default ListPfas;
