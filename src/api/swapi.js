const API_SERVER = 'https://swapi.co/api/';

const swapiApi = {
    async getList(category, page, search) {
        const params = Object.entries({page, search})
            .filter(itm => itm[1])
            .map(itm => itm.join('='))
            .join('&')
        return await fetch(API_SERVER + category + '/?' + params)
            .then(res => res.json(), err => ({error: err}));
    },

    async getItem (path) {
        return await fetch(path).then(res => res.json());
    }
};

export default swapiApi;
