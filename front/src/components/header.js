import PropTypes from "prop-types"
import React from "react"
import { Box } from 'theme-ui';

import Link from "./localizedLink"
import LanguageSelector from "./languageSelector"

import logo from "../images/logo.png"

const Header = ({ pageType, siteTitle }) => (
  <header>
    <Box>
      <Box>
        <Box>
          <Link to="/" style={{ display: 'flex' }}>
            <img src={logo} width={100} height={31} alt="Logo" />
          </Link>
        </Box>
        <Box>
          <LanguageSelector pageType={pageType} />
        </Box>
      </Box>
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
