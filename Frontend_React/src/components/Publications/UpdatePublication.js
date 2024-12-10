import styled from "styled-components";
import React ,{useState,useEffect} from 'react';
import { modifierPublication, viewPublication } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Loading } from "../AlumniAccountState/AlumniAccountState";

function UpdatePublication() {
    const[formError,setFormError] = useState('')
    const [publication, setPublication] = useState([{
        contenu : '',
        type : ''
    }]);

    const navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
          const data = await viewPublication(id);
          let publiction = {
            idPublication:id,
            contenu : data.contenu,
            type : data.type
          }
          console.log(publiction);
          setPublication(publiction);
        };
        fetchData();
    },[id]);

    const handleInput = (e) => {
        setPublication({ ...publication, [e.target.name]: e.target.value })
    }

    const ModifierPublication = (publication,event) => {
        event.preventDefault();
        modifierPublication(publication).then((res) => {
            console.log(res);
            navigate("/mypublications");
        }).catch((er) => {
            console.log("ERROR CATCHED BY ME ", er);
            setFormError('Something Wrong Happened ... Try Again Later')
        });
    };

  return (
    <Container>
        <LeftSide>
        </LeftSide>
        <RightSide>
        {formError && <div className='error'>{formError}</div>}
            <PageTitle>
                Modifier votre publication
            </PageTitle>
            {publication ? (    
            <Form >
                    <InputArea>
                    <TextField
                    id="standard-multiline-static"
                    label="Contenu"
                    name='contenu'
                    multiline
                    rows={7}
                    value={publication.contenu || ''}
                    variant="outlined"
                    required
                    onChange={handleInput}
                    fullWidth
                    />
                </InputArea>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={publication.type || ''}
                    label="Type"
                    name="type"
                    required
                    onChange={handleInput}
                    >
                    <MenuItem value="conseil">Conseil</MenuItem>
                    <MenuItem value="opportunite">Opportunité</MenuItem>
                    <MenuItem value="offre-emploi">Offre d'emploi</MenuItem>
                    <MenuItem value="offre">Offre</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={(e) => ModifierPublication(publication, e)}>Modifier</Button>
            </Form>) : (
       <Loading>Loading...</Loading> 
        
      )}
        </RightSide>
    </Container>
  )
}

export default UpdatePublication;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%; 
    margin: 10% auto;
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 0;
    background-color:rgb(255, 255, 255) ;
    @media (max-width: 485px) {
      width: 90%; 
    }
`
const Form=styled.form`
    margin-top: 3em;
    display: flex;
    flex-direction: column;
`
const RightSide=styled.div`
    width: 100%;
    padding: 1.5em;
`

const InputArea=styled.div`
    margin-bottom: 1.3em;
`
const LeftSide=styled.div`
    background-color:#4981f5;
    width: 20%;
    min-height: 100%;
    border-radius: 10px 0px 0px 10px;
`

const PageTitle=styled.p`
    font-size: 1.5rem;
    font-family: 'proximanovasemi';
    word-spacing: -1px;
    color:#4981f5 ;
    @media (max-width: 400px) {
    font-size: 1.3rem;
    text-align: center;
    }
`
const Button = styled.button`
    width: 90%;
    height: 2.5em;
    border: none;
    margin-top: 1em;
    border-radius: 12.92vw;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    background: #4981f5;
    font-family: "montserrat";
    text-align: center;
    font-weight: 800;
    font-size: 0.8rem;
    color: #ffffff;
    align-self: center;
    cursor: pointer;
`