import React from "react";
import styled from "styled-components";
import servicewall from "../../assets/servicewall.png";
const Root = styled.div`
  height: 70vh;
`;

const Service = () => {
  return (
    <Root
      style={{
        backgroundImage: `url(${servicewall})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      dlfkjahdlfjha
    </Root>
  );
};

export default Service;
