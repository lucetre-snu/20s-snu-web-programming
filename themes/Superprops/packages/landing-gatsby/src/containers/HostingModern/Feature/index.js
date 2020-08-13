import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Icon } from 'react-icons-kit';
import { thinRight } from 'react-icons-kit/entypo/thinRight';
import Container from 'common/src/components/UI/Container';
import Image from 'common/src/components/Image';
import Text from 'common/src/components/Text';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import SectionHeading from '../SectionHeading';
import FeatureWrapper, { FeatureContent, Content, Ipad } from './feature.style';
// import iPad from 'common/src/assets/image/hostingModern/ipad.png';

const Feature = () => {
  const data = useStaticQuery(graphql`
    query {
      iPad: file(relativePath: { eq: "image/hostingModern/ipad.png" }) {
        childImageSharp {
          fluid(maxWidth: 1018, maxHeight: 839) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      hostingModernJson {
        accordions {
          id
          expanded
          title
          desc
        }
      }
    }
  `);
  return (
    <FeatureWrapper id="features">
      <Ipad>
        <Image src={data.iPad.childImageSharp.fluid.src} alt="" />
      </Ipad>
      <Container>
        <FeatureContent>
          <SectionHeading
            mb="20px"
            slogan="Website content builder"
            title="Meet our premium features that will make you wow"
            textAlign="left"
          />
          <Content>
            <Text
              className="caption"
              content="Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents."
            />
            <Accordion>
              {data.hostingModernJson.accordions.map(item => {
                return (
                  <AccordionItem key={item.id}>
                    <AccordionButton>
                      {item.title} <Icon icon={thinRight} />
                    </AccordionButton>
                    <AccordionPanel>{item.desc}</AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Content>
        </FeatureContent>
      </Container>
    </FeatureWrapper>
  );
};

export default Feature;
