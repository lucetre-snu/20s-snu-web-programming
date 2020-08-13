import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Container from 'common/src/components/UI/ContainerTwo';
import Text from 'common/src/components/Text';
import Heading from 'common/src/components/Heading';
import BlogPost from 'common/src/components/BlogPost';
import Image from 'common/src/components/Image';

import SectionWrapper, { SectionHeading, NewsWrapper } from './news.style';

const News = () => {
  const Data = useStaticQuery(graphql`
    query {
      commentIcon: file(
        relativePath: { eq: "image/agencyModern/comment.png" }
      ) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      agencyModernJson {
        posts {
          id
          title
          comments_count
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
    <SectionWrapper id="news">
      <Container>
        <SectionHeading>
          <Heading as="h2" content="Popular blog post we update everyday" />
          <Text content="Focus only on the meaning, we take care of the design. As soon as the meeting end you can export in one click." />
        </SectionHeading>
        <NewsWrapper>
          {Data.agencyModernJson.posts.map(post => (
            <BlogPost
              key={`news-${post.id}`}
              thumbUrl={post.icon.childImageSharp.fluid.src}
              title={post.title}
              link={
                <React.Fragment>
                  <Image
                    src={Data.commentIcon.childImageSharp.fluid.src}
                    alt="comment"
                  />{' '}
                  {post.comments_count} comments
                </React.Fragment>
              }
            />
          ))}
        </NewsWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default News;
