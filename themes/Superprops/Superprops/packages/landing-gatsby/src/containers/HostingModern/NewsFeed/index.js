import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Icon } from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import Container from 'common/src/components/UI/Container';
import BlogPost from 'common/src/components/BlogPost';
import Link from 'common/src/components/Link';
import SectionHeading from '../SectionHeading';
import SectionWrapper, { ContentWrapper } from './newsFeed.style';

const NewsFeed = () => {
  const data = useStaticQuery(graphql`
    query {
      hostingModernJson {
        newsFeed {
          id
          title
          excerpt
          link
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
  return (
    <SectionWrapper id="news">
      <Container>
        <SectionHeading
          slogan="Latest newsfeed"
          title="Our recent blog post that updated"
        />
        <ContentWrapper>
          {data.hostingModernJson.newsFeed.map(news => (
            <BlogPost
              key={news.id}
              thumbUrl={news.image.childImageSharp.fluid.src}
              title={news.title}
              excerpt={news.excerpt}
              link={
                <Link href={news.link} className="excerptLink">
                  Learn More
                  <Icon icon={angleRight} />
                </Link>
              }
            />
          ))}
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default NewsFeed;
