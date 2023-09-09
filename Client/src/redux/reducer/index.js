import {
    ADD_FAV, 
    REMOVE_CHARACTER, 
    REMOVE_FAV, 
    FILTER, 
    ORDER, 
    GET_CHARACTER,
    GET_CHARACTER_DETAIL,
    CLEAR_CHARACTER_DETAIL,
    ACCESS,
    ERROR,
    CLEAR_ERROR
} from '../actions/action-types.js';

const ERROR_CODES = {
    ERROR_404: {
        error: 'Not found!',
        desc: 'You can choose an ID from 1 to 826.'
    },
    ERROR_666: {
        error: 'Already added!',
        desc: 'This character was already added, try another ID.'
    }
}

const initialState = {
    allCharacters: [],
    characterDetail: {},
    allFavs: [],
    filteredFavs: [],
    access: true,
    error: ''
};

export default function reducer (state = initialState, {type, payload}) {
    switch (type) {
        
        // GET CHARACTER
        case GET_CHARACTER:
            for (let i = 0; i < state.allCharacters.length; i++) {
                if (state.allCharacters[i].id === payload.id) return {
                    ...state,
                    error: ERROR_CODES.ERROR_666
                };
            }
            return {
                ...state,
                allCharacters: [...state.allCharacters, payload]
            };

        // GET CHARACTER DETAIL
        case GET_CHARACTER_DETAIL:
            return {
                ...state,
                characterDetail: {...state.allCharacters.filter(character => character.id !== Number(payload)).pop()}
            };

        // CLEAR CHARACTER DETAIL
        case CLEAR_CHARACTER_DETAIL:
            return {
                ...state,
                characterDetail: []
            };


        // REMOVE CHARACTER
        case REMOVE_CHARACTER:
            if (payload === -1) return {
                ...state,
                allCharacters: [],
                allFavs: [],
                filteredFavs: []
            }
            return {
                ...state,
                allCharacters: [...state.allCharacters.filter(character => character.id !== payload)],
                allFavs: [...state.allFavs.filter(character => character.id !== payload)],
                filteredFavs: [...state.filteredFavs.filter(character => character.id !== payload)]
            };
                
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
                allFavs: [...state.allFavs.filter(character => character.id !== String(payload))],
                filteredFavs: [...state.filteredFavs.filter(character => character.id !== String(payload))]
            };

        // GENDER FILTER
        case FILTER:
            if (payload === 'All') return {
				...state, 
				filteredFavs: [...state.allFavs]};

            else return {
                ...state, 
                filteredFavs: state.allFavs.filter(character => character.gender === payload)};

        // ORDER FITLER
        case ORDER:
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

        // ERROR
        case ERROR:
            return {
                ...state,
                error: ERROR_CODES[payload.response.data]
            }


        // CLEAR ERROR
        case CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }

        // ACCESS
        case ACCESS:
            return {
                ...state,
                access: payload
            }

		// DEFAULT
        default:
            return state;
    }
}