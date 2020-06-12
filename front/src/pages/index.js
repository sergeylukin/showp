/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import { graphql } from "gatsby"
import { Heading, Text, Flex, Box, Button, Input, Grid, Card } from 'theme-ui'

import Layout from "../components/layout"
import Container from "../components/container"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Hero from '../components/hero'
import Link from '../components/localizedLink'
import Newsletter from '../components/newsletter'

const IndexPage = ({ pageContext, data }) => {
  return (
    <Layout pageContext={pageContext}>
      <SEO
        titleMessageId={'indexPageTitle'}
        descriptionMessageId={'indexPageDescription'}
        lang={pageContext.locale}
        type='website'
        path={pageContext.pageUri}
      />
      <Grid
        sx={{
          rowGap: 4
        }}
      >
        <Container>
          <Hero />
        </Container>
        <Container>
          <Grid gap={4}
            columns={[ 2, 3, 4 ]}>
            {data.allStrapiTip.edges.map(doc => (
              <Card variant="primary" key={doc.id}>
                {doc.node.hasOwnProperty('image') && (
                  <React.Fragment>
                    { doc.node.image.childImageSharp ? (
                      <Link to={`/${doc.node.slug}`}>
                        <Img
                          alt={doc.node.title}
                          fluid={doc.node.image.childImageSharp.fluid}
                        />
                      </Link>
                    ) : (
                      <video src={doc.node.image.publicURL} width={370} height={370} controls />
                    )}
                  </React.Fragment>
                )}
                <Text mt={2} mx={2}>
                  {doc.node.title}
                </Text>
              </Card>
            ))}
          </Grid>
        </Container>
        <div
          sx={{
            backgroundColor: 'background',
            borderTopColor: 'primary',
            borderTopStyle: 'solid',
            borderTopWidth: 6,
            borderBottomColor: 'primary',
            borderBottomStyle: 'solid',
            borderBottomWidth: 6,
            py: 4,
            mt: 2,
            variant: 'layout.newsletter'
          }}>
          <Container>
            <Newsletter />
          </Container>
        </div>
      </Grid>
    </Layout>
  )
}

export default  IndexPage

export const pageQuery = graphql`
  query IndexQuery($locale: String) {
    allStrapiTip(filter:{
      isPublished: {eq: "Yes"},
      locale:{code: {eq: $locale}}
    }, sort: {order: DESC, fields: publish_datetime}) {
      edges {
        node {
          id
          title
          slug
          locale {
            code
          }
          image {
            childImageSharp {
              fluid(maxWidth: 370, maxHeight: 370, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
            publicURL
          }
          content
        }
      }
    }
  }
`
