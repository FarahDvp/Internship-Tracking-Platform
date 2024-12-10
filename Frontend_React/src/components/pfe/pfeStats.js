import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

export default function PfeStats() {
  const [data, setData] = useState([""]);
  const [dataBox, setDataBox] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const user = jwtDecode(token);
    axios.get("http://localhost:3000/pfe/stat").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
    const d = data.map((cell) => {
      return {
        name: cell[Object.keys(cell)[0]],
        pv: cell[Object.keys(cell)[1]],
      };
    });
    setDataBox(d);
    console.log(d);
  }, []);
  return (
    <Container>
      {/* <FormContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {data.map((cell) => (
                  <TableCell align="right">
                    {cell[Object.keys(cell)[0]]}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {data.map((cell) => (
                  <TableCell align="right">
                    {cell[Object.keys(cell)[1]]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </FormContainer> */}
      <Boxdiv>
        {dataBox.map((d, index) => {
          console.log(d);
          return (
            <>
              {/* <h5>{data[index][Object.keys(data[index])[0]]}</h5> */}

              <BarChart
                width={500}
                height={300}
                data={[d]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
              </BarChart>
            </>
          );
        })}
      </Boxdiv>
    </Container>
  );
}
const Container = styled.div`
    background-color: #dfdfdf;
    position: absolute;
    width: auto;
    height: auto;
    display: flex;
    jusitfy-content : center;
      @media (max-width: 768px) {
        width: auto;
  
      height auto;
    }
  `;
const FormContainer = styled.div`
    background-color: white;
    width : 90%;
    height : auto;
  
  
   margin-left:3em;
  
  
  border-radius: 30px;
  @media (max-width: 768px) {
    width : auto;
    height auto;
    margin : 0.2em;
  }
  
  `;
const Boxdiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
