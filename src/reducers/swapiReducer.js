import { combineReducers } from 'redux';
import { CATEGORY, SWAPI_REQUEST, SWAPI_RESPONSE, SWAPI_SET_SEARCH } from 'const';

const initState = {
    isFetching: false,
    didInvalidate: false,
    lastUpdate: null,
    searchStr: '',
};

const categoryReducer = (state = initState, action, category) => {
    switch (action.type + action.category) {
        case SWAPI_REQUEST + category:
            return {
                ...state,
                isFetching: true
            };

        case SWAPI_RESPONSE + category:
            return {
                ...state,
                ...action.payload,
                isFetching: false,
                lastUpdate: Date.now(),
                didInvalidate: false
            };

        case SWAPI_SET_SEARCH + category:
            return {
                ...state,
                searchStr: action.payload,
            };

        default:
            return state;
    }
};

const categoryReducerWrapper = category => {
    return (state, action) => categoryReducer(state, action, category);
};

const swapiReducer = combineReducers(CATEGORY.reduce((result, itm) => ({
    ...result,
    [itm]: categoryReducerWrapper(itm)
}), {}));

export default swapiReducer