import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Link from "../components/localizedLink"

import "../styles/global.css"

const IndexPage = ({ pageContext, data }) => {
  return (
    <Layout pageContext={pageContext}>
      <SEO title="Home" />
      <ul>
        {data.allStrapiTip.edges.map(doc => {
          const isTipHasImage = doc.node.hasOwnProperty('image')
          return (
            <li key={doc.id}>
              <h2>
                <Link to={`/${doc.node.slug}`}>
                  {doc.node.title}
                </Link>
              </h2>
              {isTipHasImage && <Img fixed={doc.node.image.childImageSharp.fixed} />}
              <ReactMarkdown
                source={doc.node.content.substring(0, 500).concat("...")}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                className={ "indexTip" }
                escapeHtml={false}
              />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery($locale: String) {
    allStrapiTip(filter:{
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
