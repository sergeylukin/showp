import {useContext} from 'react'
import {LocaleContext} from '../components/layout'

export default function useLocale() {
  return useContext(LocaleContext)
}
