import axios from "axios";
import React, { useState } from "react";
import "./CreateEns.css";

function CreateTeacher() {
  const token = localStorage.getItem("token");

  const [idEnseignant, setIdEns] = useState("");
  const [NomEns, setNomEns] = useState("");
  const [PrenomEns, setPrenomEns] = useState("");
  const [login, setLogin] = useState("");
  const [mdp, setMdp] = useState("");
  const [Email, setEmail] = useState("");

  const AddEns = (e) => {
    axios
      .post(
        "http://localhost:3000/enseignant",
        {
          idEnseignant: idEnseignant,
          nom: NomEns,
          prenom: PrenomEns,
          login: login,
          mdp: mdp,
          email: Email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        (res) => console.log("this is the post method", res),
        window.location.reload(false)
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
          <span className="contact1-form-title">Ajouter Enseignant</span>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Enseignant ID"
              value={idEnseignant}
              onChange={(e) => setIdEns(e.target.value)}
            />
          </div>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Enseingnant Name"
              value={NomEns}
              onChange={(e) => setNomEns(e.target.value)}
            />
          </div>

          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Ens Last Name"
              value={PrenomEns}
              onChange={(e) => setPrenomEns(e.target.value)}
            />
          </div>
          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Ens Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Password"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
            />
          </div>
          <div className="wrap-input1">
            <input
              className="input1"
              type="text"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="container-contact1-form-btn">
            <button className="contact1-form-btn" onClick={AddEns}>
              <span>Ajouter Enseignant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateTeacher;
