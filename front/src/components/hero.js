import React from 'react'
import styled from "styled-components"
import { Heading, Box } from 'theme-ui'
import { FormattedMessage } from 'react-intl';

import hero from '../images/hero.svg'
import Link from "../components/localizedLink"

const Stroke = styled.div`
  width: 10%;
  border-top: 3px solid #46bf9f;
`

export default (props) => {
  return (
    <Box>
      <Box>
        <Heading as='h1'>
          <FormattedMessage id="heroTitle"
            values={{ name: <Link to="/">Yay.tips</Link> }} />
        </Heading>
        <Stroke />
      </Box>
      <Box>
        <img src={hero} alt="At Yay.tips we learn new skills every day." />
      </Box>
    </Box>
  )
}
