import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.GET_FILTER_REPOS:
        console.log("file",action)
            return action.repos.filter((repo) => repo.full_name.toLocaleLowerCase().indexOf(action.searchText.toLocaleLowerCase()) !== -1)
        default:
            return state;
    }
}
