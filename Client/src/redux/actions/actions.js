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
    ERROR,
    CLEAR_ERROR,
} from './action-types';
import axios from 'axios';

// CHARACTERS HANDLERS

export const getCharacter = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/rickandmorty/character/${id}`)
            .then(({ data }) => {
                return dispatch({
                    type: GET_CHARACTER,
                    payload: data
                });
            })
            .catch((error) => {
                return dispatch({
                    type: ERROR,
                    payload: error
                })
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

// FAVORITES HANDLERS

export const addFav = (character) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    return (dispatch) => {
        axios.post(endpoint, character).then(({ data }) => {
           return dispatch({
              type: ADD_FAV,
              payload: data,
           });
        });
     };
};

export const removeFav = (id) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
    return (dispatch) => {
       axios.delete(endpoint).then(({ data }) => {
        console.log(data);
          return dispatch({
             type: REMOVE_FAV,
             payload: data,
       });
       });
    };
};

// FILTER HANDLERS

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

// LOGIN - LOGOUT

export const getAccess = (email, password) => {
    const endpoint = 'http://localhost:3001/rickandmorty/login/';
    return (dispatch) => {
        axios(endpoint + `?email=${email}&password=${password}`).then(({data}) => {
          return dispatch({
             type: ACCESS,
             payload: data,
       });
       });
    };
}

export const removeAccess = () => {
    return dispatch({
        type: ACCESS,
        payload: false,
       });
}

// ERROR HANDLERS

export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    }
}