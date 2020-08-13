import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Container from 'common/src/components/UI/Container';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import Image from 'common/src/components/Image';

import SectionWrapper, { Content, ButtonWrap } from './callToAction.style';

const CallToAction = () => {
  const data = useStaticQuery(graphql`
    query {
      illustration3: file(
        relativePath: { eq: "image/hostingModern/illustration3.png" }
      ) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      illustration4: file(
        relativePath: { eq: "image/hostingModern/illustration4.png" }
      ) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <SectionWrapper>
      <Container>
        <Content>
          <Heading
            as="h3"
            content="Do you have any question? Feel free to contact us"
          />
          <ButtonWrap>
            <Image src={data.illustration3.childImageSharp.fluid.src} alt="" />
            <Button title="CONTACT US NOW" />
            <Image src={data.illustration4.childImageSharp.fluid.src} alt="" />
          </ButtonWrap>
        </Content>
      </Container>
    </SectionWrapper>
  );
};

export default CallToAction;
