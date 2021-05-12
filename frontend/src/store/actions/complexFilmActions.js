import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure } from './filmActions';
import { selectFilm, addToHistory, addToBlacklist, addToAlreadySeen, addToFavorites, removeFromAlreadySeen, removeFromBlacklist, removeFromFavorites, removeFromHistory, updateFilteredFilms } from './filmActions';
// import { loadFilms, loadFilmsStarted, loadFilmsFailure, getRandomFilm } from './filmActions';
// import { selectFilm, addToHistory, addToBlacklist, addToAlreadySeen } from './filmActions';

/**
 * Сохраняет список в local storage
 *
 * @param {string} listName - имя списка для сохранения.
 */
export const saveList = (listName) => {
    return (dispatch, getState) => {
        const { [listName]: list } = getState().filmReducer;
        localStorage.setItem(listName, JSON.stringify(list));
    }
};

/**
 * Добавляет фильм в список, затем сохраняет список в local storage
 *
 * @param {number} filmId - id добавляемого фильма.
 * @param {string} [listName="history"] - имя списка для добавляемого фильма и сохранения.
 */
export const addToListAndSave = (filmId, listName = "history") => {
    return (dispatch, getState) => {
        switch (listName) {
            case "blacklist":
                dispatch(addToBlacklist(filmId));
                break;
            case "alreadySeen":
                dispatch(addToAlreadySeen(filmId));
                break;
            case "favorites":
                dispatch(addToFavorites(filmId));
                break;
            default:
                dispatch(addToHistory(filmId));
        }
        dispatch(saveList(listName));
    }
};

/**
 * Удаляет фильм из списка, затем сохраняет список в local storage
 *
 * @param {number} filmId - id удаляемого фильма.
 * @param {string} [listName="history"] - имя списка для удаляемого фильма и сохранения.
 */
export const removeFromListAndSave = (filmId, listName = "history") => {
    return (dispatch, getState) => {
        switch (listName) {
            case "blacklist":
                dispatch(removeFromBlacklist(filmId));
                break;
            case "alreadySeen":
                dispatch(removeFromAlreadySeen(filmId));
                break;
            case "favorites":
                dispatch(removeFromFavorites(filmId));
                break;
            default:
                dispatch(removeFromHistory(filmId));
        }
        dispatch(saveList(listName));
    }
};

/**
 *
 * @param {number} filmId - id фильма.
 * @param {*} listName - имя списка для добавления/удаления фильма. По умолчанию - избранные фильмы.
 */
export const favoriteIconPush = (filmId, listName = "favorites") => {
    return (dispatch, getState) => {
        const { favorites } = getState().filmReducer;
        let checkList = favorites.data.find(item => item.id === filmId);
        if (!checkList) {
            dispatch(addToListAndSave(filmId, listName));
        } else {
            dispatch(removeFromListAndSave(filmId, listName));
        }
    }
};

/**
 * Вычисляет случайный фильм отсутствующий в списках blacklist и alreadySeen, его добавляет в историю
 */
export const changeFilm = () => {
    return (dispatch, getState) => {
        const { films, idFilmsFiltered, blacklist, alreadySeen } = getState().filmReducer;
        let filmID, randomIndex;
        do {
            randomIndex = ~~(Math.random() * idFilmsFiltered.length);
            filmID = idFilmsFiltered[randomIndex];
        } while (
            blacklist.list[filmID] || alreadySeen.list[filmID]
        )

        dispatch(selectFilm(filmID));
        dispatch(addToListAndSave(filmID));
    }
};
/**
 * Обновляет отфильтрованный список фильмов в соответствии с настройками
 */
export const filtreFilm = () => {
    return (dispatch, getState) => {
        const { films, countryFilter, genreFilter, yearFilter, ratingFilter } = getState().filmReducer;

        let filteredFilms = films.filter(film => film.countries.filter(el => countryFilter.includes(el)).length > 0 );
        filteredFilms = filteredFilms.filter(film => film.genres.filter(el => genreFilter.includes(el)).length > 0 );
        filteredFilms = filteredFilms.filter(film => film.year >= yearFilter[0] && film.year <= yearFilter[1]);
        filteredFilms = filteredFilms.filter(film => film.rate >= ratingFilter[0] && film.rate <= ratingFilter[1]);
        dispatch(updateFilteredFilms(filteredFilms.map(film => film.id)));
    }
};
/**
 * Загружает фильмы и запускает выбор одного из них
 */
export const fetchFilms = () => {
  return dispatch => {
      dispatch(loadFilmsStarted());

        axios.get("./films.json")
            .then(response => {
                dispatch(loadFilms(response.data));
                dispatch(filtreFilm());
                dispatch(changeFilm());
            })
            .catch(err => {
                dispatch(loadFilmsFailure(err.message));
            });

    }
};
