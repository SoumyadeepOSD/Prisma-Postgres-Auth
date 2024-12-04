import axios from "axios";

const getTagData = async ({id}) => {
    const bodyPayload = {
        // user_id: userInfo?.id,
        user_id: id,
    };
    try {
        const response = await axios.post("http://localhost:5000/api/tag/tag-view", bodyPayload, {
            headers: { 
                "Content-Type": "application/json" 
            },
        });
        if (response.status === 200) {
            // setTags(response.data.tag); 
            return response.data.tag;
        } else {
            // setError(`HTTP Error: ${response.status}`);
            return response.status;
        }
    } catch (error) {
        // setError(`Error: ${error.message}`);
        return error.message;
    } 
};

export default getTagData;