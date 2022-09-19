import React, { useContext, useEffect, useReducer } from 'react';
import items from './data';
import device from './deviceDetector';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
    products: items,
    left: 0,
    device: null,
    subtotal: 0,
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const modifyAndRemoveItem = (id) => {
        dispatch({ type: 'MODIFY', payload: {id, fadeOut: true}});
        setTimeout(() => {
            dispatch({ type: 'REMOVE', payload: id});
            dispatch({ type: 'MODIFY', payload: {id, fadeOut: false}});
        }, 500);
    }

    const toggleAmount = (id, type) => {
        dispatch({ type: 'TOGGLE_AMOUNT', payload: {id, type} });
    }

    const handleCartPosition = (evt) => {
        dispatch({ type: 'HANDLE_POSITION', payload: evt });
    }

    useEffect(() => {
        dispatch({ type: 'SET_DEVICE', payload: device() })
    }, []);

    useEffect(() => {
        dispatch({ type: 'GET_SUBTOTAL' })
    }, [state.products] );

    return (
        <AppContext.Provider value={{ 
            ...state, 
            modifyAndRemoveItem, 
            toggleAmount, 
            handleCartPosition 
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}
export { AppContext, AppProvider}