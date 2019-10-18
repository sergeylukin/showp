import PropTypes from "prop-types"
import React from "react"
import { Box, Button, Heading } from 'grommet';

import locales from '../constants/locales'
import Link from "../components/localizedLink"
import usePath from "../hooks/usePath"
import useLocale from "../hooks/useLocale"

import logo from "../images/logo.png"

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='center'
    background='bg'
    pad={{ vertical: 'small' }}
    elevation='minimal'
    {...props}
  />
)

const Header = ({ siteTitle }) => {
  const { localessPath } = usePath()
  const { currentLocale } = useLocale()

  return (
    <header>
      <AppBar>
        <Box
          direction='row'
          width={'large'}
          align='center'
          pad={{
            horizontal: 'large',
          }}
        >
            <Box flex>
              <Link
                to="/"
                style={{
                  textDecoration: `none`,
                  display: 'flex',
                }}
              >
                <img src={logo} width={100} alt="Logo" />
              </Link>
            </Box>
            <Box direction='row'>
              {Object.keys(locales).map(locale => {
                const item = locales[locale]
                const isCurrentLocale = locale === currentLocale
                return (
                  <Link to={localessPath} locale={locale} style={{margin: '0 .5rem'}}>
                    <Button color="secondary" active={isCurrentLocale} label={item.title} />
                  </Link>
                  )
              })}
            </Box>
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
