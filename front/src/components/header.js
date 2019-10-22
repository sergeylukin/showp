import PropTypes from "prop-types"
import React from "react"
import { Box, Menu, Text, ResponsiveContext } from 'grommet';
import { FormDown } from "grommet-icons";
import { navigate } from "gatsby"

import locales from '../constants/locales'
import Link from "../components/localizedLink"
import usePath from "../hooks/usePath"
import useLocale from "../hooks/useLocale"

import logo from "../images/logo.png"

const Header = ({ pageType, siteTitle }) => {
  const { localessPath } = usePath()
  const { currentLocale } = useLocale()
  let localeSelectorItems = []
  let localeSelectorTitle

  Object.keys(locales).forEach(locale => {
    const item = locales[locale]
    const isCurrentLocale = locale === currentLocale
    const ISO_639_1 = item.path
    let path = item.default ? localessPath : `/${ISO_639_1}${localessPath}`

    // If page is Tip - then just redirect to homepage of selected language
    // we currently don't support switching between translated posts
    if (pageType === 'tip') {
      path = `/${ISO_639_1}`
    }
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
  })

  return (
    <ResponsiveContext.Consumer>
    {size => (
      <header>
        <Box
          tag='header'
          direction='row'
          align='center'
          justify='center'
          background='white'
          pad={{
            vertical: size === 'small' ? 'medium' : 'xsmall'
          }}
          elevation='xsmall'
        >
          <Box
            direction='row'
            align='center'
            width='xlarge'
            pad={{
              left: 'large',
              right: 'medium'
            }}
          >
            <Box flex>
              <Link to="/" style={{ display: 'flex' }}>
                <img src={logo} width={100} height={31} alt="Logo" />
              </Link>
            </Box>
            <Box direction='row'>
              <Menu plain items={localeSelectorItems}>
                {({ drop, hover }) => {
                  return (
                    <Box direction="row" gap="xxsmall" pad='small'>
                      <Text>{localeSelectorTitle}</Text>
                      <FormDown />
                    </Box>
                  )
                }}
              </Menu>
            </Box>
          </Box>
        </Box>
      </header>
    )}
    </ResponsiveContext.Consumer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
