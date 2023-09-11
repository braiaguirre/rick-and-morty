import axios from 'axios';

import {
    GET_CHARACTER,
    GET_CHARACTER_DETAIL,
    CLEAR_CHARACTER_DETAIL,
    CREATE_CHARACTER,
    REMOVE_CHARACTER, 
    ADD_FAV, 
    REMOVE_FAV, 
    FILTER, 
    ORDER, 
    ACCESS,
    ERROR,
    CLEAR_ERROR,
    ALERT,
    CLEAR_ALERT
} from './action-types';

// GET CHARACTER
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

// GET CHARACTER DETAIL
export const getCharacterDetail = (id) => {
    return {
        type: GET_CHARACTER_DETAIL,
        payload: id
    };
};

// CLEAR CHARACTER DETAIL
export const clearCharacterDetail = () => {
    return {
        type: CLEAR_CHARACTER_DETAIL,
    };
};

// CREATE CHARACTER
export const createCharacter = (character) => {
    return {
        type: CREATE_CHARACTER,
        payload: character
    };
}

// REMOVE CHARACTER
export const removeCharacter = (id) => {
    return {
        type: REMOVE_CHARACTER,
        payload: id
    };
}

// ADDF AVORITE
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

// REMOVE FAVORITE
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

// ACCESS HANDLERS
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
    return {
        type: ACCESS,
        payload: false,
       };
}

// ERROR HANDLERS
export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    }
}

// ALERT
export const sendAlert = (title, message, alertType, action) => {
    return {
        type: ALERT,
        payload: {
            title: title,
            message: message,
            alertType: alertType,
            action: action,
        }
    }
}

export const clearAlert = () => {
    return {
        type: CLEAR_ALERT
    }
}