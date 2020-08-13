import React from 'react';
import Fade from 'react-reveal/Fade';
import { useStaticQuery, graphql } from 'gatsby';

import Container from 'common/src/components/UI/Container';
import Heading from 'common/src/components/Heading';
import Image from 'common/src/components/Image';
import Link from 'common/src/components/Link';
import Text from 'common/src/components/Text';

import FooterWrapper, {
  FooterInner,
  CopyrightInfo,
  FooterWidget,
  Nav,
} from './footer.style';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "image/hostingModern/logo.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      hostingModernJson {
        aboutUs {
          id
          title
        }
        ourInformation {
          id
          title
        }
        myAccount {
          id
          title
        }
        social {
          id
          title
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
  return (
    <FooterWrapper>
      <Container>
        <FooterInner>
          <CopyrightInfo>
            <Fade up delay={100}>
              <Image src={data.logo.childImageSharp.fluid.src} alt="Logo" />
              <p>
                <Link href="#">Terms of use</Link> |{' '}
                <Link href="#">Privacy</Link>
              </p>
              <Text
                className="copyright"
                content="Copyright by 2019 Redq, Inc"
              />
            </Fade>
          </CopyrightInfo>

          <FooterWidget>
            <Fade up delay={200}>
              <Heading as="h4" content="About Us" />
              <Nav>
                {data.hostingModernJson.aboutUs.map(item => (
                  <Link key={item.id} href="#">
                    {item.title}
                  </Link>
                ))}
              </Nav>
            </Fade>
          </FooterWidget>

          <FooterWidget>
            <Fade up delay={300}>
              <Heading as="h4" content="Our Information" />
              <Nav>
                {data.hostingModernJson.ourInformation.map(item => (
                  <Link key={item.id} href="#">
                    {item.title}
                  </Link>
                ))}
              </Nav>
            </Fade>
          </FooterWidget>

          <FooterWidget>
            <Fade up delay={400}>
              <Heading as="h4" content="My Account" />
              <Nav>
                {data.hostingModernJson.myAccount.map(item => (
                  <Link key={item.id} href="#">
                    {item.title}
                  </Link>
                ))}
              </Nav>
            </Fade>
          </FooterWidget>

          <FooterWidget>
            <Fade up delay={500}>
              <Heading as="h4" content="Connect" />
              <Nav>
                {data.hostingModernJson.social.map(item => (
                  <Link key={item.id} href={item.link}>
                    <Image
                      src={item.icon.childImageSharp.fluid.src}
                      alt={item.title}
                    />
                    {item.title}
                  </Link>
                ))}
              </Nav>
            </Fade>
          </FooterWidget>
        </FooterInner>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
