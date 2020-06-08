/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Heading, Flex, Grid, Box, Input, Button } from 'theme-ui'
import { FormattedMessage } from 'react-intl';

import Link from "../components/localizedLink"

export default (props) => {
  return (
    <div>
      <div sx={{
        display: 'grid',
        gridGap: 4,
        pt: 4,
        px: 2
      }}>
      <Heading as='h1'
        sx={{
          fontSize: [5, null, 6],
          textAlign: 'center',
        }}
      >
        <FormattedMessage id="heroTitle"
          values={{ name: <Link to="/">Yay.tips</Link> }} />
      </Heading>
      <Box
        as='form'
        onSubmit={e => e.preventDefault()}>
        <Flex sx={{
          maxWidth: ['100%', '20rem', '30rem'],
          alignItems: 'center',
          margin: '0 auto',
        }}>
        <Box pr={2} sx={{ flex: '1 1 auto' }}>
          <Input
            name='keyword'
            id='keyword'
          />
        </Box>
        <Box pl={2}>
          <Button variant="primary">Search</Button>
        </Box>
      </Flex>
    </Box>
    <div sx={{
      display: 'inline-block',
      maxWidth: 'container',
      textAlign: 'center'
    }}>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Curated</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Cleaning</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Cooking</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Social Life</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Health</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Job</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Bad habbits</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">Sport</Button></Box>
      <Box p={2} sx={{textAlign: 'center', display: 'inline-block'}}><Button variant="tag">More...</Button></Box>
    </div>
  </div>
</div>
  )
}
