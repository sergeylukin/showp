import React from 'react'
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import { Text, Box, Heading } from 'theme-ui'
import { FormattedMessage } from 'react-intl'

import Layout from '../components/layout' 
import Link from "../components/localizedLink"
import SEO from "../components/seo"
import Share from "../components/share"

const TipTemplate = (props) => {
  const { pageContext, data } = props
  const isTipHasImage = data.strapiTip.hasOwnProperty('image')

  const uri = pageContext.pageUri

  return (
    <Layout pageContext={pageContext}>
      <Box>
        <SEO title={`${data.strapiTip.title}`}
          description={`${data.strapiTip.description}`}
          lang={pageContext.locale}
          path={uri}
          image={data.strapiTip.image.childImageSharp.fluid.src}
          type='article'
        />
        <Heading as='h1'>{data.strapiTip.title}</Heading>
        <Box>
          <Text>
            <FormattedMessage
              id='WrittenBy'
              values={{
                author: <Link to={`/${data.strapiTip.author.username}`}>@{data.strapiTip.author.username}</Link>
              }}
            />
          </Text>
          <Share title={data.strapiTip.title} path={uri} locale={pageContext.locale} />
        </Box>
        {isTipHasImage && <Img alt={data.strapiTip.title} fluid={data.strapiTip.image.childImageSharp.fluid}/>}
        <Box>
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
