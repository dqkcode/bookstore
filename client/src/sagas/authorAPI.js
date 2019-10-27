import axios from 'axios';

function* getAuthorsAPI() {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const response = yield axios.get('/authors/', config);
    console.log('response at getAuthor:' + response.data);
    const authors = yield response.status === 200 ? response.data : [];
    return authors;
}

function* addAuthorsAPI(name) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const body = JSON.stringify({
            name
        });
        const response = yield axios.post('/authors/add',body, config);
        yield console.log('response at API : ' + response.data);
        const res = yield response.status === 200 ? response.data : [];
        return res;
    } catch (error) {
        console.error(error);
    }
}

function* deleteAuthorsAPI(id) {
    const config = {
        headers: {
            Accept: 'application/json',
        }
    };
    const response = yield axios.delete(`/authors/${id}`, config);
    yield console.log(response);
    const res = yield response.status === 200 ? response.data : [];
    return res;
}
export const authorApi = {
    getAuthorsAPI,
    addAuthorsAPI,
    deleteAuthorsAPI
};