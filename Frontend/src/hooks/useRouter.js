// useRouter.js
import { useNavigate } from "react-router-dom";

const useRouter = () => {
    const navigate = useNavigate()
    return { navigate };
};

export default useRouter;