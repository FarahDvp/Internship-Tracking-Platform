import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import './CreateEvent.css'


function UpdateEvent() {
    const token = localStorage.getItem('token');

    const { id } = useParams();
    const [event, setEvent] = useState([{
        idEvenement: '',
        nom: '',
        dateEvenement: '',
        description: ''
    }]);

    useEffect(() => {
        axios.get(`http://localhost:3000/evenement/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
            console.log("this is the get method", res.data)
            setEvent(res.data)
        }).catch(err => console.log(err));
    }, [id])
    const handleInput = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }
    const UpdateEvent = () => {
        axios.put('http://localhost:3000/evenement', event, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => console.log("this is the update method", res),

        ).catch(err => console.log(err));
    }


    return (
        <div className="contact1">
            <div className="container-contact1">
                <div className="contact1-pic js-tilt" data-tilt>
                    <img src="/event.png" alt="IMG" />
                </div>

                <div className="contact1-form">
                    <span className="contact1-form-title">
                        Update An event
                    </span>

                    <div className="wrap-input1" >
                        <input className="input1" type="text" placeholder="Event ID" value={event.idEvenement || ''} />
                    </div>

                    <div className="wrap-input1">
                        <input className="input1" type="text" placeholder="Event Name" value={event.nom || ''} onChange={handleInput} name="nom" />
                    </div>

                    <div className="wrap-input1">
                        <input className="input1" type="date" placeholder="Event Date" value={event.dateEvenement || ''} onChange={handleInput} name="dateEvenement" />
                    </div>

                    <div className="wrap-input1">
                        <textarea className="input1" placeholder="A little Description" value={event.description || ''} onChange={handleInput} name="description"></textarea>
                    </div>

                    <div className="container-contact1-form-btn" >
                        <button className="contact1-form-btn" onClick={UpdateEvent}>
                            <span>
                                Update Event
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEvent;