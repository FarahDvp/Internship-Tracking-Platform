import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  Switch,
} from "react-router-dom";
import GetEtudiant from "./getetudiant";
import EtudiantPUT from "./modifieretudiant";
import EtudiantADD from "./ajoutetudiant";
import Signin from "../signin";
import InsertStageEte from "./insertStageEte";
import InsertPFE from "./insertPFE";
import GetallEtudiants from "./getallEtudiants";

export default function EtudiantCRUD() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/ajouteretudiant">Ajout Etudiant</Link>
            </li>
            <li>
              <Link to="/getetudiant">Afficher Etudiant</Link>
            </li>
            <li>
              <Link to="/modifyetudiants">Modifier Etudiants </Link>
            </li>
            <li>
              <Link to="/signin">Se connecter </Link>
            </li>
            <li>
              <Link to="/insertstage">Inserer Stage </Link>
            </li>
            <li>
              <Link to="/insertpfe">Inserer PFE </Link>
            </li>
            <li>
              <Link to="/getalletudiant">Afficher tous les étudiants </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/getetudiant" element={<GetEtudiant />} />
          <Route path="/modifyetudiants" element={<EtudiantPUT />} />
          <Route path="/ajouteretudiant" element={<EtudiantADD />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/insertstage" element={<InsertStageEte />} />
          <Route path="/insertpfe" element={<InsertPFE />} />
          <Route path="/getalletudiant" element={<GetallEtudiants />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
