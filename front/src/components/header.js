import PropTypes from "prop-types"
import React from "react"

import locales from '../constants/locales'
import Link from "../components/localizedLink"
import usePath from "../hooks/usePath"
import useLocale from "../hooks/useLocale"

const Header = ({ siteTitle }) => {
  const { localessPath } = usePath()
  const { currentLocale } = useLocale()

  return (
    <header
      style={{
        background: `white`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          padding: `.8rem 1.0875rem`,
          boxShadow: '0 1px 2px 0 rgba(31,45,61,.15)',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
          
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
