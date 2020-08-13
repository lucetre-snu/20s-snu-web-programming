import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Box from 'common/src/components/Box';
import Heading from 'common/src/components/Heading';
import Text from 'common/src/components/Text';
import Button from 'common/src/components/Button';
import Image from 'common/src/components/Image';
import Container from 'common/src/components/UI/Container';
import Fade from 'react-reveal/Fade';

import { BannerWrapper } from './bannerSection.style';

const BannerSection = () => {
  const Data = useStaticQuery(graphql`
    query {
      sassMinimalJson {
        BANNER_DATA {
          title
          text
          image {
            publicURL
          }
          btnLabel
          btnLink
          offerText
        }
      }
    }
  `);
  return (
    <BannerWrapper id="banner_section">
      {Data.sassMinimalJson.BANNER_DATA.map((banner, index) => (
        <Container key={`banner-${index}`}>
          <Heading content={banner.title} as="h3" />
          <Text content={banner.text} />
          <Link to={banner.btnLink}>
            <Button title={banner.btnLabel} />
          </Link>
          <Text as="span" content={banner.offerText} />
          <Fade bottom>
            <Box className="imageWrapper">
              <Image src={banner.image.publicURL} alt="Banner Image" />
            </Box>
          </Fade>
        </Container>
      ))}
      ;
    </BannerWrapper>
  );
};

export default BannerSection;
