import React, {useReducer} from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    const deleteContact = (id) => {
        dispatch({type: DELETE_CONTACT, payload: id});
    };

    const updateContact = (contact) => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
    };

    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    };

    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact});
    };

    const filterContacts = (filter) => {
        dispatch({type: FILTER_CONTACTS, payload: filter});
    };

    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                updateContact,
                clearCurrent,
                setCurrent,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
