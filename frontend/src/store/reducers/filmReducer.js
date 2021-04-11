import update from 'react-addons-update';
import { ADD_TO_ALREADY_SEEN_FILMS, ADD_TO_BLACKLIST_FILMS, LOAD_FILMS, GET_RANDOM_FILM, LOAD_FILMS_STARTED, LOAD_FILMS_FAILURE } from '../actions/filmActions';

const initStore = {
    films: [],
    film: null,
    blacklistFilms: [],
    alreadySeenFilms: [],
    isLoading: false,
    error: null
}

export default function filmReducer(store = initStore, action) {
    switch (action.type) {
        case LOAD_FILMS_STARTED: {
            return update(store, {
                isLoading: {
                    $set: true
                }
            });
        }
        case LOAD_FILMS_FAILURE: {
            return update(store, {
                isLoading: {
                    $set: false
                },
                error: {
                    $set: action.error
                }
            });
        }
        case LOAD_FILMS: {
            return update(store, {
                films: {
                    $set: [...action.films]
                },
                error: {
                    $set: null
                }
            });
        }
        case GET_RANDOM_FILM: {
            return update(store, {
                film: {
                    $set: { ...store.films[action.film] }
                },
                isLoading: {
                    $set: false
                },
                error: {
                    $set: null
                }
            });
        }
        case ADD_TO_BLACKLIST_FILMS: {
            return update(store, {
                blacklistFilms: {
                    $merge: [...store.blacklistFilms, action.film]
                }
            });
        }
        case ADD_TO_ALREADY_SEEN_FILMS: {
            return update(store, {
                alreadySeenFilms: {
                    $merge: [...store.alreadySeenFilms, action.film]
                }
            });
        }
        default:
            return store;
    }
}
