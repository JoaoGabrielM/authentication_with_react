import jwt from 'jsonwebtoken';

export default class TokenHandler {
    static setToken(token_list) {
        const token_access_decoded = jwt.decode(token_list["access"]);
        const token_refresh_decoded =  jwt.decode(token_list["refresh"]);
        localStorage.setItem('auth-token-access', token_list["access"]);
        localStorage.setItem('auth-token-refresh', token_list["refresh"]);
        localStorage.setItem('exp-access-token', token_access_decoded.exp);
        localStorage.setItem('exp-refresh-token', token_refresh_decoded.exp);
    }

    static removeToken() {
        localStorage.removeItem('auth-token-access');
        localStorage.removeItem('auth-token-refresh');
        localStorage.removeItem('exp-access-token');
        localStorage.removeItem('exp-refresh-token');
    }

    static checkToken() {
        const time_token_access = localStorage.getItem('exp-access-token');
        const refresh_token = localStorage.getItem('auth-token-refresh');
        const time_token_refresh = localStorage.getItem('exp-refresh-token');

        const time_now = Date.now();

        if (time_now > time_token_refresh*1000) {
            this.removeToken();
            return false;
        }

        if (time_now > time_token_access*1000) {
            let result;

            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ refresh: refresh_token }),
                headers: {
                    'Content-type': 'application/json',
                }
            };

            fetch(process.env.REACT_APP_API_URL + '/api-auth/token/refresh/', requestInfo)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error(response);
                    }
                })
                .then(token => {
                    const token_list = JSON.parse(token);
                    const token_access_decoded = jwt.decode(token_list["access"]);
                    localStorage.setItem('auth-token-access', token_list["access"]);
                    localStorage.setItem('exp-access-token', token_access_decoded.exp);
                    result = true;
                })
                .catch(error => {
                    result = false;
            });

            return result;
        }

        return true;
    }
}