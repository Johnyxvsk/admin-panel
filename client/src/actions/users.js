import * as api from '../api';

// Action Creators

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: 'FETCH_USERS', payload: data})
    } catch (err) {
        console.log(err.message)
    }
}

