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
import Container from './container'

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
          <Flex
            sx={{
              flexDirection: 'column',
              minHeight: '100vh',
            }}>
            <header>
              <Headroom
                upTolerance={10}
                downTolerance={10}
                style={{ zIndex: '20', height: '60px' }}
              >
                <div sx={{
                  width: '100%',
                  backgroundColor: 'background',
                  borderBottomWidth: '1px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'muted',
                  variant: 'layout.header'
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
              variant: 'layout.main',
            }}>
            {children}
          </main>
          <footer>
            <Container>
              <Flex
                sx={{
                  flexWrap: 'wrap',
                  py: 4,
                  justifyContent: 'space-between',
                  maxWidth: 'container',
                  variant: 'styles.footer'
                }}>
                <Box>
                  <FormattedMessage id='findUsOnSocial' defaultMessage='Find us on' />:
                  <a href={facebookUrl} target="_blank" rel="noreferrer noopener" sx={{ variant: 'styles.navlink', p: 2 }}>Facebook</a>
                  <a href={twitterUrl} target="_blank" rel="noreferrer noopener" sx={{ variant: 'styles.navlink', p: 2 }}>Twitter</a>
                  <a href="https://yaytips.slack.com" target="_blank" rel="noreferrer" sx={{ variant: 'styles.navlink', p: 2 }}>Slack</a>
                </Box>
                <Box><Text>© {new Date().getFullYear()}, Yay.tips</Text></Box>
              </Flex>
            </Container>
          </footer>
        </Flex>
      </PathProvider>
    </LocaleProvider>
  </IntlProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
