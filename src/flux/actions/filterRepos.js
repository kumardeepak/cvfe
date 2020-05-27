import C from './constants';

export default function FilterContacts(repos, serachText) {
    return dispatch => {
        dispatch({ type: C.GET_FILTER_REPOS, repos: repos, searchText: serachText })
    }
}