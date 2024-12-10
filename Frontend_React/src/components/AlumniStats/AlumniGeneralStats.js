import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PersonIcon from '@mui/icons-material/Person';
import {Tooltip as Tip} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid,BarChart, Tooltip, Legend ,Funnel,FunnelChart,LabelList,Bar } from 'recharts';
import { getGeneralStats, getPaysStats,getSocieteStats,getChomageStats } from "../../api/api";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { CountryCodes } from "./CountryCodes";
import Flag from 'react-world-flags'



  

function AlumniGeneralStats() {
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(350);
    const [maxAlumni, setMaxAlumni] = useState(0);
    const [promotionData, setPromotionData] = useState(null);
    const [paysData, setPaysData] = useState(null);
    const [societeData, setSocieteData] = useState(null);
    const [dataC, setDataC] = useState(null);
    const [dataCP, setDataCP] = useState(null);
    const [dataP, setDataP] = useState(null);
    const [dataS, setDataS] = useState(null);
    const [chomage, setChomage] = useState('');

    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"




    const handleResize = () => {
        if (window.innerWidth <= 450 && window.innerWidth > 300) {
            setWidth(250);
            setHeight(200);
        } else if (window.innerWidth <= 300) {
            setWidth(150);
            setHeight(150);
        } else {
            setWidth(400);
            setHeight(350);
        }
    };
    const fetchPromotionData = async () => {
        const stats = await getGeneralStats();
        const data = stats.map((stat) => {
            const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            return {
              value: stat.etudiant,
              name: stat.DateObtention,
              fill: randomColor,
            };
        });
        const datac = stats.map((stat) => {
            return {
                promotion: stat.DateObtention,
                NombresAlumni: stat.etudiant,
            };
        });
        const datacp = stats.map((stat) => {
            return {
                promotion: stat.DateObtention,
                NombresAlumni: stat.etudiant,
            };
        });
        datacp.sort((a, b) => b.NombresAlumni - a.NombresAlumni);
        const topPromotions = datacp.slice(0, 5);
        setPromotionData(data);
        setDataC(datac);
        setDataCP(topPromotions);
    };
    const fetchPaysData = async () => {
        const stats = await getPaysStats();
        const data = stats.map((stat) => {
            if(CountryCodes){const countryCode = CountryCodes.find(country =>
                country.countryName.toLowerCase() === stat.country.toLowerCase()
              )?.countryCode;
              const countryName = CountryCodes.find(country =>
                country.countryName.toLowerCase() === stat.country.toLowerCase()
              )?.countryName;
              return {
                CountryName:countryName,
                CountryCode: countryCode,
                Alumni: stat.count,
            };}
          });
        data.sort((a, b) => b.Alumni - a.Alumni);
        const topCountries = data.slice(0, 5);
        setPaysData(data);
        setDataP(topCountries)
        const maxAlumni = data.reduce((max, d) => (d.alumni > max ? d.alumni : max), 0);
        setMaxAlumni(maxAlumni);
    };
    const fetchSocieteData = async () => {
        const stats = await getSocieteStats();
        const data = stats.map((stat) => {  
            return {
                Societe: stat.societe,
                Alumni: stat.count,
            };
        }
        );
        const dataS = stats.map((stat) => {
            return {
              value: stat.count,
              name: stat.societe,
            };
        });
        data.sort((a, b) => b.Alumni - a.Alumni);
        const topSociete = data.slice(0, 5);
        setSocieteData(topSociete);
        setDataS(dataS);
    };

    const fetchChomageData = async () => {
        const chomage = await getChomageStats();
        setChomage(chomage);
        console.log(chomage);
    };
    
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        fetchPromotionData();
        fetchPaysData();
        fetchSocieteData();
        fetchChomageData();
    },[]);

    


  return (
    <Container>
        <Section>
            <TopPart>
                <SectionTitle>
                    Promotions
                </SectionTitle>
                <SubSectionTitle>Top 5 Promotions</SubSectionTitle>
                <PromotionCounts>
                { dataCP && dataCP.map((val) =>
                    {
                        return (
                            <CountBox>
                                <Information>
                                    <Count>
                                    {val.NombresAlumni}
                                    </Count>
                                    <Title>
                                        Etudiants Alumni
                                    </Title>
                                    <Year>
                                        Promotion: {val.promotion}
                                    </Year>
                                </Information>
                                <Icon>
                                    <PersonIcon style={{'font-size':"5rem"}}/>
                                </Icon>
                            </CountBox>
                        )
                    }
                )}
                </PromotionCounts>
            </TopPart>
            <BottomPart>
            <SubSectionTitle>Charts</SubSectionTitle>
                <ChartSection >
                    <LineChart  width={width} height={height} data={dataC}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey= "promotion" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="NombresAlumni" stroke="#4981f5" />
                    </LineChart>
                    <FunnelChart  width={width} height={height} >
                        <Tooltip />
                        <Funnel
                            dataKey="value"
                            data={promotionData}
                            isAnimationActive
                        >
                            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                        </Funnel>
                    </FunnelChart>
                </ChartSection>
            </BottomPart>
        </Section>
        <Section>
            <TopPart>
                <SectionTitle>
                    Par Pays
                </SectionTitle>
                <SubSectionTitle>Top 5 Pays</SubSectionTitle>
                <PromotionCounts>
                { dataP && dataP.map((val) =>
                    {
                        return (
                            <CountBox>
                                <Information>
                                    <Count>
                                    {val.Alumni}
                                    </Count>
                                    <Title>
                                        Etudiants Alumni
                                    </Title>
                                    <Year>
                                        Pays: {val.CountryName}
                                        
                                        
                                    </Year>
                                    <Flag code={val.CountryCode} height="35" />
                                </Information>
                                <Icon>
                                    <WorkspacePremiumIcon style={{'font-size':"5rem"}}/>
                                </Icon>
                            </CountBox>
                        )
                    }
                )}
                </PromotionCounts>
            </TopPart>
            <BottomPart>
            <SubSectionTitle>Map Chart</SubSectionTitle>
                <ChartSection >
                    <ComposableMap style={{ width: "70%", height: "30%" }}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                            geographies.map((geo) => {
                                if (paysData){const countryData = paysData.find((d) => d.CountryCode === geo.properties["Alpha-2"]);
                                let fillColor = '#AFB3B6';

                                if (countryData) {
                                    fillColor = `rgba(0, 100, 200, ${countryData.alumni / maxAlumni})`;
                                }
                                return (
                                    <Tip title={`${geo.properties.name}: ${countryData ? countryData.Alumni : 0} alumnis`}>
                                    <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    style={{
                                        default: {
                                            fill: fillColor,
                                            },
                                            hover: {
                                                fill: `${fillColor}50`,
                                            },
                                            pressed: {
                                                fill: `${fillColor}B0`,
                                            },
                                    }}
                                    />
                                </Tip>);}
                                
                                    })
                                    }
                        </Geographies>
                    </ComposableMap>
                </ChartSection>
            </BottomPart>
        </Section>
        <Section>
            <TopPart>
                <SectionTitle>
                    Par Societe
                </SectionTitle>
                <SubSectionTitle>Top 5 Societes</SubSectionTitle>
                <PromotionCounts>
                { societeData && societeData.map((val) =>
                    {
                        return (
                            <CountBox>
                                <Information>
                                    <Count>
                                    {val.Alumni}
                                    </Count>
                                    <Title>
                                        Etudiants Alumni
                                    </Title>
                                    <Year>
                                        Societe: {val.Societe}
                                        
                                        
                                    </Year>
                                </Information>
                                <Icon>
                                    <WorkspacePremiumIcon style={{'font-size':"5rem"}}/>
                                </Icon>
                            </CountBox>
                        )
                    }
                )}
                </PromotionCounts>
            </TopPart>
            <BottomPart>
            <SubSectionTitle>Map Chart</SubSectionTitle>
                <ChartSection >
                <BarChart width={width+50} height={height} data={dataS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
                </ChartSection>
            </BottomPart>
        </Section>
        <Section>
            <TopPart>
                <SectionTitle>
                    Chomage
                </SectionTitle>
                <SubSectionTitle>Top 5 Societes</SubSectionTitle>
                <Chomage>La moyenne des jours au chomage est <Avg>{chomage}</Avg> jours</Chomage>
            </TopPart>
        </Section>
    </Container>
  )
}

export default AlumniGeneralStats;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%; 
  margin-top: 1% ;
  margin-inline: auto;
  border-width: 0.5px;
  height: fit-content;
  border-style: solid;
  border-color: rgb(230, 230, 230);
  -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  background-color:rgb(255, 255, 255) ;
  padding: 20px;
  gap:3em;
`
const CountBox = styled.div`
    display: flex;
    width : 23%;
    border-radius: 0.5em;
    background-color: #4981f5 ;
    @media (max-width: 550px) {
        width : 90%;
    }
 
`
const Information = styled.div`
    font-family: 'montserrat';
    width : 100%;
    color: white;
    padding-inline: 1em;
    padding-block: 1.8em;
    @media (max-width: 1310px) {
    text-align: center;
  }

`

const Section = styled.div`
    width : 100%;
    color: white;
    display: flex;
    background-color: #F0F0F0;
    flex-direction: column;
    border-radius: 12px;
    border-style: solid;
    border-width: 0.3px;
    border-color: rgb(230, 230, 230);
    -webkit-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    box-shadow: 10px 10px 5px -4px rgba(0, 0, 0, 0.16);
    gap:3em;
`
const Count = styled.h3`
    margin : 0;
    font-size: 2rem;
`
const Title = styled.p`
    font-size: 1rem;
`
const Year = styled.p`
    font-size: 0.9rem;
    font-weight: 1000;
    color: black;
    opacity: 0.5;
`
const Icon = styled.div`
    opacity: 0.2;
    color: black;
    display: flex;
    align-items: center;
    @media (max-width: 1310px) {
    display: none;
    }
`

const PromotionCounts=styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 2em;
    flex-wrap: wrap;
    padding: 1em;
    @media (max-width: 550px) {
    flex-direction: column;
    align-content: center;
    }
`

const ChartSection=styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 2em;
        align-items: center;
    }
`
const TopPart=styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
`
const SectionTitle=styled.h2`
    font-family: 'montserrat';
    color:white ;
    font-size: 2.5rem;
    background-color: #4981f5;
    border-radius: 0px 30px 30px 0px;
    width: 10em;
    padding-left:0.5em;
    margin-bottom: 1em;
    text-align: start;
    @media (max-width: 460px) {
        font-size: 2rem;
        width: 7em;
    }
    @media (max-width: 280px) {
        background-color:#F0F0F0;
        color:#4981f5;
        width:fit-content;
        font-size: 1.5rem;
    }
`

const BottomPart=styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
`

const SubSectionTitle = styled.h3`
    font-family: 'montserrat';
    color:black ;
    font-size: 2rem;
    border-bottom: 3px solid #4981f5 ;
    margin-left: 1em;
    width: 10em;
    @media (max-width: 460px) {
        font-size: 1.5rem;
        width: 7em;
    }
    @media (max-width: 280px) {
        font-size: 1rem;
    }
`

const Chomage = styled.p`
    align-self: center;
    font-family: 'montserrat';
    color:black ;
    text-align: center;
    font-size: 3rem;
    margin-left: 1em;
    height: 5em;
    @media (max-width: 460px) {
        font-size: 1rem;
    }
    
`
const Avg = styled.span`
    font-family: 'montserrat';
    border-radius: 5px;
    background-color:#4981f5 ;
    font-size: 3.5rem;
    color: white;
    @media (max-width: 460px) {
        font-size: 1.5rem;
    }
    
`