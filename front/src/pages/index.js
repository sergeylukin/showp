import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiTip.edges.map(document => (
        <li key={document.id}>
          <h2>
            <Link to={`/${document.node.id}`}>
              {document.node.title}
            </Link>
          </h2>
          <Img fixed={document.node.image.childImageSharp.fixed} />
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiTip {
      edges {
        node {
          id
          title
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          content
        }
      }
    }
  }
`
