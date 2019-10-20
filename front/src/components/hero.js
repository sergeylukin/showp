import React from 'react'
import styled from "styled-components"
import { Heading, Box, ResponsiveContext  } from 'grommet'
import { FormattedMessage } from 'react-intl';

import hero from '../images/hero.svg'
import Link from "../components/localizedLink"

const Stroke = styled.div`
  width: 10%;
  border-top: 3px solid #46bf9f;
`

export default (props) => {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box flex align='center' direction={size === 'small' ? 'column' : 'row'}>
          <Box flex fill width={{
            min: size === 'small' ? '100%' : '70%',
          }} pad='none'>
            <Heading
              level={1}
              size={size === 'small' ? 'small' : 'medium'}
              margin={{ top: 'none', bottom: 'small' }}
            >
              <FormattedMessage id="heroTitle"
                values={{ name: <Link to="/">Yay.tips</Link> }} />
            </Heading>
            <Stroke />
          </Box>
          <Box
            pad={{
              left: size === 'small' ? '' : 'medium',
              top: size === 'small' ? 'medium' : ''
            }}
            align='center'
            justify='center'
          >
            <img src={hero} alt="At Yay.tips we learn new skills every day." width={size === 'small' ? '50%' : '100%'} />
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  )
}
