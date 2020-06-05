/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { IntlProvider } from 'react-intl'
import Headroom from 'react-headroom'
import { FormattedMessage } from 'react-intl'
import { Text, Flex, Box } from 'theme-ui'

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

const Container = props =>
  <div
    {...props}
    sx={{
      maxWidth: 'container',
      mx: 'auto',
      px: 3,
    }}
  />

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
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}>
            <header
              sx={{
                width: '100%',
              }}>
              <Headroom
                upTolerance={10}
                downTolerance={10}
                style={{zIndex: '20', height: '60px'}}
              >
                <div sx={{
                  width: '100%',
                  background: 'white',
                  borderBottomWidth: '1px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'gray'
                }}>
                <Container>
                  <Header pageType={pageType} siteTitle={data.site.siteMetadata.title} />
                </Container>
              </div>
            </Headroom>
          </header>
          <main
            sx={{
              width: '100%',
              flex: '1 1 auto',
            }}>
            <Container>
              {children}
            </Container>
          </main>
          <footer sx={{
            width: '100%'
          }}>
          <Container>
            <Flex
              sx={{
                flexWrap: 'wrap',
                alignItems: 'center',
                py: 4,
                variant: 'styles.footer',
                justifyContent: 'space-between',
                maxWidth: 'container'
              }}>
              <Box>
                <FormattedMessage id='findUsOnSocial' defaultMessage='Find us on' />:
                <a href={facebookUrl} target="_blank" rel="noreferrer noopener" sx={{ variant: 'styles.navlink', p: 2 }}>Facebook</a>
                <a href={twitterUrl} target="_blank" rel="noreferrer noopener" sx={{ variant: 'styles.navlink', p: 2 }}>Twitter</a>
                <a href="https://yaytips.slack.com" target="_blank" rel="noreferrer" sx={{ variant: 'styles.navlink', p: 2 }}>Slack</a>
              </Box>
              <div sx={{ mx: 'auto' }} />
              <Box><Text>© {new Date().getFullYear()}, Yay.tips</Text></Box>
            </Flex>
          </Container>
        </footer>
      </div>
    </PathProvider>
  </LocaleProvider>
</IntlProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
