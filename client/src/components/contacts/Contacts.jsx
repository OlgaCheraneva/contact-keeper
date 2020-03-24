import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {ContactItem} from './ContactItem';
import {Spinner} from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';

export const Contacts = () => {
    const {contacts, filtered, getContacts, loading} = useContext(
        ContactContext
    );
    const {isAuthenticated} = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            getContacts();
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);

    if (!loading && contacts !== null && contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            {contacts === null || loading ? (
                <Spinner />
            ) : (
                <TransitionGroup>
                    {filtered === null
                        ? contacts.map((contact) => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={500}
                                  classNames="item"
                              >
                                  <ContactItem contact={contact} />
                              </CSSTransition>
                          ))
                        : filtered.map((contact) => (
                              <ContactItem
                                  key={contact._id}
                                  contact={contact}
                              />
                          ))}
                </TransitionGroup>
            )}
        </Fragment>
    );
};
