/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from 'react-intl'

function SEO({ description, type, path, image, lang, meta, title, titleMessageId, titleMessageValues, descriptionMessageId }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            siteUrl
          }
        }
      }
    `
  )

  let metaDescription = description
  // if (!metaDescription && site.siteMetadata.hasOwnProperty('description')) {
  //   metaDescription = site.siteMetadata.description
  // }

  const t = useIntl()

  if (titleMessageId) {
    title = t.formatMessage({id: titleMessageId, defaultMessage: title}, titleMessageValues)
  }
  if (descriptionMessageId) {
    metaDescription = t.formatMessage({id: descriptionMessageId}, metaDescription)
  }

  let twitterAuthor = '@yay_tips'
  if (lang === 'ru-RU') {
    twitterAuthor = '@yay_tips_ru'
  }

  const siteUrl = site.siteMetadata.siteUrl
  
  let metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:locale`,
      content: lang.replace('-', '_'),
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: type,
    },
    {
      property: `og:url`,
      content: siteUrl + path,
    },
    {
      name: `twitter:card`,
      content: image ? `summary_large_image` : `summary`,
    },
    {
      name: `twitter:creator`,
      content: twitterAuthor,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      property: `twitter:site`,
      content: twitterAuthor,
    },
  ].concat(meta)

  if (image) {
    metaTags.push({
      property: `og:image`,
      content: siteUrl + image,
    })
    metaTags.push({
      property: `twitter:image`,
      content: siteUrl + image,
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metaTags}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  titleMessageId: PropTypes.string,
  descriptionMessageId: PropTypes.string,
}

export default SEO
