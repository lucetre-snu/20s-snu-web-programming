import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'common/src/components/UI/ContainerTwo';
import Link from 'common/src/components/Link';
import BlogPost from 'common/src/components/BlogPost';
import SectionHeading from '../SectionHeading';
import Section, { ServiceWrapper } from './service.style';

const Service = () => {
  const data = useStaticQuery(graphql`
    query {
      agencyDigitalJson {
        services {
          id
          title
          desc
          link
          icon {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);
  const services = data.agencyDigitalJson.services;
  return (
    <Section id="service">
      <Container>
        <Zoom>
          <SectionHeading
            slogan="Ideal solutions for you"
            title="Go beyond ultimate features"
          />
        </Zoom>
        <ServiceWrapper>
          {services.map(service => (
            <Fade key={service.id} up delay={100 * service.id}>
              <BlogPost
                className="serviceItem"
                thumbUrl={service.icon.childImageSharp.fluid.src}
                title={service.title}
                excerpt={service.desc}
                link={
                  <Link href={service.link}>
                    Learn More <Icon icon={chevronRight} />
                  </Link>
                }
              />
            </Fade>
          ))}
        </ServiceWrapper>
      </Container>
    </Section>
  );
};

export default Service;
