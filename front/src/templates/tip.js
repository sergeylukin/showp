import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout' 
import Link from "../components/localizedLink"
import SEO from "../components/seo"

const TipTemplate = (props) => {
  const { pageContext, data } = props
  const isTipHasImage = data.strapiTip.hasOwnProperty('image')

  return (
    <Layout pageContext={pageContext} >
      <SEO title={`${data.strapiTip.title}`} />
      <h1>{data.strapiTip.title}</h1>
      <p>by <Link to={`/authors/User_${data.strapiTip.author.id}`}>{data.strapiTip.author.username}</Link></p>
      {isTipHasImage && <Img fluid={data.strapiTip.image.childImageSharp.fluid}/>}
      <ReactMarkdown
        source={data.strapiTip.content}
        transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
        className={ "tipContent" }
        escapeHtml={false}
      />
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
