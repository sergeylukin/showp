import React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'

import "../styles/global.css"
import Link from "../components/localizedLink"

const UserTemplate = ({ pageContext: { locale }, data }) => {
  console.log(data)
  return (
    <Layout locale={locale}>
      <h1>{data.strapiUser.username}</h1>
      <ul>
        {data.allStrapiTip.edges.map(({node}) => (
          <li key={node.id}>
            <h2>
              <Link to={`/Tip_${node.id}`} locale={locale}>{node.title}</Link>
            </h2>
            <ReactMarkdown
              source={node.content.substring(0, 500).concat("...")}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              className={ "indexTip" }
              escapeHtml={false}
            />
            <Link to={`/Tip_${node.id}`}>{ "Read more" }</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
  
export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!, $id_integer: Int, $locale: String) {
    strapiUser(id: {eq: $id}) {
      id
      username
    }
    allStrapiTip(filter: {
      author: {id: {eq: $id_integer}},
      locale: {code: {eq: $locale}
    }}) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
` 
