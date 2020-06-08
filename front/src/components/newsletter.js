/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Heading, Text, Flex, Box, Input, Button } from 'theme-ui'

import Guys from '../svg/guys'

export default () => (
  <Flex
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Flex
      sx={{
        flexDirection: 'column',
        width: '100%',
        maxWidth: ['100%', '70%', '30em']
      }}>
      <Heading as='h1'>Want more tips?</Heading>
      <Text sx={{ mt: 2, mb:3 }}>Get weekly curated tips right to your inbox.</Text>
      <Box
        as='form'
        onSubmit={e => e.preventDefault()}>
        <Flex sx={{
        }}>
        <Box pr={2} sx={{ flex: '1 1 auto' }}>
          <Input
            name='keyword'
            id='keyword'
            placeholder='email@example.com'
          />
        </Box>
        <Box pl={2}>
          <Button variant="primary">Yes, please!</Button>
        </Box>
      </Flex>
    </Box>
  </Flex>
  <Box sx={{ ml: 5, maxWidth: '11rem', display: ['none', null, 'block'] }}>
    <Guys />
  </Box>
</Flex>
)
