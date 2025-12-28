import {
  Movie,
  MovieDetails,
  MoviesResponse,
  Credits,
  Cast,
  Genre,
} from "@/types/movie";

// Mock movie data for testing when TMDB API is unreachable
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    overview:
      "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    release_date: "1994-09-23",
    vote_average: 8.7,
    vote_count: 26000,
    genre_ids: [18, 80],
    popularity: 120.5,
    adult: false,
    original_language: "en",
    original_title: "The Shawshank Redemption",
    video: false,
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview:
      "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    release_date: "1972-03-14",
    vote_average: 8.7,
    vote_count: 19000,
    genre_ids: [18, 80],
    popularity: 115.3,
    adult: false,
    original_language: "en",
    original_title: "The Godfather",
    video: false,
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    overview:
      "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
    release_date: "2008-07-16",
    vote_average: 8.5,
    vote_count: 32000,
    genre_ids: [18, 28, 80, 53],
    popularity: 140.2,
    adult: false,
    original_language: "en",
    original_title: "The Dark Knight",
    video: false,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling crime caper.",
    release_date: "1994-09-10",
    vote_average: 8.5,
    vote_count: 27000,
    genre_ids: [80, 53],
    popularity: 110.8,
    adult: false,
    original_language: "en",
    original_title: "Pulp Fiction",
    video: false,
  },
  {
    id: 5,
    title: "Forrest Gump",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
    overview:
      "A man with a low IQ has accomplished great things in his life and been present during significant historic events.",
    release_date: "1994-06-23",
    vote_average: 8.5,
    vote_count: 26000,
    genre_ids: [35, 18, 10749],
    popularity: 95.4,
    adult: false,
    original_language: "en",
    original_title: "Forrest Gump",
    video: false,
  },
  {
    id: 6,
    title: "Inception",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",
    release_date: "2010-07-15",
    vote_average: 8.4,
    vote_count: 34000,
    genre_ids: [28, 878, 12],
    popularity: 130.7,
    adult: false,
    original_language: "en",
    original_title: "Inception",
    video: false,
  },
  {
    id: 7,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    overview:
      "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers.",
    release_date: "1999-03-30",
    vote_average: 8.2,
    vote_count: 24000,
    genre_ids: [28, 878],
    popularity: 105.9,
    adult: false,
    original_language: "en",
    original_title: "The Matrix",
    video: false,
  },
  {
    id: 8,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
    overview:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
    release_date: "2014-11-05",
    vote_average: 8.4,
    vote_count: 33000,
    genre_ids: [12, 18, 878],
    popularity: 125.3,
    adult: false,
    original_language: "en",
    original_title: "Interstellar",
    video: false,
  },
  {
    id: 9,
    title: "Parasite",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    overview:
      "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    vote_count: 17000,
    genre_ids: [35, 53, 18],
    popularity: 98.6,
    adult: false,
    original_language: "ko",
    original_title: "기생충",
    video: false,
  },
  {
    id: 10,
    title: "The Prestige",
    poster_path: "/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg",
    backdrop_path: "/h6O5OE3ueRVdCc7V1RglZOY4HbG.jpg",
    overview:
      "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy.",
    release_date: "2006-10-17",
    vote_average: 8.2,
    vote_count: 15000,
    genre_ids: [18, 9648, 878],
    popularity: 88.4,
    adult: false,
    original_language: "en",
    original_title: "The Prestige",
    video: false,
  },
];

const mockGenres: Genre[] = [
  { id: 18, name: "Drama" },
  { id: 80, name: "Crime" },
  { id: 28, name: "Action" },
  { id: 53, name: "Thriller" },
  { id: 35, name: "Comedy" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 12, name: "Adventure" },
  { id: 9648, name: "Mystery" },
];

const mockCast: Cast[] = [
  {
    id: 1,
    name: "Tom Hanks",
    character: "Main Character",
    profile_path: "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
    order: 0,
  },
  {
    id: 2,
    name: "Morgan Freeman",
    character: "Supporting Role",
    profile_path: "/jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
    order: 1,
  },
  {
    id: 3,
    name: "Christian Bale",
    character: "Hero",
    profile_path: "/3qx2QFUbG6t6IlzR0F9k3Z6Yhf7.jpg",
    order: 2,
  },
  {
    id: 4,
    name: "Leonardo DiCaprio",
    character: "Lead",
    profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    order: 3,
  },
];

export function getMockMovieDetails(id: number): MovieDetails {
  const movie = mockMovies.find((m) => m.id === id) || mockMovies[0];
  return {
    ...movie,
    genres: mockGenres.slice(0, 3),
    runtime: 142,
    budget: 25000000,
    revenue: 100000000,
    status: "Released",
    tagline: "An epic tale of redemption and hope",
    homepage: "",
    production_companies: [],
    production_countries: [],
    spoken_languages: [],
  };
}

export function getMockCredits(): Credits {
  return {
    cast: mockCast,
    crew: [],
  };
}

export function getMockMoviesResponse(movies: Movie[]): MoviesResponse {
  return {
    page: 1,
    results: movies,
    total_pages: 1,
    total_results: movies.length,
  };
}
