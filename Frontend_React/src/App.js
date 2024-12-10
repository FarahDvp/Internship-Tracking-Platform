import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CreateEvent from "./components/CrudEvents/CreateEvent";
import ListEvents from "./components/CrudEvents/ListEvents";
import UpdateEvent from "./components/CrudEvents/updateEvent";

import CreateTeacher from "./components/CrudEns/CreateEnseig";
import ListEnseignants from "./components/CrudEns/ListEnseignents";
import UpdateEns from "./components/CrudEns/updateEns";
import SignupAlumni from "./components/SignUp/SignUp";
import styled from "styled-components";
import InsertStageEte from "./components/etudiant/insertStageEte";
import GetEtudiant from "./components/etudiant/getetudiant";
import Signin from "./components/signin";
import InsertPFE from "./components/etudiant/insertPFE";
import GetallEtudiants from "./components/etudiant/getallEtudiants";
import EtudiantADD from "./components/etudiant/ajoutetudiant";
import EtudiantPUT from "./components/etudiant/modifieretudiant";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import AlumniAccountState from "./components/AlumniAccountState/AlumniAccountState";
import GetUnverifiedAlumniAccounts from "./components/ValidateAlumniAccount/GetUnverifiedAlumniAccounts";
import VerifyAlumniAccount from "./components/ValidateAlumniAccount/VerifyAlumniAccount";
import SideBar from "./components/SideBar/SideBar";
import Choisirpfe from "./components/pfe/choisirpfe";
import Getpfe from "./components/pfe/getpfe";
import GetpfeByEnseignantId from "./components/pfe/getpfeByEnseignantID";
import PfeStats from "./components/pfe/pfeStats";
import EnseignantDashboard from "./components/enseignantDashboard";
import GetEtudiantByParam from "./components/etudiant/getetudiantbyParam";
import GetPfeByParam from "./components/pfe/getPfeByParam";
import AlumniGeneralStats from "./components/AlumniStats/AlumniGeneralStats";
import DemanderVacation from "./components/Vacation/DemanderVacation";
import VoirVacation from "./components/Vacation/VoirVacation";
import PostPublication from "./components/Publications/PostPublication";
import ViewPublication from "./components/Publications/ViewPublication";
import UpdatePublication from "./components/Publications/UpdatePublication";
import ViewMyPublications from "./components/Publications/ViewMyPublications";
import DemanderContratExpert from "./components/ContratExpert/DemanderContratExpert";
import VoirContratExpert from "./components/ContratExpert/VoirContratExpert";
import ChoisirPfa from "./components/ChoisirPfa/allPFA";


import UpdateCV from "./components/etudiant-actuel/updateCV";
import GetCV from "./components/etudiant-actuel/getCV";
import EditProfile from "./components/etudiant-actuel/EditProfile";
import Profile from "./components/etudiant-actuel/profile";
import GetallPFAs from "./components/pfa/allPFA";
import AddPFA from "./components/enseignant/addPFA";
import UpdatePFA from "./components/enseignant/updatePFA"
import ListPfasEnseignant from './components/enseignant/allPFA_Enseignant';



function App() {
  const location = useLocation();
  return (
    <Container>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <LeftSide>
          <SideBar />
        </LeftSide>
      )}
      <RightSide>
        <Routes>
          <Route path="/Events" element={<ListEvents />} />
          <Route path="/newEvent" element={<CreateEvent />} />
          <Route path="/Events/:id" element={<UpdateEvent />} />
          <Route path="/signup" element={<SignupAlumni />} />
          <Route path="/enseignants" element={<ListEnseignants />} />
          <Route path="/NewEnseignant" element={<CreateTeacher />} />
          <Route path="/enseignants/:id" element={<UpdateEns />} />
          <Route path="/getetudiant" element={<GetEtudiant />} />
          <Route path="/modifyetudiants" element={<EtudiantPUT />} />
          <Route path="/ajouteretudiant" element={<EtudiantADD />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/alumnistatus" element={<AlumniAccountState />} />
          <Route path="/choose_pfa" element={<ChoisirPfa />} />
          
          <Route
            path="/getunverified"
            element={<GetUnverifiedAlumniAccounts />}
          />
          <Route path="/valider/:id" element={<VerifyAlumniAccount />} />
          <Route path="/passreset" element={<UpdatePassword />} />
          <Route path="/insertstage" element={<InsertStageEte />} />
          <Route path="/insertpfe" element={<InsertPFE />} />
          <Route path="/getalletudiant" element={<GetallEtudiants />} />
          <Route path="/getpfe" element={<Getpfe />} />
          <Route path="/getpfeenseignant" element={<GetpfeByEnseignantId />} />
          <Route path="/getpfeStats" element={<PfeStats />} />
          <Route
            path="/enseignantdashboard"
            element={<EnseignantDashboard />}
          />
          <Route path="/choisirpfe" element={<Choisirpfe />} />
          <Route path="/etudiant/:id" element={<GetEtudiantByParam />} />
          <Route path="/pfe/:id" element={<GetPfeByParam />} />
          <Route path="/vacations" element={<VoirVacation />} />
          <Route path="/contrats" element={<VoirContratExpert />} />
          <Route path="/demandervacation" element={<DemanderVacation />} />
          <Route path="/demandercontratexpert" element={<DemanderContratExpert />} />
          <Route path="/generalstats" element={<AlumniGeneralStats />} />
          <Route path="/postpublication" element={<PostPublication />} />
          <Route path="/viewpublications" element={<ViewPublication />} />
          <Route path="/mypublications" element={<ViewMyPublications />} />
          <Route path="/updatepublication/:id" element={<UpdatePublication />} />



          <Route path="/updateCV/:id" element={<UpdateCV />} />
          <Route path="/getCV/:id" element={<GetCV />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/Editprofile/:id" element={<EditProfile />} />
          <Route path="/getallpfa" element={<GetallPFAs />} />
          <Route path="/addpfa" element={<AddPFA/>} />
          <Route path="/updatepfa/:id" element={<UpdatePFA/>} />
          <Route path="/getallenseignantpfa" element={<ListPfasEnseignant />} />
          <Route path="/choisirpfa" element={<ChoisirPfa />} /> 



        </Routes>
      </RightSide>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  flex-direction: row;
`;

const LeftSide = styled.div`
  transition: all ease-in 0.3s;
  z-index: 99;
`;

const RightSide = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
