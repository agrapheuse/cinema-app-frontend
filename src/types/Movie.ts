import { Cinema } from './Cinema'
import { Showing } from './Showing'

export interface Movie {
  uuid: string
  title?: string
  director?: string
  category?: string
  description?: string
  imageUrl: string
  cinema: Cinema
  showings: Showing[]
}
