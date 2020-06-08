export default {
  breakpoints: [
    '40em', '56em', '64em',
  ],
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#f6c338',
    secondary: '#000',
    muted: '#ccc',
    highlight: 'tomato',
    accent: 'turquoise',
    modes: {
      dark: {
        text: 'white',
        background: 'black',
        primary: 'white',
        secondary: 'white',
        muted: 'white',
        highlight: 'white',
        accent: '#ccc',
      }
    }
  },
  sizes: {
    container: 1278,
  },
  fonts: {
    body: ' system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Source Sans Pro", Georgia, serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      color: 'secondary',
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
  styles: {
    root: {
      // uses the theme values provided above
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    navlink: {
      color: 'primary',
      '&:hover': {
        color: 'text',
      }
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
  forms: {
    select: {
      mr: 1
    }
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text',
      }
    },
    secondary: {
      color: 'primary',
      padding: 0,
      bg: 'background',
      position: 'relative',
      '::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '3px',
        bottom: '-0px',
        backgroundColor: 'primary',
        left: 0
      }
    },
    tag: {
      color: 'primary',
      bg: 'background',
      '&:hover': {
        bg: 'primary',
        color: 'background',
        cursor: 'pointer'
      },
      display: 'block',
      px: 2,
      py: 1,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: '3px',
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted',
    },
  },
}
