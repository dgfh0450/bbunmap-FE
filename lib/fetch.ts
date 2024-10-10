export default class Request {
    constructor() {

    }

    fetch = async (path: string, method: 'GET' | 'POST', body?: any, header: Record<string, any> = {}) => {
        const token = localStorage.getItem('access_token');
        let authorization;
        if (token == null || token == undefined)
            authorization = 'Bearer '
        else
            authorization = `Bearer ${token}`;

        const url = process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL + path;

        const newHeader = {
            // Authorization: authorization,
            'Content-Type': 'application/json',
            ...header
        };

        const options: RequestInit = {
            method: method,
            headers: newHeader,
        };

        if (method === 'POST' && body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    get = async (path: string, params?: Record<string, any>, header?: Record<string, any>) => {
        const queryURL = new URLSearchParams(params).toString();

        const newPath = path + `?${queryURL} `;
        return await this.fetch(params ? newPath : path, 'GET', {}, header);
    }
}