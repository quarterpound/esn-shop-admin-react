import Cookies from "universal-cookie";

const initalState = {
    authtoken: new Cookies().get("authtoken") || null,
    purchases: [],
    inventory: [],
    users: [],
}

const rootReducer = (state = initalState, action) => {
    switch(action.type) {
        case "LOG_IN":
            new Cookies().set("authtoken", action.payload);
            return {...state, authtoken: action.payload};
        case "LOG_OUT":
            new Cookies().remove("authtoken");
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