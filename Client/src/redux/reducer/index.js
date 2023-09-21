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
} from '../actions/action-types.js';

const initialState = {
    allCharacters: [],
    characterDetail: {},
    customCharacters: [],
    allFavs: [],
    filteredFavs: [],
    locations: [],
    image: '',
    access: true,
    error: '',
    alert: {
        title: '',
        message: '',
        alertType: ''
    },
    menuCollapse: false,
    popup: {
        popupType: '',
        payload: {}
    },
    user: {
        name: 'Brian',
        username: 'brianprueba',
        email: 'prueba@gmail.com',
        password: '12345PO',
        image: 'https://rickandmortyapi.com/api/character/avatar/696.jpeg'
    }
};

export default function reducer (state = initialState, {type, payload}) {
    switch (type) {
        
        // GET CHARACTER
        case GET_CHARACTER:
            let duplicate = false;

            for (let i = 0; i < payload.length; i++) {
                duplicate = state.allCharacters.some(character => character.id === payload[i].id);
            }

            return duplicate ? {
                ...state,
                alert: {
                    title: 'Error',
                    message: 'Character already added.',
                    alertType: 'accept'
                    }
                }
            : {
                ...state,
                allCharacters: [...state.allCharacters, ...payload],
            };

        // GET CHARACTER DETAIL
        case GET_CHARACTER_DETAIL:
            return {
                ...state,
                characterDetail: {...state.allCharacters.filter(character => character.id === payload).pop()}
            };

        // CLEAR CHARACTER DETAIL
        case CLEAR_CHARACTER_DETAIL:
            return {
                ...state,
                characterDetail: []
            };

        // CREATE CHARACTER
        case CREATE_CHARACTER:
            payload = {
                ...payload, 
                id: 826 + state.customCharacters.length,
                custom: true
            }
            return {
                ...state,
                allCharacters: [...state.allCharacters, payload],
                customCharacters: [...state.customCharacters, payload]
            }

        // REMOVE CHARACTER
        case REMOVE_CHARACTER:
            if (payload === -1) {
                return {
                    ...state,
                    allCharacters: [],
                    allFavs: [],
                    customCharacters: [],
                    filteredFavs: []
                }
            }
            return {
                ...state,
                allCharacters: [...state.allCharacters.filter(character => character.id !== Number(payload))],
                customCharacters: [...state.customCharacters.filter(character => character.id !== Number(payload))],
                allFavs: [...state.allFavs.filter(character => character.id !== Number(payload))],
                filteredFavs: [...state.filteredFavs.filter(character => character.id !== Number(payload))]
            };

        // EDIT CHARACTER
        case EDIT_CHARACTER:
            return {
                ...state,
                allCharacters: [
                    ...state.allCharacters.filter(character => character.id !== Number(payload.oldCharacter.id))
                    , {...payload.newCharacter, id: state.customCharacters.length + 826}],
                customCharacters: [
                    ...state.customCharacters.filter(character => character.id !== Number(payload.oldCharacter.id))
                    , {...payload.newCharacter, id: state.customCharacters.length + 826}],
            }
                
        // ADD FAVORITE
        case ADD_FAV:
            return {
                ...state, 
                allFavs: [...state.allFavs, payload],
                filteredFavs: [...state.filteredFavs, payload]
            };

        // REMOVE FAVORITE
        case REMOVE_FAV:
            return {
                ...state, 
                allFavs: payload,
                filteredFavs: payload
            };

        // ORDER FITLER
        case ORDER_FILTER:
			if (payload === 'N')
				state.filteredFavs = [...state.allFavs]

			if (payload === 'A') 
				state.filteredFavs.sort((a, b) => a.id > b.id ? 1 : -1)

			if (payload === 'D') 
				state.filteredFavs.sort((a, b) => a.id < b.id ? 1 : -1)

			return {
				...state, 
				filteredFavs: [...state.filteredFavs]
			};

        // STATUS FILTER
        case STATUS_FILTER:
            if (payload === 'All') return {
				...state, 
				filteredFavs: [...state.allFavs]};

            else return {
                ...state, 
                filteredFavs: state.allFavs.filter(character => character.status === payload)};
        
        // GENDER FILTER
        case GENDER_FILTER:
            if (payload === 'All') return {
                ...state, 
                filteredFavs: [...state.allFavs]};

            else return {
                ...state, 
                filteredFavs: state.allFavs.filter(character => character.gender === payload)};

        // GET LOCATIONS
        case GET_LOCATIONS:
            return {
                ...state,
                locations: payload
            }

        // GET LOCATIONS
        case CLEAR_LOCATIONS:
            return {
                ...state,
                locations: []
            }

        // GET IMAGE
        case GET_IMAGE:
            return {
                ...state,
                image: payload
            }

        // GET LOCATIONS
        case CLEAR_IMAGE:
            return {
                ...state,
                image: ''
            }

        // ACCESS
        case ACCESS:
            if ((state.user.username === payload.emailUsername || state.user.email === payload.emailUsername) && state.user.password === payload.password) {
                return {
                    ...state,
                    access: true
                }
            } else {
                return {
                    ...state,
                    alert: {
                        title: 'Error',
                        message: 'Invalid email, username or password.',
                        alertType: 'accept'
                        }
                }
            }

        // REMOVE ACCESS
        case REMOVE_ACCESS:
            return {
                ...state,
                access: false
            }

        // SIGN UP
        case SIGNUP:
            return {
                ...state,
                user: {
                    name: payload.name,
                    username: payload.username,
                    email: payload.email,
                    image: payload.image,
                    password: payload.password
                }
            }

        // ALERT
        case ALERT:
            return {
                ...state,
                alert: payload
            }
        
        case CLEAR_ALERT:
            return {
                ...state,
                alert: {
                    title: '',
                    message: '',
                    alertType: ''
                }
            }

        // CREATE_POPUP
        case CREATE_POPUP:
            return {
                ...state,
                popup: {
                    popupType: payload.popupType,
                    payload: payload.payload
                }
            }

        case CLOSE_POPUP:
            return {
                ...state,
                popup: {
                    popupType: '',
                    payload: {}
                }
            }

        // MENU COLLAPSE
        case MENU_COLLAPSE:
            return {
                ...state,
                menuCollapse: !state.menuCollapse
            }

		// DEFAULT
        default:
            return state;
    }
}