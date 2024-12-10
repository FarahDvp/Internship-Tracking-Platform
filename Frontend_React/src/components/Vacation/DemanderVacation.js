import React ,{useState} from 'react'
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { styled  as style} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { demanderVacation, getToken } from '../../api/api';

function DemanderVacation() {
  const navigate = useNavigate();
  const[formError,setFormError] = useState('')
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
  });

  const [competences, setCompetences] = useState(['']);

  const handleAddField = () => {
    if (competences.includes("")){
      setFormError('veuillez remplir le champs de comptence vide')
    }else{
      setCompetences([...competences, '']);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const decodedToken = jwt_decode(getToken());
    try {
        const vacation = {
            EtudiantAluId: decodedToken.sub,
            titre: formData.titre,
            description: formData.description,
            competences : competences
        };
        const response = await demanderVacation(vacation);
        navigate("/")
  
    } catch (error) {
      console.log('Something Wrong Happened ... Try Again Later'); 
      setFormError('Something Wrong Happened ... Try Again Later')
    }
    };

  const handleChangeCompetence = (index, event) => {
    const newCompetences = [...competences];
    newCompetences[index] = event.target.value;
    setCompetences(newCompetences);
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container>
        <LeftSide>
        </LeftSide>
        <RightSide>
        {formError && <div className='error'>{formError}</div>}
            <PageTitle>
                Demander une vacation
            </PageTitle>
            <Form onSubmit={handleSubmit}>
                <InputArea>
                    <Input id="standard-basic" label="Titre" variant="standard" size='normal' name='titre'  required onChange={handleChange} fullWidth/>
                </InputArea>
                <InputArea>
                    <Input
                    id="standard-multiline-static"
                    label="Description"
                    name='description'
                    multiline
                    rows={7}
                    required
                    variant="standard"
                    onChange={handleChange}
                    fullWidth
                    />
                </InputArea>
                <Competences>
                    {competences.map((competence, index) => (
                      <InputArea>
                    <Input
                    key={index}
                    variant="standard"
                    label="Competence"
                    size='normal'
                    required
                    value={competence}
                    onChange={event => handleChangeCompetence(index, event)}
                    />
                    </InputArea>
                    ))}
                    <IconButton onClick={handleAddField}>
                      <AddCircleIcon style={{"color":"#4981f5"}}/>
                    </IconButton>
                    </Competences>
                <Button type='submit'>Deposer</Button>
            </Form>
        </RightSide>
    </Container>
  )
}

export default DemanderVacation;

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
const Competences=styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap:0.5em;
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
    border-radius: 12.92vw;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    background: #4981f5;
    font-family: "montserrat";
    font-weight: 800;
    font-size: 0.8rem;
    color: #ffffff;
    align-self: center;
    cursor: pointer;
`

const Input = style(TextField)({
    '& 	label':{
        fontSize:'1.3rem',
        fontFamily:'proximanovaregular',
    },
    '& 	.MuiInput-input':{
        color:"black",
        fontSize:'1.2rem',
    },
    '& label.Mui-focused': {
      color: '#4981f5',
      fontFamily:'proximanovaregular',
      fontSize:'1.5rem'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#4981f5',
    },
    
  });