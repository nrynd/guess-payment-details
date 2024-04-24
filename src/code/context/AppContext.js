import React, { useState } from 'react';
import { makeID } from '../constants/general-helper';

const AppContext = React.createContext();
const ContextProvider = ({ children }) => {
    const [guessData, setGuessData] = useState([
        {
            id: makeID(5),
            name: 'John Doe',
            gender: true, // man
        },
        {
            id: makeID(5),
            name: 'Sabrina Tan',
            gender: false, // woman
        },
    ]);

    return (
        <AppContext.Provider value={{ guessData, setGuessData }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, ContextProvider };
