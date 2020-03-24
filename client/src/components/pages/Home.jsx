import React, {useContext, useEffect} from 'react';

import {Contacts} from '../contacts/Contacts';
import {ContactForm} from '../contacts/ContactForm';
import {ContactFilter} from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

export const Home = () => {
    const {loadUser} = useContext(AuthContext);
    const {contacts, loading} = useContext(ContactContext);

    // Looks at the token, hits the backend, validates it, puts the user into state
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                {!loading && contacts !== null && contacts.length !== 0 ? (
                    <ContactFilter />
                ) : (
                    ''
                )}
                <Contacts />
            </div>
        </div>
    );
};
