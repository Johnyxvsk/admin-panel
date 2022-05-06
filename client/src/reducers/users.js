export default (users = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return users;
        default:
            return users;
    }
}