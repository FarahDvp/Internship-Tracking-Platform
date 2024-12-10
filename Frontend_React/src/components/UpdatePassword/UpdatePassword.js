import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import {changerPassEnseignant, changerPassAdmin, changerPassResponsable, changerPassEtudiant, getToken} from '../../api/api';
import "./style/style.css";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const decodedToken = jwt_decode(getToken());
  const handleSubmit = async (event) => {
    console.log(decodedToken.sub);
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    else{
      setErrorMessage(null);
      switch (decodedToken.roles[0]) {
        case 'enseignant' :
          try {
            const response = await changerPassEnseignant(decodedToken.sub,decodedToken.roles[0],oldPassword,newPassword);
            console.log(response);
            console.log('redirect');
          } catch (error) {
            console.error(error.response.data.message);
            if ((error.response.data.message) === 'Current password is incorrect'){
              setErrorMessage("L'ancien mot de passe est incorrecte veuiller le verifier");
            }
          };
          break;
          case 'responsable' :
            try {
              const response = await changerPassResponsable(decodedToken.sub,decodedToken.roles[0],oldPassword,newPassword);
              console.log(response);
              console.log('redirect');
            } catch (error) {
              console.error(error.response.data.message);
              if ((error.response.data.message) === 'Current password is incorrect'){
                setErrorMessage("L'ancien mot de passe est incorrecte veuiller le verifier");
              }
            };
            break;
          case 'etudiant' :
            try {
              const response = await changerPassEtudiant(decodedToken.sub,decodedToken.roles[0],oldPassword,newPassword);
              console.log(response);
              console.log('redirect');
            } catch (error) {
              console.error(error.response.data.message);
              if ((error.response.data.message) === 'Current password is incorrect'){
                setErrorMessage("L'ancien mot de passe est incorrecte veuiller le verifier");
              }
            };
            break;
          case 'admin' :
            try {
              const response = await changerPassAdmin(decodedToken.sub,decodedToken.roles[0],oldPassword,newPassword);
              console.log(response);
              console.log('redirect');
            } catch (error) {
              console.error(error.response.data.message);
              if ((error.response.data.message) === 'Current password is incorrect'){
                setErrorMessage("L'ancien mot de passe est incorrecte veuiller le verifier");
              }
            };
            break;
          default: break;     
      }
    }
  };

  return (
    <div className='form-container'>
      <div className='error-placeholder'>
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </div>
      <div className='bottom-part'>
        <div className='left-block'>
            <img src='.\password-icon.png' alt='hi'/>
            <h1 class="title-changer">Changer Mot De Passe</h1>
        </div>
        <div className="vl"></div>
        <div className='right-block'>
          <form className='right-form' onSubmit={handleSubmit}>
              <div className='row'>
                <input
                  id="old-password"
                  type="password"
                  placeholder='Old password'
                  className='passInput'
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  required
                />
              </div>
              <div className='row'>
                <input
                  id="new-password"
                  type="password"
                  placeholder='New password'
                  className='passInput'
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </div>
              <div className='row' >
                <input
                  id="confirm-new-password"
                  type="password"
                  placeholder='Confirm password'
                  className='passInput'
                  value={confirmNewPassword}
                  onChange={(event) => setConfirmNewPassword(event.target.value)}
                  required
                />
              </div>
              <div className='button-grp'>
                <button type="submit" className='changer'>Changer</button>
              </div> 
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;