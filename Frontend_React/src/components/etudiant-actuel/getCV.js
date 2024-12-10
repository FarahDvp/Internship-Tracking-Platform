import React, { useState, useEffect } from "react";
import './updateCV.css'
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Button, Input, TextField } from "@mui/material";

const GetCV = () => {

    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

    useEffect(() => {
        localStorage.setItem('isDarkMode', isDarkMode);
      }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const containerStyle = {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        padding: '1rem',
        borderRadius: '4px',
    };

    const titleStyle = {
        color: isDarkMode ? 'orange' : '#333'
    };

    const titStyle = {
        color: isDarkMode ? '#87ceeb' : '#333'
    };

    const fieldStyle = {
        backgroundColor: isDarkMode ? 'white' : '#fff',
        color: isDarkMode ? '#333' : '#fff',
        borderRadius: '5px'
    };

    const buttonStyle = {
        backgroundColor: isDarkMode ? '#333' : 'green',
        color: isDarkMode ? '#fff' : '#fff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: "70px", float: "left", marginLeft: "-165px"
    };


    const [cvData, setCvData] = useState({
        idCv: '',
        bio: '',
        location: '',
        linkedIn: '',
        diplome: [],
        Competences: [],
        formation: [
            {
                title: '',
                emplacement: '',
                startDate: null,
                endDate: null,
                description: '',
            },
        ],
        experience: [
            {
                title: '',
                emplacement: '',
                startDate: null,
                endDate: null,
                description: ''
            },
        ]
    });


    const [idCv, setIdCv] = useState("")
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [linkedIn, setLinkedIn] = useState("")
    const [isDiplome, setDiplome] = React.useState(false);
    const [Competences, setCompetences] = useState("")
    const [errorMessage, setErrorMessage] = useState("");



    useEffect(() => {
        const dip_name = cvData.diplome;
        setDiplome(dip_name !== "" && dip_name !== "None");
    }, [cvData]);


    useEffect(() => {
        axios.get(`http://localhost:3000/Cv/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("this is the get method", res.data)
            setCvData(res.data)
        }).catch(err => console.log(err));
    }, [id, token])




    const handleInput = (e) => {
        setCvData({ ...cvData, [e.target.name]: e.target.value })
    }



    const handleExperienceChange = (e, index) => {
        const { name, value } = e.target;
        const newExperiences = [...cvData.experience];
        newExperiences[index] = { ...newExperiences[index], [name]: value };
        setCvData({ ...cvData, experience: newExperiences })
    };



    const handleEducationChange = (e, index) => {
        const { name, value } = e.target;
        const newEducations = [...cvData.formation];
        newEducations[index] = { ...newEducations[index], [name]: value };
        setCvData({ ...cvData, formation: newEducations })
    };




    return (

        <>
            <Button style={{ marginTop: "20px", float: "right", marginRight: "50px", backgroundColor: "orange", color: "black" }}
                variant="contained"
                onClick={() => navigate(`/updateCV/${id}`, { replace: true })}
            >
                Modifier le CV
            </Button>

            <Button style={{ marginTop: "20px", float: "left", marginLeft: "15px", backgroundColor: "grey", color: "white" }}
                variant="contained"
                onClick={() => navigate(`/profile/${id}`, { replace: true })}
            >
                Back to Profile
            </Button>
            <button data-test="dark-mode-toggle" style={buttonStyle} onClick={toggleDarkMode}>
                Basculer en {isDarkMode ? 'Mode clair' : 'Mode sombre'}
            </button>
            <div data-test="container" style={containerStyle} id="userForm" className="center">

                <h1 data-test="cv-title" style={titStyle}>CV</h1>
                <div className="container">
                    <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtk9O5xLQwmITiyXJWxuKxFVM4nHe9If8C59XIgtNIQwZkTcFPzXWszLVE7PE66qRXVLs&usqp=CAU" />
                    <form>
                        <hr></hr>
                        <div>
                            <label style={titleStyle}>
                                ID CV:</label>
                            <input
                                type="text"
                                required
                                value={cvData.idCv || ''} onChange={handleInput}
                            />

                        </div>

                        <div>
                            <label style={titleStyle}>
                                Bio:</label>
                            <input
                                type="text"
                                required
                                value={cvData.bio || ''}
                                onChange={handleInput}
                            />

                        </div>

                        <div>
                            <label style={titleStyle}>
                                Localisation:</label>
                            <input
                                type="text"
                                required
                                value={cvData.location || ''}
                                onChange={handleInput}
                            />

                        </div>

                        <div>
                            <label style={titleStyle}>
                                LinkedIn:</label>
                            <input
                                type="text"
                                required
                                value={cvData.linkedIn || ''}
                                onChange={handleInput}
                            />

                        </div>



                        <h2 style={titleStyle}>Diplôme</h2>
                        <TextField style={fieldStyle}
                            type="text"
                            required
                            disabled={isDiplome}
                            value={cvData.diplome || ''}
                            onChange={handleInput}
                        />





                        <h2 style={titleStyle}>Compétences</h2>

                        <TextField style={fieldStyle}
                            type="text"
                            required
                            value={cvData.Competences || ''}
                            onChange={handleInput}
                        />



                        <h2 style={titleStyle}>Formations</h2>
                        {cvData.formation?.map((f, index) => (
                            <div key={index}>
                                <h3>Formation {index + 1} </h3>

                                <div>
                                    <label>
                                        Titre:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={f.title}
                                        onChange={(e) => handleEducationChange(e, index)}
                                    />

                                </div>

                                <div>
                                    <label>
                                        Emplacement:</label>
                                    <input
                                        type="text"
                                        name="emplacement"
                                        required
                                        value={f.emplacement}
                                        onChange={(e) => handleEducationChange(e, index)}
                                    />

                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de début:</label>
                                    <input type="date" id="dateBirth" value={f.startDate}
                                        name='startDate' required onChange={(e) => handleEducationChange(e, index)} />
                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de fin:</label>
                                    <input type="date" id="dateBirth" value={f.endDate}
                                        name='endDate' required onChange={(e) => handleEducationChange(e, index)} />
                                </div>

                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                                <div>
                                    <label>
                                        Description:</label>
                                    <textarea
                                        name="description"
                                        required
                                        value={f.description}
                                        onChange={(e) => handleEducationChange(e, index)}
                                    />

                                </div>

                            </div>
                        ))}


                        <h2 style={titleStyle}>Experiences</h2>
                        {cvData.experience?.map((exper, index) => (
                            <div key={index}>
                                <h3 >Experience {index + 1} </h3>
                                <div>
                                    <label>
                                        Titre:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={exper.title}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />

                                </div>

                                <div>
                                    <label >
                                        Emplacement:</label>
                                    <input
                                        type="text"
                                        name="emplacement"
                                        required
                                        value={exper.emplacement}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />

                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de début:</label>
                                    <input type="date" id="dateBirth" value={exper.startDate}
                                        name='startDate' required onChange={(e) => handleExperienceChange(e, index)} />
                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de fin:</label>
                                    <input type="date" id="dateBirth" value={exper.endDate}

                                        name='endDate' required onChange={(e) => handleExperienceChange(e, index)} />
                                </div>

                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                                <div>
                                    <label>
                                        Description:</label>
                                    <textarea
                                        name="description"
                                        required
                                        value={exper.description}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />

                                </div>

                            </div>
                        ))}
                    </form>
                </div>
            </div>


        </>
    );
};
export default GetCV
const ProfileImage = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 2em;
  margin-top:-330px;
  `;
