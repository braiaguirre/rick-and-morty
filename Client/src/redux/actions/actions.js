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
    ALERT,
    CLEAR_ALERT
} from './action-types';

const URL = 'http://localhost:3001/rickandmorty';

// GET CHARACTER
export const getCharacter = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`${URL}/character/${id}`);
            return dispatch({
                type: GET_CHARACTER,
                payload: data
            });
        } catch (error) {
            return dispatch({
                type: ALERT,
                payload: {
                    title: 'Error',
                    message: error,
                    alertType: 'accept'
                }
            })
        };
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
    return async (dispatch) => {
        const {data} = await axios.post(`${URL}/fav`, character);
           return dispatch({
              type: ADD_FAV,
              payload: data,
           });
     };
};

// REMOVE FAVORITE
export const removeFav = (id) => {
    return async (dispatch) => {
       const {data} = await axios.delete(`${URL}/fav/${id}`);
          return dispatch({
             type: REMOVE_FAV,
             payload: data,
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
    return async (dispatch) => {
        const {data} = await axios.get(`${URL}/login/?email=${email}&password=${password}`);
        return dispatch({
            type: ACCESS,
            payload: data,
        });
    };
}

export const removeAccess = () => {
    return {
        type: ACCESS,
        payload: false,
       };
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