import axios from 'axios';
import * as _ from 'lodash';
import { store } from '../reducer/store'
import { logout } from '../reducer/slice/user';
import constants from '../common/constants';

const { getState, dispatch } = store;
// -------------------------------------------------------------- API Service Calls
//#region 
async function post(url, data = null) {
    const config = {
        url,
        method: 'post'
    };
    if (data) {
        config.data = data;
    }
    const result = await axios(config);
    return result;
}

async function postWithDownload(url, data = null) {
    const config = {
        url,
        method: 'post',
        responseType: 'blob'
    };
    if (data) {
        config.data = data;
    }
    const result = await axios(config);
    return result;
}

async function get(url, isDownloadRequest = false) {
    const config = {
        url,
        method: 'get'
    };

    if (isDownloadRequest) {
        config.responseType = 'blob';
    }

    const result = await axios(config);
    return result;
}

async function put(url, data = null) {
    const config = {
        url,
        method: 'put'
    };
    if (data) {
        config.data = data;
    }
    const result = await axios(config);
    return result;
}

async function deleteCall(url) {
    const config = {
        url,
        method: 'delete'
    };
    const result = await axios(config);
    return result;
}
//#endregion

// -------------------------------------------------------------- Default API Configurations
//#region 
// Defaults
// axios.defaults.baseURL = 'https://smartseizing.online/v2/api/';
axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use(async (config) => {
    const state = getState();
    const { token } = state.user;
    if (token) {
        config.headers['authorization'] = 'Bearer ' + token;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

async function refreshTokens() {
    return false;
}

// Response interceptor
axios.interceptors.response.use(async (response) => {
    if (response.data instanceof Blob) {
        const { data } = response;
        return { data }
    }

    const { status, data, friendlyErrorMessage, errorMessage } = await response.data;

    if (_.isNil(data) && status > constants.httpStatus.Ok) {
        if (_.isEqual(status, constants.httpStatus.UnprocessableEntity)) {
            const error = {};
            Object.keys(errorMessage).map((key) => {
                error[key] = errorMessage[key][0];
            })
            return { data: null, error, isValidationError: true };
        } else if (_.isEqual(status, constants.httpStatus.Unauthorized)) {
            dispatch(logout());
        } else {
            return { data: null, error: friendlyErrorMessage, isValidationError: false };
        }
    }
    return { data, error: null, isValidationError: false };
}, async (error) => {
    console.log(error);
    return { data: null, error: 'Oops something went wrong !', isValidationError: false };
});

//#endregion
const ApiService = {
    post,
    get,
    put,
    deleteCall,
    postWithDownload
};

export default ApiService;

// -------------------------------------------------------------- API URLs
//#region 
export const ApiUrls = {
    // Auth path
    login: 'auth/login',
    signUp: 'auth/register',

    // user
    user: '/user',

    // task 
    task: '/task',
    completeTask: '/task/complete/{0}',
    undoneTask: '/task/undone/{0}',
    removeTask: '/task/remove/{0}'
};
//#endregion
