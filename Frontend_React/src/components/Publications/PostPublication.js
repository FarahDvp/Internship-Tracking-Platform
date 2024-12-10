import styled from "styled-components";
import React ,{useState} from 'react';
import { TextField } from "@mui/material";
import jwt_decode from 'jwt-decode';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled  as style} from '@mui/material/styles';
import { getToken, publier } from "../../api/api";
import { useNavigate } from "react-router-dom";

function PostPublication() {
    const [type, setType] = useState('');
    const[formError,setFormError] = useState('')
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contenu: "",
        type:""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const decodedToken = jwt_decode(getToken());
        try {
            const publication = {
                EtudiantAluId: decodedToken.sub,
                contenu: formData.contenu,
                type: type
            };
            console.log(publication);
            const response = await publier(publication);
            console.log(response);
            navigate("/mypublications");
      
        } catch (error) {
          console.log('Something Wrong Happened ... Try Again Later'); 
          setFormError('Something Wrong Happened ... Try Again Later')
        }
    };



  return (
    <Container>
        <LeftSide>
        </LeftSide>
        <RightSide>
        {formError && <div className='error'>{formError}</div>}
            <PageTitle>
                Créer une publication
            </PageTitle>
            <Form onSubmit={handleSubmit}>
                    <InputArea>
                    <TextField
                    id="standard-multiline-static"
                    label="Contenu"
                    name='contenu'
                    multiline
                    rows={7}
                    variant="outlined"
                    required
                    onChange={handleChange}
                    fullWidth
                    />
                </InputArea>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    name="type"
                    required
                    onChange={handleChangeType}
                    >
                    <MenuItem value="conseil">Conseil</MenuItem>
                    <MenuItem value="opportunite">Opportunité</MenuItem>
                    <MenuItem value="offre-emploi">Offre d'emploi</MenuItem>
                    <MenuItem value="offre">Offre</MenuItem>
                    </Select>
                </FormControl>
                <Button type='submit'>Publier</Button>
            </Form>
        </RightSide>
    </Container>
  )
}

export default PostPublication;

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