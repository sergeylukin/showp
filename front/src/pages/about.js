/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from "react"
import { Grid, Box } from 'theme-ui'

const AboutPage = () => (
  <Grid gap={3}
    sx={{
      gridTemplateColumns: 'repeat(12, 1fr)',
      maxWidth: 'container',
      margin: '0 auto'
    }}
  >
    <Box bg='blue' sx={{ gridColumn: ['span 12', null, 'span 4'] }}>Box</Box>
    <Grid bg='tomato'
      sx={{
        gridColumn: ['span 12', null, 'span 8'],
        gridTemplateColumns: 'repeat(12, 1fr)'
      }}>
      <Box bg='red' sx={{ gridColumn: 'span 6' }}>Hey</Box>
      <Box bg='black' sx={{ gridColumn: 'span 6' }}>Hey</Box>
    </Grid>
  </Grid>
)

export default AboutPage
