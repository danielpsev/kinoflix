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