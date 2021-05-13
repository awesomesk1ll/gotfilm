import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Lists.scss';


const Favorites = ({ films, favorites, removeFromListAndSave }) => {
    const handleRemoveFromList = (filmId) => {
        removeFromListAndSave(filmId, "favorites");
    };
    let list = films.length && favorites.data.map(item => {
        let film = films.find(film => film.id === item.id);
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} removeFromList={() => handleRemoveFromList(film.id)} />
    }).reverse();
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">Избранные</div>
            <div className="lists__list">
                {list?.length ? list : (<div className="lists__placeholder" />)}
            </div>
            <div className="lists__emptyBlock"></div>
            <Navigation checked={'lists'} />
        </div>
    )
};

Favorites.propTypes = {
    favorites: PropTypes.object,
    films: PropTypes.array,
    removeFromListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);