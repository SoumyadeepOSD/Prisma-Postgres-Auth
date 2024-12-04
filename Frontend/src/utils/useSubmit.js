import { AppContext } from '../context/appContext';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const notify = (str) => toast(str);

const useSubmit = (fetchData, handleToogle) => {
    const [loading, setLoading] = useState(false);
    const { userInfo } = useContext(AppContext);

    const handleSubmitData = async (data) => {
        setLoading(true);
        try {
            const bodyPayload = {
                tag: data.tag,
                values: Array.isArray(data.values) ? data.values : data.values.split(",").map((v) => v.trim()),
                user_id: userInfo.id,
                field_type: Array.isArray(data.values) && data.values.length > 0 ? "dropdown" : "text",
            };
            const response = await axios.post("http://localhost:5000/api/tag/tag-submit", bodyPayload, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            console.log("Protected Data:", response.data);
            notify("Successfully registered tags");
            handleToogle();
            // Fetch updated data
            fetchData();
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
