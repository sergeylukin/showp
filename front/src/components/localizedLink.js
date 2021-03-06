/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Link } from 'gatsby'

import locales from '../constants/locales'
import useLocale from '../hooks/useLocale'

export default ({ to, locale, ...props }) => {
  if (!locale) {
    locale = useLocale()['currentLocale']
  }
  const ISO_639_1 = locales[locale].path
  const path = locales[locale].default ? to : `/${ISO_639_1}${to}`

  return <Link {...props} to={path}
    activeClassName='active'
    sx={{
      color: 'inherit',
      '&.active': {
        color: 'primary',
      }
    }}
  />
}
