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
import { Box, Grommet } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { rgba } from 'polished';

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


const theme = {
  global: {
    colors: {
      'bg': '#ffffff',
      'primary': '#18a086',
      'secondary': '#0F6454',
    },
    edgeSize: {
      small: '14px',
    },
    elevation: {
      light: {
        minimal: '0 1px 2px 0 rgba(31,45,61,.15)',
      },
    },
  },
};

const Layout = ({ pageContext: {locale, localessPath},  children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <IntlProvider locale={locale}  messages={messages[locale]}>
      <LocaleProvider value={{currentLocale: locale}}>
        <PathProvider value={{localessPath}}>
          <Grommet theme={theme}>
              <Headroom
                upTolerance={10}
                downTolerance={10}
                style={{zIndex: '20'}}
              >
                <Header siteTitle={data.site.siteMetadata.title} />
              </Headroom>
              <Box align='center'>
              <Box
                width={'large'}
                pad={{
                  horizontal: 'large',
                  vertical: 'large',
                }}
                alignSelf='center'
              >
                <main>{children}</main>
                <footer>
                  © {new Date().getFullYear()}, Yay.tips
                </footer>
              </Box>
              </Box>
          </Grommet>
        </PathProvider>
      </LocaleProvider>
    </IntlProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
