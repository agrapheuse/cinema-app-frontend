export interface Movie {
  uuid: string
  title?: string
  director?: string
  category?: string
  description?: string
  cinemaId: string
  dateTime: Date
  imageUrl: string
  infoLink: string
  ticketLink?: string
}
