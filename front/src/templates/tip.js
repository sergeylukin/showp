import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 

const TipTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiTip.title}</h1>
    <p>by <Link to={`/authors/User_${data.strapiTip.author.id}`}>{data.strapiTip.author.username}</Link></p>
    <Img fluid={data.strapiTip.image.childImageSharp.fluid}/>
    <p>{data.strapiTip.content}</p>
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
