import type { DateTime } from 'next-auth/providers/kakao'

export interface Showing {
  id: string
  dateTime: DateTime
  infoLink: string
  ticketLink?: string
}
