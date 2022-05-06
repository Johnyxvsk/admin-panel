import * as api from '../api';

// Action Creators

export const getOrders = () => async (dispatch) => {
    try {
        const { data } = await api.fetchOrders();
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (err) {
        console.log(err.message)
    }

}
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        const { data } = await api.patchOrder(id, order);
        console.log(data)

        dispatch({ type: 'PATCH_ORDER', payload: data})
    } catch (err) {
        console.log(err.message)
    }

}



