import PropTypes from "prop-types"
import React from "react"
import { Box } from 'grommet';

import locales from '../constants/locales'
import Link from "../components/localizedLink"
import usePath from "../hooks/usePath"
import useLocale from "../hooks/useLocale"

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='light-1'
    pad={{ vertical: 'small', horizontal: 'medium' }}
    elevation='medium'
    {...props}
  />
)

const Header = ({ siteTitle }) => {
  const { localessPath } = usePath()
  const { currentLocale } = useLocale()

  return (
    <header>
      <AppBar>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
            
            <Box direction='row'>
              {Object.keys(locales).map(locale => {
                const item = locales[locale]
                const isCurrentLocale = locale === currentLocale
                return (
                  <Link to={localessPath} locale={locale}>
                    {isCurrentLocale ? (
                    <big>{item.title}</big>
                    ) : (
                      <small>{item.title}</small>
                    )}
                  </Link>
                  )
              })}
            </Box>
      </AppBar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
