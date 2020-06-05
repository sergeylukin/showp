/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { IntlProvider } from 'react-intl'
import Headroom from 'react-headroom'
import { FormattedMessage } from 'react-intl'
import { Text, Grid, Box } from 'theme-ui'

import Header from "./header"
import "./layout.css"

// Messages
import en_US from '../i18n/en-US.json'
import ru_RU from '../i18n/ru-RU.json'

const messages = { 'en-US': en_US, 'ru-RU': ru_RU }

export const LocaleContext = React.createContext()
const {
  Provider: LocaleProvider
} = LocaleContext

export const PathContext = React.createContext()
const {
  Provider: PathProvider
} = PathContext

const baseSpacing = 23

const Layout = ({ pageContext: {pageType, locale, localessPath},  children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  let twitterUrl = 'https://twitter.com/@yay_tips'
  let facebookUrl = 'https://fb.me/yaytips'
  if (locale === 'ru-RU') {
    twitterUrl = 'https://twitter.com/@yay_tips_ru'
    facebookUrl = 'https://fb.me/yaytipsRussian'
  }

  return (
    <IntlProvider locale={locale}  messages={messages[locale]}>
      <LocaleProvider value={{currentLocale: locale}}>
        <PathProvider value={{localessPath}}>
          <Grid>
            <Headroom
              upTolerance={10}
              downTolerance={10}
              style={{zIndex: '20', height: '60px'}}
            >
              <Header pageType={pageType} siteTitle={data.site.siteMetadata.title} />
            </Headroom>
            <Box align='center' pad={{
            }}>
            <Box
              width={'xlarge'}
              pad={{ horizontal: 'large' }}
            >
              <main>{children}</main>
              <Box as='footer' align='center'>
                <Box direction='row' align='center'>
                  <FormattedMessage id='findUsOnSocial' defaultMessage='Find us on' />:
                  <a href={facebookUrl} target="_blank" rel="noreferrer noopener">Facebook</a>
                  <a href={twitterUrl} target="_blank" rel="noreferrer noopener">Twitter</a>
                  <a href="https://yaytips.slack.com" target="_blank" rel="noreferrer">Slack</a>
                </Box>
                <Text>© {new Date().getFullYear()}, Yay.tips</Text>
              </Box>
            </Box>
          </Box>
        </Grid>
      </PathProvider>
      </LocaleProvider>
    </IntlProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
