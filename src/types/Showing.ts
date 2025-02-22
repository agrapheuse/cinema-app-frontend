import { Movie } from "@/types/Movie";

export interface Showing {
  id: string;
  dateTime: Date;
  infoLink: string;
  ticketLink?: string;
}

export interface LikedShowing {
  id: string;
  dateTime: Date;
  infoLink: string;
  ticketLink?: string;
  movie: Movie;
}
