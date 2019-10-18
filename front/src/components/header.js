import PropTypes from "prop-types"
import React from "react"
import { Box, Button, Menu, Text } from 'grommet';
import { FormDown } from "grommet-icons";
import { navigate } from "gatsby"

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
  let localeSelectorItems = []
  let localeSelectorTitle
  {Object.keys(locales).map(locale => {
    const item = locales[locale]
    const isCurrentLocale = locale === currentLocale
    const ISO_639_1 = item.path
    const path = item.default ? localessPath : `/${ISO_639_1}${localessPath}`
    if (isCurrentLocale) {
      localeSelectorTitle = item.title
    } else {
      localeSelectorItems.push({
        label: item.title,
        onClick: () => {
          navigate(path)
        }
      })
    }
  })}

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
            <Menu
              plain
              items={localeSelectorItems}
            >
              {({ drop, hover }) => {
                const color = hover && !drop ? "primary" : undefined;
                return (
                  <Box
                    direction="row"
                    gap="small"
                    pad="small"
                    background={hover && drop ? "secondary" : undefined}
                  >
                    <Text color={color}>{localeSelectorTitle}</Text>
                    <FormDown color={color} />
                  </Box>
                );
              }}
            </Menu>
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
