// useSignup.js
import { useContext, useState } from 'react';
import axios from 'axios';
import useRouter from '../hooks/useRouter';
import { AppContext } from '../context/appContext';
import toast from 'react-hot-toast';

const notify = (str) => toast(str);

const useSubmit = () => {
    const [loading, setLoading] = useState(false);
    const { navigate } = useRouter();
    const {userInfo} = useContext(AppContext);
    


    const handleSubmitData = async (data) => {
        setLoading(true);
        try {
            const bodyPayload = {
                tag: data.tag,
                values:data.values.split(","),
                user_id: userInfo.id,
                field_type:data.values.length>=0 ? "dropdown":"text"
            };
            const response = await axios.post("http://localhost:5000/api/tag/tag-submit", bodyPayload, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            console.log('Protected Data:', response.data);
            notify("Successfully registered tags");
            navigate("/dashboard/tag-view");
        } catch (error) {
            notify(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmitData, loading };
};

export default useSubmit;