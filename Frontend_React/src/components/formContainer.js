import React, { useEffect } from "react";
import styled from "styled-components";

export default function FormComponent(props) {
  console.log(props);
  return (
    <>
      <Container>
        <FormContainer>
          {props.display == false
            ? false
            : true && (
                <ImgContainer>
                  <img
                    src={
                      props.imgLink == null
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPER3IadGxhpKdcbTts8Oj4lgtZH0bxMjLMNhLvmaiWghkfS-2HQmFP2lRtFRLICRx4qk&usqp=CAU"
                        : props.imgLink
                    }
                    width="300px"
                    height="250px"
                  />
                </ImgContainer>
              )}
          <Form>{props.children}</Form>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #dfdfdf;
  position: absolute;
  width: 100%;
  height: ${(props) => (props.height == undefined ? "100%" : props.height)};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    
    height 190%;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  width : ${(props) => (props.display == false ? "100%" : "55%")};
  
  box-shadow:
  2.8px 2.8px 2.2px rgba(0, 0, 0, 0.008),
  6.7px 6.7px 5.3px rgba(0, 0, 0, 0.012),
  12.5px 12.5px 10px rgba(0, 0, 0, 0.015),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.018),
  41.8px 41.8px 33.4px rgba(0, 0, 0, 0.022),
  100px 100px 80px rgba(0, 0, 0, 0.03)
;
display: flex;
flex-direction : row;
justify-content: space-between;


border-radius: 30px;
@media (max-width: 768px) {
  flex-direction: column;
  width : 80%;
  height 100%;
}

`;
const Form = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-right: 2em;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 80%;
    margin: 2em;
  }
`;
const ImgContainer = styled.div`
  align-items: center;
  dispaly: flex;
  justify-content: center;
  margin-top: 22%;
  margin-left: 10%;
  @media (max-width: 768px) {
    display: none;
  }
`;
