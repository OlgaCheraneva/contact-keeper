import React, {useContext} from 'react';

import AlertContext from '../../context/alert/alertContext';

export const Alerts = () => {
    const {alerts} = useContext(AlertContext);

    return (
        alerts.length > 0 &&
        alerts.map(({id, type, message}) => (
            <div key={id} className={`alert alert-${type}`}>
                <i className="fas fa-info-circle" /> {message}
            </div>
        ))
    );
};
