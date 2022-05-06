import axios from "axios";

const urlOrders = 'http://localhost:4000/orders'
const urlUsers = 'http://localhost:4000/users'

export const fetchOrders = () => axios.get(urlOrders)
export const patchOrder = (id, data) => axios.patch(`${urlOrders}/${id}`, data)

export const fetchUsers = () => axios.get(urlUsers)