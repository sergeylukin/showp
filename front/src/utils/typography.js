import Typography from "typography"
import theme from 'typography-theme-moraga'

theme.headerColor = `hsla(0,0%,0%,0.85)`
theme.headerWeight = 400
theme.bodyColor = `hsla(0,0%,0%,0.7)`
theme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    color: '#18a086',
  },
  'a:hover': {
    color: '#0F6454',
  }
})

const typography = new Typography(theme)
export default typography
