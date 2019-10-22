import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import { Paragraph, Box, Heading } from 'grommet'
import { FormattedMessage } from 'react-intl'

import Layout from '../components/layout' 
import Link from "../components/localizedLink"
import SEO from "../components/seo"
import Share from "../components/share"

const TipTemplate = (props) => {
  const { pageContext, data, path } = props
  const isTipHasImage = data.strapiTip.hasOwnProperty('image')
  console.log(props)

  return (
    <Layout pageContext={pageContext}>
      <Box pad={{ top: 'large' }}>
        <SEO title={`${data.strapiTip.title}`} description={`${data.strapiTip.description}`} lang={pageContext.locale} />
        <Heading mlevel={1} margin={{ vertical: 'none' }}>{data.strapiTip.title}</Heading>
        <Box direction='row' justify='between' align='center'>
          <Paragraph margin={'auto 0'}>
            <FormattedMessage
              id='WrittenBy'
              values={{
                author: <Link to={`/@${data.strapiTip.author.username}`}>@{data.strapiTip.author.username}</Link>
              }}
            />
          </Paragraph>
          <Share title={data.strapiTip.title} path={path} locale={pageContext.locale} />
        </Box>
        {isTipHasImage && <Img alt={data.strapiTip.title} fluid={data.strapiTip.image.childImageSharp.fluid}/>}
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
      description
      content
      image {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid_withWebp
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
