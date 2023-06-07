export default interface IFilm{
  _id: string,
  title: string,
  description: string,
  genres: string[],
  country: string,
  director: string,
  duration: number,
  releaseYear: number,
  rating: number,
  posterSrc: string,
  bgSrc: string,
  trailerID: string,
  isLiked?: boolean
}
export interface IPropsFilmValidation{
  title ?: string, 
  description ?:string, 
  genres ?: string | Array<string>, 
  country ?: string, 
  director ?: string, 
  releaseYear ?: number, 
  duration ?: number,
  rating ?: number, 
  posterSrc ?: string, 
  bgSrc ?: string, 
  trailerID ?: string
}
export interface IFilmValidationErrors{
  title ?: string, 
  description ?:string, 
  genres ?: string,
  country ?: string, 
  director ?: string, 
  releaseYear ?: string, 
  duration ?: string,
  rating ?: string, 
  posterSrc ?: string, 
  bgSrc ?: string, 
  trailerID ?: string
}