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
import { Grommet } from 'grommet';

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
      'light-1': 'white',
      'light-2': '#f5f5f5',
      'text': {
        light: 'rgba(0, 0, 0, 0.87)',
      },
    },
    edgeSize: {
      small: '14px',
    },
    elevation: {
      light: {
        // medium: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        medium: '0 1px 2px 0 rgba(31,45,61,.15)',
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
              style={{zIndex: '20', height: '6.5em'}}
            >
              <Header siteTitle={data.site.siteMetadata.title} />
            </Headroom>
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 0,
              }}
            >
              <main>{children}</main>
              <footer>
                © {new Date().getFullYear()}, Yay.tips
              </footer>
            </div>
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
