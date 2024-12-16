import axios from "../../utils/axios/axiosInstance";

export const LoginGoogleAPI = async ({ email }) => {
    let resolved = {
        error: null,
        data: null,
    };

    try {
        let res = await axios({
            url: '/api/users/loginwithgoogle',
            method: 'POST',
            data: {
                email,
            },
        });
        resolved.data = res.data;
    } catch (err) {
        if (err && err.response && err.response.data && err.response.data.message) {
            resolved.error = err.response.data.message;
        } else {
            resolved.error = 'Something went wrong';
        }
    }

    return resolved;
};