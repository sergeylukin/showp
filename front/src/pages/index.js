import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import { FormattedMessage } from 'react-intl'

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Link from "../components/localizedLink"

import "../styles/global.css"

const IndexPage = ({ pageContext: { locale }, data }) => {
  return (
    <Layout locale={locale}>
      <SEO title="Home" />
      <h1><FormattedMessage id="hello" /></h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <ul>
        {data.allStrapiTip.edges.map(document => {
          const isTipHasImage = document.node.image
          return (
            <li key={document.id}>
              <h2>
                <Link to={`/${document.node.id}`}>
                  {document.node.title}
                </Link>
              </h2>
              {isTipHasImage && <Img fixed={document.node.image.childImageSharp.fixed} />}
              <ReactMarkdown
                source={document.node.content.substring(0, 500).concat("...")}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                className={ "indexTip" }
                escapeHtml={false}
              />
            </li>
          )
        })}
      </ul>

      <Link to="/page-2/">Go to page 2</Link>
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
