import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateEns.css";

function UpdateEns() {
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [enseignant, setEns] = useState([
    {
      idEnseignant: "",
      nom: "",
      prenom: "",
      email: "",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/enseignant/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("this is the get method", res.data);
        setEns(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleInput = (e) => {
    setEns({ ...enseignant, [e.target.name]: e.target.value });
  };
  const UpdateEns = (e) => {
    axios
      .put("http://localhost:3000/enseignant", enseignant)
      .then(
        (res) => console.log("this is the update method", res),
        navigate(`/enseignants/`, { replace: true })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="contact1">
      <div className="container-contact1">
        <div className="contact1-pic js-tilt" data-tilt>
          <img src="/teachers.png" alt="IMG" />
        </div>

        <div className="contact1-form">
          <span className="contact1-form-title">Update Enseignant</span>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Event ID"
              value={enseignant.idEnseignant || ""}
            />
          </div>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Enseignant Name"
              value={enseignant.nom || ""}
              onChange={handleInput}
              name="nom"
            />
          </div>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Enseignant Last Name"
              value={enseignant.prenom || ""}
              onChange={handleInput}
              name="prenom"
            />
          </div>
          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Enseignant Email"
              value={enseignant.email || ""}
              onChange={handleInput}
              name="email"
            />
          </div>
          <div className="wrap-input1">
            <label>Can't Change Login</label>
            <input
              className="input1"
              type="text"
              placeholder="Login"
              value={enseignant.login || ""}
             // onChange={handleInput}
              name="login"
            />
          </div>
          <div className="container-contact1-form-btn">
            <button className="contact1-form-btn" onClick={UpdateEns}>
              <span>Update Enseingnant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEns;
