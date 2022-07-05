 const orders = (orders = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
            
        case 'PATCH_ORDER':
            return orders.map((order) => order._id === action.payload._id ? action.payload : order)
        default:
            return orders;
    }
}

export default orders