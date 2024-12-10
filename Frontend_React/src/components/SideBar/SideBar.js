import React,{useState, useEffect} from 'react'
import styled from "styled-components";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { SideBarData } from './SideBarData';
import {getToken , GetUser} from '../../api/api';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export default function SideBar() {

    const navigate = useNavigate();
    const toggle = ()=> setIsOpen(!isOpen);
    const [isOpen, setIsOpen] = useState(true);
    const decodedToken = jwt_decode(getToken());
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);


      
    // Change the isOpen state value on screen size change
    const handleResize = () => {
        if (window.innerWidth <= 1000) {
        setIsOpen(true);
        } else {
        setIsOpen(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            let data;
            const userTypeData = await GetUser(decodedToken.sub, decodedToken.roles[0]);
            if (decodedToken.roles[0] === "etudiant") {
                if (userTypeData.verified != false) {
                    if(userTypeData.verified === true){
                        data = SideBarData.filter((val) => val.roles.includes("alumni")); 
                    }else if (userTypeData.verified === null) {
                        data = SideBarData.filter((val) => val.roles.includes("alumni-unverified"));   
                    }
                } else {
                data = SideBarData.filter((val) => val.roles.includes("alumni-refused"));
                }
            } else {
                data = SideBarData.filter((val) => val.roles.includes(decodedToken.roles[0]));
            }

            if (decodedToken.roles[0] === "etudiant") {
                data = SideBarData.filter((val) => val.roles.includes("etudiant")); 
                }
          setUser(userTypeData);
          setData(data);
          console.log(data);
        };
      
        fetchData();
        window.addEventListener("resize", handleResize);
      
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
    return (
        
        <Container isOpen={isOpen} >
            <SwitcherTop isOpen={isOpen}>
                    <DensityMediumIcon style={{cursor : 'pointer'}} onClick={toggle}/>
            </SwitcherTop>
            <SideBarE isOpen={isOpen}>
                <Switcher isOpen={isOpen}>
                    <DensityMediumIcon style={{cursor : 'pointer'}} onClick={toggle}/>
                </Switcher>
                <TopPart>
                    <Logo src='..\logo.png' isOpen={isOpen}></Logo>
                    { decodedToken &&
                    <UserContainer isOpen={isOpen}>
                        <Profile src='..\profile.png' isOpen={isOpen}></Profile>
                        <Name isOpen={isOpen}>{user?.prenom} {user?.nom} </Name>
                    </UserContainer>
                    }
                </TopPart>
                <MiddlePart isOpen={isOpen}>
                    <LinkList>
                    { data && data.map((val) =>
                        {
                            if (decodedToken){
                                return (
                                    <ListItem isOpen={isOpen} onClick={() => navigate(`${val.link}`, { replace: true })}>
                                        <Icon>{val.icon}</Icon>
                                        <Text isOpen={isOpen}>{val.title}</Text>
                                    </ListItem>
                                )
                            }
                        }
                    )}
                       {} 
                    </LinkList>
                </MiddlePart>
                <BottomPart>
                    <Logout><PowerSettingsNewIcon/><ButtonText isOpen={isOpen}>Logout</ButtonText> </Logout>
                </BottomPart>
            </SideBarE>
        </Container>
    )
}
const Container = styled.div`   
    z-index:99;
    height: 100%;
    @media (max-width: 730px) {
       
        height:130%;
        position:absolute;
        background-color:${(props) => (props.isOpen === false ? "#00000023" : "#00000000")};
        transition: all ease-in .3s;
    }
    
`
const SideBarE = styled.div`
    display: flex;
    flex-direction: column;
    margin:0;
    width: ${(props) => (props.isOpen === false ? "18em" : "5em")};
    background-color:#145369 ;
    height: 100%;
    transition: all ease-in .3s;
    
    @media (max-width: 1000px) {
        position:${(props) => (props.isOpen === false ? "fixed" : "flex")}; 

    }
    @media (max-width: 730px) {
        display:${(props) => (props.isOpen === false ? "flex" : "none")};

        position:fixed ;
    }
`
const TopPart = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
`

const MiddlePart = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: ${(props) => (props.isOpen === false ? "3em" : "4em")};
`

const Logo = styled.img`
    display: ${(props) => (props.isOpen === false ? "block" : "none")};
    height:8.5em;
    width:8.5em;
    align-self:center;
`

const LinkList = styled.ul`
    width:100%;
    list-style-type:none;
    padding:0;

`

const Text = styled.div`
    font-weight: 300;
    flex:70%;
    font-size: 0.95rem;
    display:${(props) => (props.isOpen === false? "flex" : "none")};
    align-items: center;

`
const ListItem = styled.li`
    width:100%;
    font-family: 'montserrat';
    display:flex;
    color:white;
    height: 2.5em;
    margin-bottom: 1em;
    &:hover {
        background-color: white;
        color:#041014;
        border-radius: 50px 0px 0px 50px;
        font-weight: 800;
        cursor: pointer;
        -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
        -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
        box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
        width: ${(props) => (props.isOpen === false ? "91.5%" : "350%")};
        align-self:left;
        margin-left: 1.55em;
        ${Text} {
            display: flex;
            white-space:nowrap;
            
        }
    }
    transition: all ease-in-out .2s;
`



const Icon = styled.div`
    flex:45%;
    display: grid;
    place-items: center;

`
const Switcher = styled.div`
    text-align:${(props) => (props.isOpen === false ? "end" : "center")};
    color:white;
    font-size: 2rem;
    width:100%;
    @media (max-width: 1000px) {
        pointer-events:none;
        display:none;
    }
    @media (max-width: 730px) {
        pointer-events:all;
        display:block;
    }
`
const SwitcherTop = styled.div`
    color:#041014;
    font-size: 2rem;
    width:100%;
    display:none;
    @media (max-width: 730px) {
        display:block;
        position:absolute;
    }
`
const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap:0.5em;
    align-items:center;
    color:white;
    justify-content:center;
    width:100%;
    background-color:#0B4051 ;
    cursor: pointer;
    margin-top:${(props) => (props.isOpen === false ? "0" : "5em")};
    &:hover {
        background-color:white;  
        color:#041014;
    }
`
const Profile = styled.img`
    width:${(props) => (props.isOpen === false ? "2em" : "3.5em")};
    height:${(props) => (props.isOpen === false ? "2em" : "3.5em")};
    

`
const Name = styled.p`
    font-size:0.8rem;
    font-family: 'montserrat';
    
    display:${(props) => (props.isOpen === false ? "auto" : "none")};

`
const BottomPart = styled.div`
 height:100%;
 justify-content:center;
 display: flex;
`

const Logout = styled.button`
    align-self:flex-end;
    width:100%; 
    height:3em;
    border:none;
    background-color:#0B4051;
    font-size:0.8rem;
    font-family: 'montserrat';
    color:white;
    display:flex;
    align-items: center;
    justify-content:center;
    cursor: pointer;
`
const ButtonText = styled.p`
    
    font-size:0.8rem;
    font-family: 'montserrat';
    color:white;
    display: ${(props) => (props.isOpen === false ? "auto" : "none")};
`
