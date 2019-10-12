import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const UserTemplate = ({ data }) => (
    <Layout>
      <h1>{data.strapiUser.username}</h1>
      <ul>
        {data.strapiUser.tips.map(tip => (
          <li key={tip.id}>
            <h2>
              <Link to={`/Tip_${tip.id}`}>{tip.title}</Link>
            </h2>
            <p>{tip.content}</p>
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
