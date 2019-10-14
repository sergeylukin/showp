import PropTypes from "prop-types"
import React from "react"

import Link from "../components/localizedLink"
import usePath from "../hooks/usePath"

const Header = ({ siteTitle }) => {
  const { localessPath } = usePath()

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
          <Link to={localessPath} locale="en-US">English</Link>
          <Link to={localessPath} locale="ru-RU">Русский</Link>
        </h1>
      </div>
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
