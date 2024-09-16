export interface Movie {
    uuid: string;
    title?: string; 
    director?: string; 
    category?: string;
    description?: string; 
    cinema: string; 
    dateTime: Date;
    imageUrl: string; 
    infoLink: string;
    ticketLink?: string;
}