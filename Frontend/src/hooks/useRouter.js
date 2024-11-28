// useRouter.js
import { useNavigate } from "react-router-dom";

const useRouter = () => {
    const navigate = useNavigate();
    const goTo = (path) => {
        navigate(path);
    };

    return { navigate: goTo};
};

export default useRouter;