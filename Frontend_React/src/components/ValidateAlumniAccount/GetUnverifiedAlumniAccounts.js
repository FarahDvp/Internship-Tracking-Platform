import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUnverifiedAlumniAccounts } from "../../api/api";
import { useNavigate } from "react-router-dom";

function GetUnverifiedAlumniAccounts () {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          const dat = await getUnverifiedAlumniAccounts();
          setData(dat);
        };
        fetchData();

    },[]);

    const arr = data.map((i,index) => {
        const isEven = (index ) % 2 === 0;
        if (i.verified === null) {
            return (
                <>
                    <Row isEven={isEven}>
                        <Column>{i.EtudiantAluId}</Column>
                        <Column>{i.nom}</Column>
                        <Column>{i.prenom}</Column>
                        <Column>{i.dateNaissance}</Column>
                        <Column>{i.formation}</Column>
                        <Column>{i.poste}</Column>
                        <ColumnAction>
                        <Button onClick={() => navigate(`/valider/${i.EtudiantAluId}`, { replace: true })}>Details</Button>
                        </ColumnAction>
                    </Row>
            </>
            );
        }
    })

    const arrrefused = data.map((i,index) => {
        const isEven = (index ) % 2 === 0;
        if (i.verified === false) {
            return (
            <>
                <Row isEven={isEven}>
                    <Column>{i.EtudiantAluId}</Column>
                    <Column>{i.nom}</Column>
                    <Column>{i.prenom}</Column>
                    <Column>{i.dateNaissance}</Column>
                    <Column>{i.formation}</Column>
                    <Column>{i.poste}</Column>
                </Row>
            </>
            );
        }
    })

    const arrphone = data.map((i,index) => {
        if (i.verified === null) {
            return (
                <>
                <GridBox>
                    <Top>
                        <InfoRow>
                            <Title>ID</Title>
                            <Value>{i.EtudiantAluId}</Value>  
                        </InfoRow>
                        <InfoRow>
                            <Title>Nom</Title>
                            <Value>{i.nom}</Value>
                        </InfoRow>
                        <InfoRow>
                            <Title>Prenom</Title>
                            <Value>{i.prenom}</Value>
                        </InfoRow>
                        <InfoRow>
                            <Title>Date Naissance</Title>
                            <Value>{i.dateNaissance}</Value>
                        </InfoRow>
                        <InfoRow>
                            <Title>Formation</Title>
                            <Value>{i.formation}</Value>
                        </InfoRow>
                        <InfoRow>
                        <Title>Poste</Title>
                            <Value>{i.poste}</Value>
                        </InfoRow>
                    </Top>
                    <Bottom>
                        <Button  onClick={() => navigate(`/valider/${i.EtudiantAluId}`, { replace: true })} >Details</Button>
                    </Bottom>
                </GridBox>
            </>
            );
        }
    })

    const arrphonerefused = data.map((i,index) => {
        if (i.verified === false) {
            return (
                <>
                    <GridBox>
                        <Top>
                            <InfoRow>
                                <Title>ID</Title>
                                <Value>{i.EtudiantAluId}</Value>  
                            </InfoRow>
                            <InfoRow>
                                <Title>Nom</Title>
                                <Value>{i.nom}</Value>
                            </InfoRow>
                            <InfoRow>
                                <Title>Prenom</Title>
                                <Value>{i.prenom}</Value>
                            </InfoRow>
                            <InfoRow>
                                <Title>Date Naissance</Title>
                                <Value>{i.dateNaissance}</Value>
                            </InfoRow>
                            <InfoRow>
                                <Title>Formation</Title>
                                <Value>{i.formation}</Value>
                            </InfoRow>
                            <InfoRow>
                            <Title>Poste</Title>
                                <Value>{i.poste}</Value>
                            </InfoRow>
                        </Top>
                    </GridBox>
                </>
            );
        }
    })
    
    return (
        <>
            <Container>
                <PageTitle>Unverified Accounts List</PageTitle>
            <Table>
                <Head>
                    <HeadColumn>ID</HeadColumn>
                    <HeadColumn>Nom</HeadColumn>
                    <HeadColumn>Prenom</HeadColumn>
                    <HeadColumn>Date Naissance</HeadColumn>
                    <HeadColumn>Formation</HeadColumn>
                    <HeadColumn>Poste</HeadColumn>
                    <HeadColumnAction>Action</HeadColumnAction>
                </Head>
                    {arr}
                </Table>
                {arrphone}
            </Container>
            <Container>
                <PageTitle style={{color:"red"}}>Refused Accounts List</PageTitle>
            <Table>
                <Head>
                    <HeadColumn>ID</HeadColumn>
                    <HeadColumn>Nom</HeadColumn>
                    <HeadColumn>Prenom</HeadColumn>
                    <HeadColumn>Date Naissance</HeadColumn>
                    <HeadColumn>Formation</HeadColumn>
                    <HeadColumn>Poste</HeadColumn>
                </Head>
                    {arrrefused}
                </Table>
                {arrphonerefused}
            </Container>
        </> 
    )

    
}
export default  GetUnverifiedAlumniAccounts;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding:20px;
    width: 95%; 
    margin: 10% auto;
    border-width: 0.5px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    border-radius: 30px;
    background-color:rgb(255, 255, 255) ;
    padding-block: 20px;
`
const Table = styled.table`
    border-radius:50px;
    border-spacing:0px;
    table-layout: fixed;
    width: 100%;
    @media (max-width: 1100px) {
        font-size: 0.85rem;
    }
    @media (max-width: 580px) {
        display:none;
    }
`

const Row = styled.tr`
    text-align:start;
    background-color: ${(props) => (props.isEven ? "#f0f0f0" : "#ffffff")};
    height:4em;
    @media (max-width: 580px) {
        display:none;
    }
    
`
const PageTitle = styled.h1`
    font-family: 'montserrat';
    color: #4981f5;
    font-weight:800;
    font-size: 3rem;
    align-self: center;  
    @media (max-width: 750px) {
        font-size: 2rem;
    }
    @media (max-width: 550px) {
        font-size: 1.5rem;
    }
    @media (max-width: 400px) {
        font-size: 1rem;
        text-align:center;
    }
`

const Head=styled.thead`
    background-color: #f0f0f0;
    th:first-child {
        border-radius: 10px 0px 0px 0px;
    }
    th:last-child {
        border-radius: 0px 10px 0px 0px;
    }
    margin-bottom:2em;

`
const HeadColumn = styled.th`
    font-family: 'montserrat';
    color: black;
    font-weight:800;
    font-size: 1.3rem;
    text-align:start;
    @media (max-width: 1325px) {
        font-size: 1rem;
    }
    @media (max-width: 1100px) {
        font-size: 0.85rem;
    }
    @media (max-width: 910px) {
        font-size: 0.7rem;
    }
    
`

const HeadColumnAction = styled.th`
    font-family: 'montserrat';
    color: black;
    font-weight:800;
    font-size: 1.3rem;
    text-align:center;
    @media (max-width: 1325px) {
        font-size: 1rem;
    }
    @media (max-width: 1100px) {
        font-size: 0.85rem;
    }
    @media (max-width: 910px) {
        font-size: 0.7rem;
    }
`
const Column = styled.td`
    font-family: 'montserrat';
    font-weight: 300;
    color: black;
    font-size: 0.8rem;
`
const ColumnAction = styled.td`
    text-align:center;
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
    cursor: pointer;
    @media (max-width: 910px) {
        font-size: 0.6rem;
    }
    @media (max-width: 580px) {
        font-size: 0.8rem;
        width: 50%;
        height: 3em;
        align-self: center;
    }
`

const Top = styled.div`
    display: flex;
    gap:20%;
    flex-direction: column;
`
const Bottom = styled.div`
    width:100%;
    text-align:center;
    margin-top: -2em;
    margin-bottom: 0.5em;
`
const GridBox = styled.div`
    width: 100%;
    display: flex;
    gap:2em;
    flex-direction: column;
    background-color:#f0f0f0;
    border-radius:15px 15px 0px 0px ;
    border : 1px solid #C8CCCD;
    margin-bottom:2em;
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    @media (min-width: 580px) {
        display:none;
    }
    
`
const InfoRow = styled.div`
    display: flex;
    width:100%;
    gap:2em;
    padding:10px;
    flex-direction: row;
`
const Title = styled.p`
    font-size: 1rem;
    width:50%;
    font-family: "montserrat";
    font-weight: 1000;
    white-space:nowrap;
    @media (max-width: 350px) {
        font-size: 0.8rem;
    }
    @media (max-width: 300px) {
        font-size: 0.75rem;
    }
   

`
const Value = styled.p`
    font-size: 1rem;
    width:50%;
    font-family: "montserrat";
    white-space:nowrap;
    @media (max-width: 350px) {
        font-size: 0.8rem;
    }
    @media (max-width: 300px) {
        font-size: 0.7rem;
    }
`