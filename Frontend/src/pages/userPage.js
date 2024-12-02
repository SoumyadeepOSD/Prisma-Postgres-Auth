import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/appContext';
import axios from 'axios';

const UserPage = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userInfo } = useContext(AppContext);

    const getTagData = async () => {
        const bodyPayload = {
            user_id: userInfo?.id,
        };
        try {
            const response = await axios.post("http://localhost:5000/api/tag/tag-view", bodyPayload, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                setTags(response.data.tag); // Set the 'tag' array directly
            } else {
                setError(`HTTP Error: ${response.status}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTagData();
    }, []); // Runs only once when the component mounts

    // Handling loading state and error messages
    if (loading) {
        return (
            <div className="bg-black flex flex-col items-center justify-center h-screen">
                <h1 className="text-white">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-black flex flex-col items-center justify-center h-screen">
                <h1 className="text-white">Error: {error}</h1>
            </div>
        );
    }

    return (
        <div className="bg-white flex flex-col items-center justify-center h-screen w-full">
            <h1 className="text-black font-bold text-lg">Your selected data:</h1>
            <div className="text-black">
                {tags.map((item, index) => (
                    <div key={index} className="p-2 border-b border-gray-300">
                        <div className="font-bold">{item.tag}</div>
                        <div>{item.values.join(", ")}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;
