import React from 'react'
import { useColorMode, Button } from 'theme-ui'

export default props => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <header>
      <Button
        sx={{
          backgroundColor: 'secondary'
        }}
        onClick={e => {
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }}>
        {colorMode === 'default' ? 'Dark' : 'Light'}
      </Button>
    </header>
  )
}
