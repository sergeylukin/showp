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
      'bg': 'white',
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
  button: {
    border: {
      width: '1px',
      radius: '4px',
    },
    padding: {
      vertical: '8px',
      horizontal: '16px',
    },
    extend: props => `
     text-transform: uppercase;
     font-size: 0.875rem;
     font-weight: 500;
     line-height: normal;

    ${!props.primary && `
      border-color: ${rgba(normalizeColor(props.colorValue, props.theme), 0.5)};
      color: ${normalizeColor(props.colorValue, props.theme)};
      :hover {
         box-shadow: none;
         background-color: ${rgba(normalizeColor(props.colorValue, props.theme), 0.08)};
       }
     `}
   `,
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
