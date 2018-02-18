/** ****************************************************************************************** */

/**
 * This function returns the api endpoint
 * @returns {string}
 */
export function getApiEndpoint() {
    if ( window === undefined || window.appConfig === undefined || window.appConfig.apiEndpoint === undefined ) {
        console.error('Api Endpoint is not defined. Using fallback URL');
        return fallbackApiUrl;
    }
    return window.appConfig.apiEndpoint;
}

/**
 * This function gets JSON from api
 * @param url
 */
export function JsonGet(url) {

    if ( url === undefined ) {
        url = '';
    }
    return axios.get(getApiEndpoint() + url);
}

/**
 * This function posts DATA to the api
 * @param url
 * @param data
 * @returns {*}
 */
export function JsonPost(url, data) {

    if ( url === undefined ) {
        return null;
    }

    if ( data === null || data === undefined ) {
        return null;
    }

    let postString = "";
    Object.keys(data).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(key, index, data[key]);
        postString = postString + key + '=' + data[key] + '&';
    });
    return axios.post(getApiEndpoint() + url, postString);
}

/** ****************************************************************************************** */
