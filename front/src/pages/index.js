import React from "react"
import { graphql } from "gatsby"
import { Box, Grid, ResponsiveContext } from 'grommet'

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Hero from '../components/hero'
import { TipCard  } from '../components'

const IndexPage = ({ pageContext, data }) => {
  return (
    <Layout pageContext={pageContext}>
      <ResponsiveContext.Consumer>
        {size => {
          const columns = {
            small: '',
            medium: ['1/2', '1/2'],
            large: ['1/2', '1/2'],
            // large: { count: 'fill', size: 'small' },
          }
          return (
            <Box pad={{ vertical: 'large' }}>
              <SEO
                titleMessageId={'indexPageTitle'}
                descriptionMessageId={'indexPageDescription'}
                lang={pageContext.locale}
              />
              <Hero />
              <Box pad={{ top: 'xlarge' }}>
                <Grid
                  align="start"
                  columns={columns[size]}
                  gap="large"
                >
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
                      <TipCard key={doc.id} tip={{
                          title: doc.node.title,
                          image,
                          slug: doc.node.slug,
                        }}
                      />
                    )
                  })}
                </Grid>
              </Box>
            </Box>
          )}}
      </ResponsiveContext.Consumer>
    </Layout>
  )
}

export default  IndexPage

export const pageQuery = graphql`
  query IndexQuery($locale: String) {
    allStrapiTip(sort: {order: DESC, fields: id}, filter:{
      locale:{code: {eq: $locale}}
    }) {
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
