import { SWAPI_REQUEST, SWAPI_RESPONSE, SWAPI_SET_SEARCH} from 'const';
import swapiApi from 'api/swapi';

export function fetchItems(category, page = 1) {
    return async (dispatch, getState) => {
        dispatch(requestItems(category));

        const {searchStr, } = getState().swapiState[category];
        const result = await swapiApi.getList(category, page, searchStr);

        dispatch(responseItems(result, category, page))
    };
}

function shouldFetchItems(state) {
    const {isFetching, results, didInvalidate, lastUpdate} = state;
    if (isFetching) {
        return false;
    } else if (!results) {
        return true;
    } else if (didInvalidate || lastUpdate < (Date.now() - 1000 * 60 * 10)) {
        return true;
    }

    return false;
}

export function updateItemsIfNeeded(category) {
    return (dispatch, getState) => {
        const { swapiState } = getState();
        const categoryData = swapiState[category];

        if (shouldFetchItems(categoryData)) {
            dispatch(fetchItems(category));
        }
    };
}

function requestItems(category) {
    return {
        type: SWAPI_REQUEST,
        category,
    };
}

function responseItems(response, category, page) {
    let {results, ...pagination} = response;
    if (Array.isArray(results)) {
        results = category === 'films'
            ? results.sort((a, b) => a.title > b.title)
            : results.sort((a, b) => a.name > b.name);
    }
    return {
        type: SWAPI_RESPONSE,
        category,
        payload: {
            pagination: {
                ...pagination,
                page,
            },
            results,
        },
    };
}

export function searchItems(str, category) {
    return dispatch => {
        dispatch(setSearch(str, category));
        dispatch(fetchItems(category));
    };
}

function setSearch(str, category) {
    return {
        type: SWAPI_SET_SEARCH,
        category,
        payload: str
    };
}
