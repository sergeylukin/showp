/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import styled from "styled-components"
import { Heading, Box } from 'theme-ui'
import { FormattedMessage } from 'react-intl';

import Link from "../components/localizedLink"

export default (props) => {
  return (
    <>
      <div sx={{
        display: 'grid',
        gridGap: 4,
        py: 5,
        px: 2
      }}>
        <Heading as='h1'
          sx={{
            fontSize: 6,
            textAlign: 'center',
          }}
        >
          <FormattedMessage id="heroTitle"
            values={{ name: <Link to="/">Yay.tips</Link> }} />
        </Heading>
      </div>
    </>
  )
}
