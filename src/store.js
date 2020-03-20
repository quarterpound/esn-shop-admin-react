const initalState = {
    authtoken: null,
    purchases: [],
    inventory: [],
}

const rootReducer = (state = initalState, action) => {
    switch(action.type) {
        case "LOG_IN":
            return {...state, authtoken: action.payload};
        case "LOG_OUT":
            return {...state, authtoken: null};
        case "INITILIZE_PURCHASES":
            return { ...state, purchases: [...action.payload] };
        case "INITILIZE_INVENTORY":
            return { ...state, inventory: [...action.payload] };
        case "ADD_PURCHASE":
            return {...state, purchases: [action.payload, ...state.purchases]};
        case "ADD_ITEM":
            return {...state, inventory: [action.payload, ...state.inventory]};
        default:
            return state;
    }
}

export default rootReducer