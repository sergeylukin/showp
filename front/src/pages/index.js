import React from "react"
import { graphql } from "gatsby"
import { Text, Box, Grid, Card } from 'theme-ui'

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Hero from '../components/hero'
import Link from '../components/localizedLink'

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
      <Hero />
      <Grid gap={3}
        columns={[ 2, 3, 4 ]}>
        {data.allStrapiTip.edges.map(doc => (
          <Card variant="primary" key={doc.id}>
            {doc.node.hasOwnProperty('image') && (
              <Link to={`/${doc.node.slug}`}>
                <Img
                  alt={doc.node.title}
                  fluid={doc.node.image.childImageSharp.fluid}
                />
              </Link>
            )}
            <Text mt={2} mx={2}>
              {doc.node.title}
            </Text>
          </Card>
        ))}
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
          }
          content
        }
      }
    }
  }
`
