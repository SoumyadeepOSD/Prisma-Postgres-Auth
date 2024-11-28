// useSignup.js
import { useContext, useState } from 'react';
import axios from 'axios';
import useRouter from '../hooks/useRouter';
import { AppContext } from '../context/appContext';
import toast from 'react-hot-toast';

const notify = (str) => toast(str);

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { navigate } = useRouter();
    const {setToken, token} = useContext(AppContext);
    

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            const bodyPayload = {
                email: data.email,
                password: data.password
            };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user-login`, bodyPayload, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            console.log('Protected Data:', response.data);
            notify("Successfully Logged in🥳");
            setToken(response.data?.token);
            console.log(token);
            navigate("/dashboard");
        } catch (error) {
            notify(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading };
};

export default useLogin;