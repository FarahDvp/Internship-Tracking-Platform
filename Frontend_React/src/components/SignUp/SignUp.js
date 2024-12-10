import React, { useState } from 'react';
import {sighUpAlumni } from '../../api/api';
import "./style/style.css";
import { useNavigate } from "react-router-dom";
import { CountryCodes } from "../AlumniStats/CountryCodes";

function SignupAlumni() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    formation: "",
    poste: "",
    email: "",
    mdp: "",
    confirmPassword: "",
    dateObtentionDiplome: "",
    dateEmbacuhe: "",
    societe: "",
    pays: "",
  });
  const [formError, setFormError] = useState("");
  const [inputDateNaisType, setInputDateNaisType] = useState("text");
  const [inputDateEmbType, setInputDateEmbType] = useState("text");
  const [inputDateObtType, setInputDateObtType] = useState("text");

  const handleFocus = (e) => {
    
    switch (e.target.name){

      case 'dateNaissance' : setInputDateNaisType("date");
        break;
      case 'dateObtentionDiplome' : setInputDateObtType("date");
        break;
      case 'dateEmbacuhe' : setInputDateEmbType("date");
        break;
      default : break;

    }
  };

  const handleBlur = (e) => {
    
    switch (e.target.name){
      case 'dateNaissance' : if (!e.target.value) { setInputDateNaisType("text");}
        break;
      case 'dateObtentionDiplome' : if (!e.target.value) { setInputDateObtType("text");}
        break;
      case 'dateEmbacuhe' : if (!e.target.value) { setInputDateEmbType("text");}
        break;
      default : break;
    }
    
  };

  const calculateAge = (birthdayString) => {
    const birthday = new Date(birthdayString);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Check if passwords match
    if (formData.mdp !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

     // Check if age is at least 22
    const age = calculateAge(formData.dateNaissance);
    if (age < 22) {
      setFormError("You must be at least 22 years old to sign up");
      return;
    }

    // Check if dateEmbacuhe is after dateObtentionDiplome
    const dateObt = new Date(formData.dateObtentionDiplome);
    const dateEmb = new Date(formData.dateEmbacuhe);
    if (dateEmb <= dateObt) {
      setFormError("Date d'embauche must be after date d'obtention du diplôme");
      return;
    }

    try {
        const etudiant = {
            EtudiantAluId: (formData.login).toString(),
            dateObtentionDiplome: formData.dateObtentionDiplome,
            dateEmbacuhe: formData.dateEmbacuhe,
            nom : formData.nom,
            prenom : formData.prenom,
            dateNaissance : formData.dateNaissance,
            formation : formData.formation,
            poste : formData.poste,
            login : Number(formData.login),
            email : formData.email,
            mdp : formData.mdp,
            societe : formData.societe,
            pays : formData.pays,
            verified : null
        };
        const response = await sighUpAlumni(etudiant);
        console.log(response);
        navigate("/signin")
  
    } catch (error) {
      if ((error.response.data.message).includes("duplicate key")){
        console.log('Login Already Existing');
        setFormError('Login Already Existing');
      }
      else{
        setFormError('Something Wrong Happened ... Try Again Later');
      }
      
    }
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
        <div className='signup-container'>
           {formError && <div className='error'>{formError}</div>}
          <div className='title'>
            <h1>Sign Up Alumni</h1>
          </div>
          <div className='form-group'>
            <form onSubmit={handleSubmit} className="form">
              <div className='top-part'>
                <div className='row-1'>
                  <input
                  className='signInput'
                  type="text"
                  name="nom"
                  id="nom"
                  required
                  placeholder='Nom'
                  value={formData.nom}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="text"
                  name="prenom"
                  id="prenom"
                  required
                  placeholder='Prenom'
                  value={formData.prenom}
                  onChange={handleChange}
                  />
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type={inputDateNaisType}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name="dateNaissance"
                  id="dateNaissance"
                  required
                  placeholder='Date de Naissance'
                  value={formData.dateNaissance}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="text"
                  name="formation"
                  id="formation"
                  required
                  placeholder='Formation'
                  value={formData.formation}
                  onChange={handleChange}
                  />
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type="text"
                  name="poste"
                  id="poste"
                  required
                  placeholder='Poste'
                  value={formData.poste}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  />
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type='number'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="login"
                  name="login"
                  placeholder="login"
                  required
                  value={formData.login}
                  onChange={handleChange}/>
                </div>

                <div className='row-1'>
                  <input
                  className='signInput'
                  type="password"
                  name="mdp"
                  id="mdp"
                  required
                  placeholder='Mot de Passe'
                  value={formData.mdp}
                  onChange={handleChange}
                  />

                  <input
                  className='signInput'
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder='Confirmer le Mot de Passe'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  />
                </div>
                <div className='row-1'>
                  <input
                  className='signInput'
                  type={inputDateObtType}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="dateObtentionDiplome"
                  name="dateObtentionDiplome"
                  required
                  placeholder="Date d'obtention du diplôme"
                  value={formData.dateObtentionDiplome}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}/>

                  <input
                  className='signInput'
                  type={inputDateEmbType}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  id="dateEmbacuhe"
                  name="dateEmbacuhe"
                  placeholder="Date d'embauche"
                  value={formData.dateEmbacuhe}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}/>
                </div>

                <div className='row-1'>
                <input
                  className='signInput'
                  type="text"
                  name="societe"
                  id="societe"
                  required
                  placeholder='Societé'
                  value={formData.societe}
                  onChange={handleChange}
                  />
                  <select
                    className='signInput'
                    name='pays'
                    id='pays'
                    value={formData.pays}
                    onChange={handleChange}
                    required
                    >
                    <option value=''>Sélectionnez un pays</option>
                    {CountryCodes.map((country) => (
                    <option key={country.countryName} value={country.countryName}>
                    {country.countryName}
                    </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='bottom-partS'>
                <button type="submit" className="btn">
                  S'inscrire
                </button>
                <p className='redirect'>Avez vous déja un compte?<span className='bold'> Connectez-vous</span></p>
              </div>
            </form>
          </div> 
        </div>
    )
};
    export default SignupAlumni;