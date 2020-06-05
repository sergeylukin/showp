import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Box,
  Button,
  Text
} from 'theme-ui'
import { useStaticQuery, graphql } from "gatsby"

const Share = ({ path, title, locale }) => {

  // let facebookUsername = 'yaytips'
  // if (locale === 'ru-RU') facebookUsername = 'yaytipsRussian'

  let twitterUsername = 'yay_tips'
  if (locale === 'ru-RU') twitterUsername = 'yay_tips_ru'

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  const siteUrl = site.siteMetadata.siteUrl

  return (
    <Box>
      <Text><FormattedMessage id='Share' />:</Text>
      <Button onClick={() => {
          const url = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl + path}`;
          window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=200,width=600');
        }} />
      <Button onClick={() => {
        const url = `https://twitter.com/intent/tweet?url=${siteUrl +
                            path}&text=${title} by @${twitterUsername}`;
        window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=200,width=600');
      }} />
    </Box>
  )
}

export default Share;
