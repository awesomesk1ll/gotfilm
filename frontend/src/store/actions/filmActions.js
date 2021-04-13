export const LOAD_FILMS = '@@film/LOAD_FILMS';
export const LOAD_FILMS_STARTED = '@@film/LOAD_FILMS_STARTED';
export const LOAD_FILMS_FAILURE = '@@film/LOAD_FILMS_FAILURE';
export const ADD_TO_BLACKLIST_FILMS = '@@film/ADD_TO_BLACKLIST_FILMS';
export const ADD_TO_ALREADY_SEEN_FILMS = '@@film/ADD_TO_ALREADY_SEEN_FILMS';
export const GET_RANDOM_FILM = '@@film/GET_RANDOM_FILM';

export const loadFilms = (films) => ({
    type: LOAD_FILMS,
    films
});

export const loadFilmsStarted = () => ({
    type: LOAD_FILMS_STARTED
});

export const loadFilmsFailure = (error) => ({
    type: LOAD_FILMS_FAILURE,
    error
});

export const getRandomFilm = (film) => ({
    type: GET_RANDOM_FILM,
    film
});

export const addToBlacklistFilms = (filmId) => ({
    type: ADD_TO_BLACKLIST_FILMS,
    filmId
});

export const addToAlreadySeenFilms = (filmId) => ({
    type: ADD_TO_ALREADY_SEEN_FILMS,
    filmId
});