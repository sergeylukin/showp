import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import Link from "../components/localizedLink"
import SEO from "../components/seo"

const UserTemplate = ({ pageContext, data }) => {
  return (
    <Layout pageContext={pageContext}>
      <SEO
        title={`Author page of ${data.strapiUser.username}`}
        titleMessageId={'authorPageTitle'}
        titleMessageValues={{fullname: data.strapiUser.Fullname}}
        lang={pageContext.locale}
        path={pageContext.pageUri}
        type='object'
      />
      <h1>{data.strapiUser.Fullname}</h1>
      <ul>
        {data.allStrapiTip.edges.map(({node}) => (
          <li key={node.id}>
            <h2>
              <Link to={`/${node.slug}`}>{node.title}</Link>
            </h2>
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
      Fullname
    }
    allStrapiTip(filter: {
      isPublished: {eq: "Yes"},
      author: {id: {eq: $id_integer}},
      locale: {code: {eq: $locale}}
    }, sort: {order: DESC, fields: publish_datetime}) {
      edges {
        node {
          id
          title
          content
          slug
        }
      }
    }
  }
` 
