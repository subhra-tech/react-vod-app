import { API_ENDPOINT } from '../config/constants'

const baseUrl = API_ENDPOINT
export const sendRequest = async ({ url, method }) => {
    const fullUrl = `${baseUrl}${url}`
    const options = {
        mode: 'cors',
        method: method || 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        }
    }

    const response = await fetch(fullUrl, options)
    return response
}