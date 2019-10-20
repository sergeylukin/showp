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
import { Box, Grommet } from 'grommet'
import { generate as generateTheme } from 'grommet/themes'
import { deepMerge } from 'grommet/utils'

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

const baseSpacing = 24
const baseTheme = generateTheme(baseSpacing)
const theme = deepMerge(baseTheme, {
  global: {
    colors: {
      // brand: '#18a086',
      brand: '#67d99c',
      'accent-1': '#f55f44',
      'accent-2': '#814e4d',
      'accent-3': '#4d8af0',
      'accent-4': '#FFCA58',
    },
    edgeSize: {
      medium: baseTheme.global.edgeSize.small,
      large: baseTheme.global.edgeSize.medium,
      xlarge: baseTheme.global.edgeSize.large,
    },
    size: {
      medium: baseTheme.global.size.small,
      large: baseTheme.global.size.medium,
      xlarge: baseTheme.global.size.large,
    },
  },
})

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
          <Grommet theme={theme} full>
              <Headroom
                upTolerance={10}
                downTolerance={10}
                style={{zIndex: '20', height: '75px'}}
              >
                <Header siteTitle={data.site.siteMetadata.title} />
              </Headroom>
              <Box align='center' pad={{
              }}>
                <Box
                  width={'xlarge'}
                  pad={{
                    horizontal: 'large',
                    vertical: 'medium',
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
