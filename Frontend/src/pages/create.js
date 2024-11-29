import React,{ useState } from "react";
import useRouter from "../hooks/useRouter";

const CreatePage = () => {
    const { navigate } = useRouter();
    const [name, setName] = useState("");
    const [valueType, setValueType] = useState("text");
    const [textValue, setTextValue] = useState("");
    
    const toggleChange = () => {
        setValueType(valueType === "text" ? "dropdown" : "text");
    };

    const handleSubmit = () => {
        // navigate("/user-page");
        
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black h-screen">
            <h1 className="text-white text-5xl font-thin mb-5">Create Form</h1>
            <div className=" bg-gradient-to-br from-slate-800 to-slate-300 rounded-xl w-[30%] h-[50%]">
            <div className="rounded-lg h-[50%] w-[30%] mt-5 flex flex-col items-start p-5 justify-start bg-transparent z-10">
            <label className="text-white text-sm font-semibold">Field Name</label>
                <input
                    className="my-5 px-3 text-black rounded-lg py-1 w-[400px]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex flex-row items-center gap-5 text-black">
                    <span className="flex flex-row gap-3 items-center">
                        <label className="text-white text-sm font-semibold">Dropdown</label>
                        <input
                            className="my-5 text-black"
                            type="radio"
                            checked={valueType === "dropdown"}
                            onChange={toggleChange}
                        />
                    </span>

                    <span className="flex flex-row gap-3 items-center">
                        <label className="text-white text-sm font-semibold">Text</label>
                        <input
                            className="my-5 text-black"
                            type="radio"
                            checked={valueType === "text"}
                            onChange={toggleChange}
                        />
                    </span>
                </div>
                {valueType === "dropdown" && (
                    <div className="w-[90%]">
                        <label className="text-white text-sm font-semibold">Add Value</label>
                        <div className="flex flex-row justify-start items-center gap-2 w-[400px]">
                            <input
                                className="text-black px-3 h-9 rounded-lg w-full"
                                type="text"
                                placeholder="please put comma separated values"
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                            />
                        </div>
                    </div>
                )}
                <div className="flex flex-col items-center w-[400px] mt-5">
                    <button
                        className="bg-gradient-to-br from-blue-950 to-blue-800 text-white text-sm font-semibold px-3 rounded-md border-[2px] border-slate-500 flex flex-col items-center justify-center h-9 hover:cursor-pointer hover:bg-blue-950 w-full"
                        onClick={handleSubmit}
                    >
                        Send Data
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CreatePage;

