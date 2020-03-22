import React, {useContext, useRef, useEffect} from 'react';

import ContactContext from '../../context/contact/contactContext';

export const ContactFilter = () => {
    const {filterContacts, clearFilter, filtered} = useContext(ContactContext);
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                type="text"
                ref={text}
                placeholder="Filter Contacts..."
                onChange={onChange}
            />
        </form>
    );
};
