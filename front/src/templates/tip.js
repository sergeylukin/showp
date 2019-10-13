import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout' 

const TipTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiTip.title}</h1>
    <p>by <Link to={`/authors/User_${data.strapiTip.author.id}`}>{data.strapiTip.author.username}</Link></p>
    <Img fluid={data.strapiTip.image.childImageSharp.fluid}/>
    <ReactMarkdown
      source={data.strapiTip.content}
      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
      className={ "tipContent" }
      escapeHtml={false}
    />
  </Layout>
)

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
