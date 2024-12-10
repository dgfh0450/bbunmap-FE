import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default class Request {
    accessToken?: string;
    refreshToken?: string;

    constructor(session?: Session | null) {
        this.accessToken = session?.accessToken;
        this.refreshToken = session?.refreshToken;
    }

    fetch = async (path: string, method: 'GET' | 'POST', body?: any, header: Record<string, any> = {}) => {

        const token = this.accessToken;
        let authorization;
        if (token == null || token == undefined)
            authorization = 'Bearer '
        else
            authorization = `Bearer ${token}`;
        console.log(authorization);
        const url = process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL + path;
        const newHeader = {
            Authorization: authorization,
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

        try {

            const response = await fetch(url, options);

            if (response.status != 200) {

                //Error 메세지
                const error = await response.json()

                //token invalid or expired
                if (response.status == 401) {
                    ////TODO
                    // if (error === 'Invalid token') {
                    //     signOut();
                    // }
                    // else {
                    //     if (this.refreshToken) {

                    //         try {
                    //             const response = await fetch(process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL + '/api/newAccess',
                    //                 {
                    //                     method: 'POST',
                    //                     body: JSON.stringify({
                    //                         refreshToken: this.refreshToken
                    //                     })
                    //                 }
                    //             )
                    //             const newAccessToken = await response.json();

                    //         }
                    //         catch (err) {

                    //         }
                    //     }
                    // }
                }
                //Error 메세지 괄호 제거
                //ex) [밤 10시부터 아침 6시까지는 투표를 받고 있지 않습니다]
                throw new Error(error.error.slice(1, -1));
            }

            return await response.json();
        }
        catch (err) {
            throw err;
        }

    }

    get = async (path: string, params?: Record<string, any>, header?: Record<string, any>) => {
        const queryURL = new URLSearchParams(params).toString();
        const newPath = path + `?${queryURL} `;
        return await this.fetch(params ? newPath : path, 'GET', {}, header);
    }

    post = async (path: string, body?: Record<string, any>, header?: Record<string, any>) => {
        return await this.fetch(path, 'POST', body, header)
    }
}