import {
    GET_CHARACTER, 
    GET_CHARACTER_DETAIL,
    CLEAR_CHARACTER_DETAIL,
    REMOVE_CHARACTER, 
    ADD_FAV, 
    REMOVE_FAV, 
    FILTER, 
    ORDER,
    ACCESS,
    CLEAR_ERROR,
} from './action-types';
import axios from 'axios';

export const getCharacter = (id) => {
    return (dispatch) => {
        // axios.get(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
        axios.get(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
            return dispatch({
                type: GET_CHARACTER,
                payload: data
            });
        });
    };
};

export const getCharacterDetail = (id) => {
    return (dispatch) => {
        return dispatch({
            type: GET_CHARACTER_DETAIL,
            payload: id
        });
    };
};

export const clearCharacterDetail = () => {
    return (dispatch) => {
        return dispatch({
            type: CLEAR_CHARACTER_DETAIL,
        });
    };
};

export const removeCharacter = (id) => {
    return {
        type: REMOVE_CHARACTER,
        payload: id
    }
}

export const addFav = (character) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    return (dispatch) => {
        axios.post(endpoint, character).then(({ data }) => {
           return dispatch({
              type: 'ADD_FAV',
              payload: data,
           });
        });
     };
};

export const removeFav = (id) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
    return (dispatch) => {
       axios.delete(endpoint).then(({ data }) => {
          return dispatch({
             type: 'REMOVE_FAV',
             payload: data,
       });
       });
    };
};

export const filterCards = (gender) => {
    return {
        type: FILTER,
        payload: gender
    };
};

export const orderCards = (order) => {
    return {
        type: ORDER,
        payload: order
    };
};

export const access = ({email, password}) => {
    return {
        type: ACCESS,
        payload: {
            email: email,
            password: password
        }
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    }
}