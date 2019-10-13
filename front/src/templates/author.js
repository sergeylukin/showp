import React from 'react'
import { Link, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'

import "../styles/global.css"

const UserTemplate = ({ data }) => (
    <Layout>
      <h1>{data.strapiUser.username}</h1>
      <ul>
        {data.strapiUser.tips.map(tip => (
          <li key={tip.id}>
            <h2>
              <Link to={`/Tip_${tip.id}`}>{tip.title}</Link>
            </h2>
            <ReactMarkdown
              source={tip.content.substring(0, 500).concat("...")}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              className={ "indexTip" }
              escapeHtml={false}
            />
            <Link to={`/Tip_${tip.id}`}>{ "Read more" }</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
  
export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      tips {
        id
        title
        content
      }
    }
  }
` 
