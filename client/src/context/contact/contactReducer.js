import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };

        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact._id !== action.payload
                ),
                loading: false
            };

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) =>
                    contact._id === action.payload._id
                        ? action.payload
                        : contact
                ),
                loading: false
            };

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };

        case FILTER_CONTACTS:
            const regex = new RegExp(`${action.payload}`, 'gi');
            return {
                ...state,
                filtered: state.contacts.filter(
                    ({name, email}) => name.match(regex) || email.match(regex)
                )
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };

        default:
            return state;
    }
};
