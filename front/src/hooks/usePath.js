import {useContext} from 'react'
import {PathContext} from '../components/layout'

export default function usePath() {
  return useContext(PathContext)
}
