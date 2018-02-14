import axios from 'axios';
import TimeoutError from '@Errors/TimeoutError';

/**
 * 
 * @param {Promise} request 
 */
const requestHandler = (request) => {
    return request.catch(err => {
        const resp = error.response;
        if(resp.statusCode == 504) {
            if(retried < 5) {
                retried++;
                return request;
            } else {
                throw new TimeoutError(retried);
            }
        }
        throw err;
    })
}

/**
 * Http post request
 * 
 * @param {string} url 
 * @param {object} data 
 * @param {string} contentType 
 * @returns {Promise}
 */
export const POST = (url, data, contentType='application/json') => {
    let retried = 0;
    const request = axios.post(url, data, {
        headers: {
            'Content-Type': contentType,
            'requesttoken': oc_requesttoken
        }
    })
    return requestHandler(request);
}

export const GET = (url, contentType='application/json') => {
    let retried = 0; 
    const request = axios.get(url, {
        headers: {
            'Content-Type': contentType,
            'requesttoken': oc_requesttoken
        }
    })
    return requestHandler(request);

}