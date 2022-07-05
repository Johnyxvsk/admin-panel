const users = (users = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return users;
        default:
            return users;
    }
}
export default users