import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding-left: 9rem;
  padding-right: 9rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media screen and (max-width: 800px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  @media screen and (max-width: 650px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const ContentContainor = styled.div``;
const Heading = styled.div`
  font-style: normal;
  line-height: 52px;
  font-size: 38px;
  color: #192638;
  text-align: center;
`;
const Details = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  font-style: normal;
  font-weight: normal;
  font-size: 0.9rem;
  line-height: 1.4rem;
  color: #596579;
  background: #f5faff;
  border: 1px solid #d0d7e2;
  box-sizing: border-box;
`;

const whatisdoctorAtHomeService = () => {
  return (
    <Root>
      <ContentContainor>
        <Heading>What is Doctor at home service?</Heading>
        <Details>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          adipiscing nibh ac praesent dui. Sit viverra molestie posuere donec
          arcu. Massa neque nibh non a et sapien, et semper. Tincidunt purus
          tellus eu orci, pulvinar aliquet ultrices commodo. Etiam pellentesque
          lectus enim velit, tellus. Risus lectus interdum faucibus lectus.
          Gravida elementum vitae proin elit, lacus, libero. Tempor, ut non quis
          maecenas amet volutpat ut enim. Cursus cras nec amet, sed. Ut volutpat
          proin at amet. Suspendisse quam orci mi non ipsum, orci leo.
          Consectetur fringilla euismod vehicula habitant egestas sed turpis mi.
          Gravida potenti eu consequat ac. Tempus et diam, odio quis sit
          adipiscing maecenas eu varius. Odio elit velit, tempus odio facilisis
          mauris a tempus. Egestas quam viverra sit in odio. Arcu sapien, purus
          netus duis. At rutrum ultrices magna magna faucibus condimentum
          egestas.
        </Details>
      </ContentContainor>
    </Root>
  );
};

export default whatisdoctorAtHomeService;
