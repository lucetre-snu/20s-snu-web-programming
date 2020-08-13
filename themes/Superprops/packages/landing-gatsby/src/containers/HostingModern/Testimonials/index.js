import React from 'react';
import Swiper from 'react-id-swiper';
import { useStaticQuery, graphql } from 'gatsby';
import Container from 'common/src/components/UI/Container';
import Heading from 'common/src/components/Heading';
import Image from 'common/src/components/Image';
import SectionWrapper, {
  Content,
  Testimonial,
  Figure,
  Caption,
} from './testimonials.style';

import 'swiper/css/swiper.css';
const settings = {
  effect: 'fade',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: (index, className) => {
      return `<button class="${className} swiper-custom-pagination"></button>`;
    },
  },
};

const Testimonials = () => {
  const data = useStaticQuery(graphql`
    query {
      hostingModernJson {
        testimonials {
          id
          name
          designation
          quote
          image {
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
  const testimonials = data.hostingModernJson.testimonials;
  return (
    <SectionWrapper id="testimonials">
      <Container>
        <Content>
          <Swiper className="slider" {...settings}>
            {testimonials.map(testimonial => (
              <Testimonial key={testimonial.id}>
                <Figure>
                  <Image
                    src={testimonial.image.childImageSharp.fluid.src}
                    alt={testimonial.name}
                  />
                </Figure>
                <Caption>
                  <Heading content={testimonial.quote} />
                  <p>
                    <strong>{testimonial.name}</strong>,{' '}
                    {testimonial.designation}
                  </p>
                </Caption>
              </Testimonial>
            ))}
          </Swiper>
        </Content>
      </Container>
    </SectionWrapper>
  );
};

export default Testimonials;
