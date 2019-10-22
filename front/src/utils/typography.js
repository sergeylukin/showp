import Typography from "typography"
import theme from 'typography-theme-moraga'

theme.headerColor = `hsla(0,0%,0%,0.85)`
theme.headerWeight = 400
theme.bodyColor = `hsla(0,0%,0%,0.7)`
theme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    color: '#0a735e',
  },
  'a:hover': {
    color: '#18a086',
  },
  'h1 a': {
    color: '#18a086',
  },
  'h1 :hover': {
    color: '#0a735e',
  },
})

const typography = new Typography(theme)
export default typography
