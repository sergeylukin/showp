import PropTypes from "prop-types"
import React from "react"
import { Box, Select, Text } from 'theme-ui';
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
  let onLocaleChange = (evt) => {
    Object.keys(locales).forEach(locale => {
      const selectedLocaleTitle = evt.target.value
      const item = locales[locale]
      const isCurrentLocale = locale === currentLocale
      const ISO_639_1 = item.path
      let path = item.default ? localessPath : `/${ISO_639_1}${localessPath}`

      // If page is Tip - then just redirect to homepage of selected language
      // we currently don't support switching between translated posts
      if (pageType === 'tip') {
        path = item.default ? `/` : `/${ISO_639_1}`
      }

      if (selectedLocaleTitle === item.title) {
        navigate(path)
      }
    })

    return null;
  }

  Object.keys(locales).forEach(locale => {
    const item = locales[locale]
    const isCurrentLocale = locale === currentLocale

    if (isCurrentLocale) {
      localeSelectorTitle = item.title
    }

    localeSelectorItems.push(<option key={item.title}>{item.title}</option>)
  })

  return (
    <header>
      <Box>
        <Box>
          <Box>
            <Link to="/" style={{ display: 'flex' }}>
              <img src={logo} width={100} height={31} alt="Logo" />
            </Link>
          </Box>
          <Box>
            <Select
              onChange={onLocaleChange}
              defaultValue={localeSelectorTitle}>
              {localeSelectorItems}
            </Select>
          </Box>
        </Box>
      </Box>
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
