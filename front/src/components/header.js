/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from "prop-types"
import React from "react"
import { Box } from 'theme-ui';

import Link from "./localizedLink"
import LanguageSelector from "./languageSelector"

import logo from "../images/logo.png"

const Header = ({ pageType, siteTitle }) => (
  <header
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      variant: 'styles.header',
    }}>
    <Link to='/'
      sx={{
        variant: 'styles.navlink',
      }}>
      <img src={logo} sx={{mb: 0, mt: 2}} width={100} height={31} alt="Yay.tips logo" />
    </Link>
    <div sx={{ mx: 'auto' }} />
    <Box
      sx={{
        variant: 'styles.navlink',
        p: 2,
      }}>
      <LanguageSelector pageType={pageType} />
    </Box>
  </header>

)


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
