import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Text from 'common/src/components/Text';
import Input from 'common/src/components/Input';
import Image from 'common/src/components/Image';
import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import Section, {
  ContentWrapper,
  BannerContent,
  Subscribe,
  SponsoredBy,
  ImageGroup,
} from './banner.style';

const Banner = () => {
  const images = useStaticQuery(graphql`
    query {
      paypal: file(relativePath: { eq: "image/agencyDigital/paypal.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      google: file(relativePath: { eq: "image/agencyDigital/google.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      dropbox: file(relativePath: { eq: "image/agencyDigital/dropbox.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Section id="home">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <Heading
              as="h1"
              content="A Creative way to grow your Exciting Business ideas"
            />
            <Text
              className="banner-caption"
              content="Get your blood tests delivered at let home collect sample from the victory of the managements that supplies best design system guidelines ever."
            />
            <Subscribe>
              <Input
                inputType="email"
                placeholder="Enter Email Address"
                iconPosition="left"
                aria-label="email"
              />
              <Button title="Subscribe" type="submit" />
            </Subscribe>
            <SponsoredBy>
              <Text className="sponsoredBy" content="Clients:" />
              <ImageGroup>
                <Image
                  src={images.paypal.childImageSharp.fluid.src}
                  alt="Paypal"
                />
                <Image
                  src={images.google.childImageSharp.fluid.src}
                  alt="Google"
                />
                <Image
                  src={images.dropbox.childImageSharp.fluid.src}
                  alt="Dropbox"
                />
              </ImageGroup>
            </SponsoredBy>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
