import React, { useState, useEffect } from "react";
import './updateCV.css'
import moment from "moment";
import { useNavigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Button, Input, TextField } from "@mui/material";

const UpdateCV = () => {

    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();

    const [openAlert, setAlert] = useState(false);
    const [validationError, setValidationError] = useState({ message: '' });

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

     // State to hold the error message
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        delete cvData._id;
        try {
            await axios.patch(`http://localhost:3000/Cv/update/${id}`, {...cvData}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("CV updated");
            navigate(`/getCV/${id}`);
        } catch (error) {
            if (error.response) {
                console.log("CV update failed:", error.response.data);
                setErrorMessage("Please enter valid data.");
            } else if (error.request) {
                console.log("CV update failed: No response received");
                setErrorMessage("Please enter valid data.");
            } else {
                console.log("CV update failed:", error.message);
                setErrorMessage("Please enter valid data.");
            }
        }
        setValidationError(null);
        setAlert(true);
    };

    const handleInput = (e) => {
        setCvData({ ...cvData, [e.target.name]: e.target.value })
    }



    const handleExperienceChange = (e, index) => {
        const { name, value } = e.target;
        const newExperiences = [...cvData.experience];
        newExperiences[index] = { ...newExperiences[index], [name]: value };
        calculateDifference(newExperiences[index].startDate, newExperiences[index].endDate)
        setCvData({ ...cvData, experience: newExperiences })
    };


    const handleAddExperience = () => {
        cvData.experience.push({ title: "", emplacement: "", startDate: "", endDate: "", description: "" })
        setCvData({ ...cvData })
    };


    const handleRemoveExperience = (index) => {
        const newExperiences = [...cvData.experience];
        newExperiences.splice(index, 1);
        setCvData({ ...cvData, experience: newExperiences })
    };




    const handleEducationChange = (e, index) => {
        const { name, value } = e.target;
        const newEducations = [...cvData.formation];
        newEducations[index] = { ...newEducations[index], [name]: value };
        calculateDifference(newEducations[index].startDate, newEducations[index].endDate)
        setCvData({ ...cvData, formation: newEducations })
    };


    const handleAddEducation = () => {
        cvData.formation.push({ title: "", emplacement: "", startDate: "", endDate: "", description: "" })
        setCvData({ ...cvData })
    };


    const handleRemoveFormations = (index) => {
        const newFormations = [...cvData.formation];
        newFormations.splice(index, 1);
        setCvData({ ...cvData, formation: newFormations })
    };


    const calculateDifference = (startDate, endDate) => {
        const start = moment(startDate);
        const end = moment(endDate);
        const difference = end.diff(start, "days");
        if (difference < 0) {
            setErrorMessage("La date de fin doit être postérieure à la date de début");
        } else {
            setErrorMessage("");
            console.log("La différence est de", difference, "jours");
        }
    };


    return (
        <>
            <div id="userForm" className="center">
                <h1>CV Form</h1>
                <div className="container">
                    <form onSubmit={handleSubmit} >

                        <div>
                            <label>
                                ID CV:</label>
                            <input
                            name="idCv"
                                type="text"
                                required
                                data-test="idCv"
                                value={cvData.idCv || ''} onChange={handleInput}
                            />

                        </div>

                        <div>
                            <label>
                                Bio:</label>
                            <input name="bio"
                                type="text"
                                required
                                data-test="bio"
                                value={cvData.bio || ''}
                                onChange={handleInput}
                            />

                        </div>

                        <div>
                            <label>
                                Localisation:</label>
                            <input name="location"
                                type="text"
                                required
                                data-test="location"
                                value={cvData.location || ''}
                                onChange={handleInput}
                            />

                        </div>

                        <div>
                            <label>
                                LinkedIn:</label>
                            <input name="linkedIn"
                                type="text"
                                required
                                data-test="linkedIn"
                                value={cvData.linkedIn || ''}
                                onChange={handleInput}
                            />

                        </div>



                        <h2>Diplôme</h2>
                        <TextField
                            type="text"
                            name="diplome"
                            required
                            data-test="diplome"
                            disabled={isDiplome}
                            value={cvData.diplome || ''}
                            onChange={handleInput}
                        />





                        <h2>Compétences</h2>

                        <TextField
                        name="Competences"
                            type="text"
                            required
                            data-test="Competences"
                            value={cvData.Competences || ''}
                            onChange={handleInput}
                        />



                        <h2>Formations</h2>
                        {cvData.formation?.map((f, index) => (
                            <div key={index}>
                                <h3>Formation {index + 1}   <button onClick={() => { handleRemoveFormations(index) }}>Supprimer</button> </h3>

                                <div>
                                    <label>
                                        Titre:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={f.title}
                                        data-test={`formation-title-${index}`}
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
                                        data-test={`formation-location-${index}`}
                                        onChange={(e) => handleEducationChange(e, index)}
                                    />

                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de début:</label>
                                    <input id={`formation-startDate-${index}`} data-test={`formation-startDate-${index}`} type="date" value={f.startDate}
                                        name='startDate' required onChange={(e) => handleEducationChange(e, index)} />
                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de fin:</label>
                                    <input  id={`formation-endDate-${index}`} type="date" data-test={`formation-endDate-${index}`} value={f.endDate}
                                        name='endDate' required onChange={(e) => handleEducationChange(e, index)} />
                                </div>

                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                                <div>
                                    <label>
                                        Description:</label>
                                    <textarea
                                        name="description"
                                        required
                                        data-test={`formation-description-${index}`}
                                        value={f.description}
                                        onChange={(e) => handleEducationChange(e, index)}
                                    />

                                </div>

                            </div>
                        ))}

                        <button type="button" onClick={handleAddEducation}>
                            Ajouter formation
                        </button>


                        <h2>Experiences</h2>
                        {cvData.experience?.map((exper, index) => (
                            <div key={index}>
                                <h3 >Experience {index + 1}  <button onClick={() => { handleRemoveExperience(index) }}>Supprimer</button> </h3>
                                <div>
                                    <label>
                                        Titre:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={exper.title}
                                        data-test={`experience-title-${index}`}
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
                                        data-test={`experience-location-${index}`}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />

                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de début:</label>
                                    <input data-test={`experience-startDate-${index}`} type="date" id={`experience-startDate-${index}`} value={exper.startDate}
                                        name='startDate' required onChange={(e) => handleExperienceChange(e, index)} />
                                </div>

                                <div>
                                    <label htmlFor="dateBirth">Date de fin:</label>
                                    <input data-test={`experience-endDate-${index}`} type="date" id={`experience-endDate-${index}`} value={exper.endDate}

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
                                        data-test={`experience-description-${index}`}
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />

                                </div>

                            </div>
                        ))}
                        <button type="button" onClick={handleAddExperience}>
                            Ajouter nouvelle experience
                        </button>


                        <div>
                            <button className="submit-button" type="submit">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Display the error message */}
            {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                )}

            <div className="alert-container">
                {openAlert && (
                    <Alert severity="success" onClose={() => setAlert(false)}>
                        CV modifié avec succès !
                    </Alert>
                )}
            </div>
        </>
    );
};
export default UpdateCV
