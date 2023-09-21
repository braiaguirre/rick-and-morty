import axios from 'axios';

import {
    GET_CHARACTER,
    GET_CHARACTER_DETAIL,
    CLEAR_CHARACTER_DETAIL,
    CREATE_CHARACTER,
    REMOVE_CHARACTER, 
    EDIT_CHARACTER,
    ADD_FAV, 
    REMOVE_FAV, 
    ORDER_FILTER, 
    STATUS_FILTER,
    GENDER_FILTER, 
    GET_LOCATIONS,
    CLEAR_LOCATIONS,
    GET_IMAGE,
    CLEAR_IMAGE,
    ACCESS,
    REMOVE_ACCESS,
    SIGNUP,
    ALERT,
    CLEAR_ALERT,
    CREATE_POPUP,
    CLOSE_POPUP,
    MENU_COLLAPSE
} from './action-types';

const URL = 'http://localhost:3001/rickandmorty';

// GET CHARACTER
export const getCharacter = (id, name, gender, species, origin, status) => {
    let endpoint = `${URL}/character/`;
    if (id) endpoint = `${endpoint}${id}`;
    else endpoint = `${endpoint}?name=${name}&gender=${gender}&species=${species}&status=${status}`;

    return async (dispatch) => {
        try {
            const {data} = await axios.get(endpoint);
            return dispatch({
                type: GET_CHARACTER,
                payload: data
            });
        } catch (error) {
            return dispatch({
                type: ALERT,
                payload: {
                    title: 'Error',
                    message: error.response.data,
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

// EDIT CHARACTER
export const editCharacter = (oldCharacter, newCharacter) => {
    return {
        type: EDIT_CHARACTER,
        payload: {
            oldCharacter: oldCharacter,
            newCharacter: newCharacter
        }
    }
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
export const orderFilter = (order) => {
    return {
        type: ORDER_FILTER,
        payload: order
    };
};

export const statusFilter = (status) => {
    return {
        type: STATUS_FILTER,
        payload: status
    };
};

export const genderFilter = (gender) => {
    return {
        type: GENDER_FILTER,
        payload: gender
    };
};

// GET LOCATIONS
export const getLocations = (id = '') => {
    return async (dispatch) => {
        try {
        const {data} = await axios.get(`${URL}/location/${id}`);
        return dispatch({
            type: GET_LOCATIONS,
            payload: data
        });
    } catch (error) {
        return dispatch({
            type: ALERT,
            payload: {
                title: 'Error',
                message: error.response.data,
                alertType: 'accept'
            }
        })
    }};
}

export const clearLocations = () => {
    return {
        type: CLEAR_LOCATIONS
    }
}

// GET IMAGE
export const getImage = (id) => {
    return async (dispatch) => {
    try {
        const {data} = await axios.get(`${URL}/image/${id}`);
        return dispatch({
            type: GET_IMAGE,
            payload: data
        });
    } catch (error) {
        return dispatch({
            type: ALERT,
            payload: {
                title: 'Error',
                message: error.response.data,
                alertType: 'accept'
            }
        })
    }};
}

export const clearImage = () => {
    return {
        type: CLEAR_IMAGE
    }
}

// ACCESS HANDLERS
export const getAccess = (emailUsername, password) => {
    return {
        type: ACCESS,
        payload: {
            emailUsername: emailUsername,
            password: password
        }
    };
    
    // return async (dispatch) => {
    //     const {data} = await axios.get(`${URL}/login/?email=${email}&password=${password}`);
    //     return dispatch({
    //         type: ACCESS,
    //         payload: data,
    //     });
    // };
}

// SIGN UP
export const signUp = (name, username, email, password, image) => {
    return {
        type: SIGNUP,
        payload: {
            name: name,
            username: username,
            email: email,
            password: password,
            image: image
        }
    };
}

export const removeAccess = () => {
    return {
        type: REMOVE_ACCESS,
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

// POPUP
export const createPopup = (popupType, payload) => {
    return {
        type: CREATE_POPUP,
        payload: {
            popupType: popupType,
            payload: payload
        }
    }
}

export const closePopup = () => {
    return {
        type: CLOSE_POPUP,
    }
}

export const menuCollapse = () => {
    return {
        type: MENU_COLLAPSE
    }
}