import React from "react"
import { FormattedMessage } from 'react-intl'

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ pageContext })=> (
  <Layout pageContext={pageContext}>
    <SEO
      titleMessageId="NotFoundPageTitle"
      descriptionMessageId="NotFoundPageDescription"
      lang={pageContext.locale}
    />
    <h1><FormattedMessage id='NotFoundPageTitle' /></h1>
    <p><FormattedMessage id='NotFoundPageDescription' /></p>
  </Layout>
)

export default NotFoundPage
