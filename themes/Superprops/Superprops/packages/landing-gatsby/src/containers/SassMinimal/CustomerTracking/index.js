import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Container from 'common/src/components/UI/Container';
import Image from 'common/src/components/Image';
import Box from 'common/src/components/Box';
import Heading from 'common/src/components/Heading';
import Text from 'common/src/components/Text';
import Fade from 'react-reveal/Fade';
import { Icon } from 'react-icons-kit';

import { CustomerTrackingWrapper } from './customerTracking.style';
import { angleRight } from 'react-icons-kit/fa/angleRight';

const CustomerTracking = () => {
  const Data = useStaticQuery(graphql`
    query {
      sassMinimalJson {
        CUSTOMER_TRACKING {
          tagline
          heading
          content
          btnLink
          btnLabel
          image {
            publicURL
          }
        }
      }
    }
  `);
  return (
    <CustomerTrackingWrapper>
      <Container>
        <Box className="row">
          <Box className="column">
            {Data.sassMinimalJson.CUSTOMER_TRACKING.map(
              (customerTrack, index) => (
                <Fade key={`customerTrack-image-${index}`} left>
                  <Image
                    src={customerTrack.image.publicURL}
                    alt="Track Chart"
                  />
                </Fade>
              )
            )}
          </Box>
          <Box className="column d-flex">
            <Box className="my-auto">
              {Data.sassMinimalJson.CUSTOMER_TRACKING.map(
                (customerTrack, index) => (
                  <Box className="content" key={`customerTrack-${index}`}>
                    <Heading as="h4" content={customerTrack.tagline} />
                    <Heading as="h3" content={customerTrack.heading} />
                    <Text as="p" content={customerTrack.content} />
                    <Link to={customerTrack.btnLink} className="exploreLink">
                      {customerTrack.btnLabel} <Icon icon={angleRight} />
                    </Link>
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </CustomerTrackingWrapper>
  );
};

export default CustomerTracking;
