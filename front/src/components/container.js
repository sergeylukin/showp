/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"

export default props =>
  <div
    {...props}
    sx={{
      maxWidth: 'container',
      mx: 'auto',
      px: 3,
    }}
  />
