import React from "react"
import { graphql } from "gatsby"
import { Box, Grid } from 'theme-ui'

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Hero from '../components/hero'
import { TipCard  } from '../components'

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
      <Grid>
        {data.allStrapiTip.edges.map(doc => {
          const isTipHasImage = doc.node.hasOwnProperty('image')
          let image = <div />
            if (isTipHasImage) {
              image = <Img
                alt={doc.node.title}
                fluid={doc.node.image.childImageSharp.fluid}
              />
            }
          return (
            <Box key={doc.id}>
              <TipCard
                tip={{
                  title: doc.node.title,
                  image,
                  slug: doc.node.slug,
                }}
              />
            </Box>
          )
        })}
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
