import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import { Paragraph, Box, Heading } from 'grommet'

import Layout from '../components/layout' 
import Link from "../components/localizedLink"
import SEO from "../components/seo"

const TipTemplate = (props) => {
  const { pageContext, data } = props
  const isTipHasImage = data.strapiTip.hasOwnProperty('image')

  return (
    <Layout pageContext={pageContext}>
      <Box pad={{ top: 'large' }}>
        <SEO title={`${data.strapiTip.title}`} lang={pageContext.locale} />
        <Heading mlevel={1} margin={{ vertical: 'none' }}>{data.strapiTip.title}</Heading>
        <Paragraph margin={{ top: 'medium' }}>by <Link to={`/authors/User_${data.strapiTip.author.id}`}>{data.strapiTip.author.username}</Link></Paragraph>
        {isTipHasImage && <Img fluid={data.strapiTip.image.childImageSharp.fluid}/>}
        <Box pad={{ top: 'large' }}>
          <ReactMarkdown
            source={data.strapiTip.content}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            className={ "tipContent" }
            escapeHtml={false}
          />
        </Box>
      </Box>
    </Layout>
  )
}

export default TipTemplate

export const query = graphql`
  query TipTemplate($id: String!) {
    strapiTip(id: {eq: $id}) {
      title
      content
      image {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      author {
        id
        username
      }
    }
  }
`
