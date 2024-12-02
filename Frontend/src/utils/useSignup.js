// useSignup.js
import useRouter from '../hooks/useRouter';
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';

const notify = (str) => toast(str);

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { navigate } = useRouter();

    const handleSignup = async (data) => {
        setLoading(true);
        try {
            const bodyPayload = {
                email: data.email,
                password: data.password,
            };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/user-register`, bodyPayload, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            console.log('Protected Data:', response.data);
            notify("Successfully Signed up!");
            navigate("/login");
        } catch (error) {
            notify(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { handleSignup, loading };
};

export default useSignup;