const reducer = (state, action) => {
    if (action.type === 'MODIFY') {
        const modifiedList = state.products.map((item) => {
            if (item.id >= action.payload.id && action.payload.fadeOut) {
                return {...item, fadeOut: true }
            } 
            if (item.id > action.payload.id && !action.payload.fadeOut) {
                return {...item, fadeOut: false }
            }
            return item;
        })
        return {...state, products: modifiedList }
    }
    if (action.type === 'REMOVE') {
        const newList = state.products.filter((item) => item.id !== action.payload);
        return {...state, products: newList }
    }
    if (action.type === 'TOGGLE_AMOUNT') {
        const tempCart = state.products.map((item) => {
            if (item.id === action.payload.id) {
                if (action.payload.type === 'inc') {
                    return {...item, quantity: item.quantity + 1}
                }
                if (action.payload.type === 'dec') {
                    return {...item, quantity: Math.max(1, item.quantity - 1)}
                }
            }
            return item;
        })
        return { ...state, products: tempCart }
    }
    if (action.type === 'GET_SUBTOTAL') {
        const subtotal = state.products.reduce((acc, curr) => {
            return (acc + (curr.price*curr.quantity));
        },0);
        return { ...state, subtotal };
    }
    if (action.type === 'HANDLE_POSITION') {
        const windowWidth = window.innerWidth;
        const cartWidth = document.getElementsByClassName("product").length*200;
        let newPosition = state.left;
        if (windowWidth < cartWidth) {
            newPosition = -(action.payload.clientX / windowWidth) * (cartWidth - windowWidth);
        } else {
            newPosition = 0;
        }
        return { ...state, left: newPosition }
    }
    if (action.type === 'SET_DEVICE') {
        return { ...state, device: action.payload }
    }
    throw new Error('no matching action type');
}

export default reducer;