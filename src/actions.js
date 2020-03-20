const logIn = (token) => {
    return {
        type: "LOG_IN",
        payload: token, 
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

const initPurchases = (payload) => {
    return {
        type: "INITILIZE_PURCHASES",
        payload
    }
}

const initInventory = (payload) => {
    return {
        type: "INITILIZE_INVENTORY",
        payload
    }
}

const addPurchase = (payload) => {
    return {
        type: "ADD_PURCHASE",
        payload
    }
}

const addItem = (payload) => {
    return {
        type: "ADD_ITEM",
        payload
    }
}

module.exports = {
    addItem,
    addPurchase,
    initInventory,
    initPurchases,
    logOut,
    logIn,
}