import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default class Request {
    accessToken?: string;
    refreshToken?: string;
    update?: (data: any) => Promise<Session | null>;

    constructor(session?: Session | null, update?: (data: any) => Promise<Session | null>) {
        this.accessToken = session?.accessToken;
        this.refreshToken = session?.refreshToken;
        this.update = update;
    }

    fetch = async (path: string, method: 'GET' | 'POST', body?: any, header: Record<string, any> = {}) => {

        const token = this.accessToken;
        let authorization;
        if (token == null || token == undefined)
            authorization = 'Bearer '
        else
            authorization = `Bearer ${token}`;
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

                if (response.status == 401) {
                    if (error === 'Invalid token') {
                        signOut();
                    }
                    else {
                        if (this.refreshToken && this.update) {
                            try {
                                const responseToken = await fetch(process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL + '/api/newAccess',
                                    {
                                        method: "POST",
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            "refreshToken": this.refreshToken
                                        })
                                    }
                                )
                                const newAccessToken = await responseToken.text();

                                const newHeader = {
                                    Authorization: newAccessToken,
                                    'Content-Type': 'application/json',
                                    ...header
                                };

                                const newOptions: RequestInit = {
                                    method: method,
                                    headers: newHeader,
                                };

                                const response = await fetch(url, newOptions);
                                this.update({ accessToken: newAccessToken });
                                return await response.json();
                            }
                            catch (err) {
                                signOut();
                                console.log('new error :', err)
                                throw err;
                            }
                        }
                    }
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