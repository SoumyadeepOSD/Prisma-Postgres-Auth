import { yupResolver } from "@hookform/resolvers/yup";
import TableComponent from "../components/table";
import { Plus } from "lucide-react";
import getTagData from "../utils/fetchData.js";
import useSubmit from "../utils/useSubmit";
import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { AppContext } from "../context/appContext.js";


const schema = yup.object().shape({
    tag: yup.string()
        .required('Tag name is required'),
    values: yup.array()
        .of(yup.string()) 
        .required('Values are required')
        .default([]),
});


const CreatePage = () => {
    const [name, setName] = useState("");
    const [valueType, setValueType] = useState("text");
    const [textValue, setTextValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const {userInfo, setTags} = useContext(AppContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const toggleChange = () => {
        setValueType(valueType === "text" ? "dropdown" : "text");
    };

    
    const handleToogle = () => {
        setIsOpen((isOpen) => !isOpen);
    }
    
    const fetchData = async () => {
        if (userInfo) {
            const tags = await getTagData({ id: userInfo?.id });
            setTags(tags);
        }
    };

    const { handleSubmitData } = useSubmit(fetchData, handleToogle);

    return (
        <div className={`flex flex-row items-center justify-center w-full h-screen relative ${isOpen ? "bg-slate-800 z-0" : ""}`}>
            <div className={`${isOpen ? "flex z-20" : "hidden"} flex-col items-center justify-center absolute`}>
                <form
                    className="flex flex-col items-center justify-center border-2 border-slate-500 w-[400px] h-[60%] py-5 mt-10 rounded-xl bg-white"
                    onSubmit={handleSubmit(handleSubmitData)}
                >
                    <div className="flex flex-col items-start justify-center w-full px-5">
                        <label className="font-semibold text-sm text-black">Field Name</label>
                        <input
                            {...register("tag")}
                            className="border-2 border-slate-500 rounded-lg w-full h-[50px] text-black text-xl px-5"
                            value={name}
                            aria-invalid={errors.tag ? "true" : "false"}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.tag && (
                            <p className="text-red-600" role="alert">{errors.tag.message}</p>
                        )}
                    </div>
                    <div className="flex flex-row items-center gap-5 text-black">
                        <span className="flex flex-row gap-3 items-center">
                            <label className="text-black text-sm font-semibold">Dropdown</label>
                            <input
                                className="my-5 text-black"
                                type="radio"
                                checked={valueType === "dropdown"}
                                onChange={toggleChange}
                            />
                        </span>

                        <span className="flex flex-row gap-3 items-center">
                            <label className="text-black text-sm font-semibold">Text</label>
                            <input
                                className="my-5 text-black"
                                type="radio"
                                checked={valueType === "text"}
                                onChange={toggleChange}
                            />

                        </span>
                    </div>
                    {valueType === "dropdown" && (
                        <div className="flex flex-col items-start justify-center w-full px-5">
                            <label className="font-semibold text-sm text-black">Add Value</label>
                            <input
                                {...register("values")}
                                className="border-2 border-slate-500 rounded-lg w-full h-[50px] text-black text-xl px-5"
                                value={textValue}
                                type="text"
                                aria-invalid={errors.values ? "true" : "false"}
                                onChange={(e) => setTextValue(e.target.value)}
                            />
                            {errors.tag && (
                                <p className="text-red-600" role="alert">{errors.values.message}</p>
                            )}
                        </div>
                    )}
                    <div className="flex flex-row items-center justify-evenly w-[400px] mt-5">

                        <button
                            className="text-white bg-black px-5 py-2 rounded-2xl hover:bg-slate-700 hover:text-slate-300"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            className="text-white bg-red-500 px-5 py-2 rounded-2xl hover:bg-red-700 hover:text-slate-300"
                            onClick={handleToogle}
                        >
                            Cancel
                        </button>
                    </div>
                    {
                        JSON.stringify({
                            name,
                            textValue,
                        })
                    }
                </form>
            </div>
            {/* </div> */}
            <div className="text-black">
                {!isOpen && <div className="flex flex-row items-center justify-start gap-3">
                <button
                    className="text-white bg-black px-5 py-2 rounded-2xl hover:bg-slate-700 hover:text-slate-300 flex flex-row items-center justify-center gap-3"
                    onClick={handleToogle}
                >
                    Create
                    <Plus color="white"/>
                </button>
                </div>}
                <div className={`${isOpen ? "blur-md" : "blur-none"}`}>
                <TableComponent fetchData={fetchData}/>
                </div>
            </div>
            
        </div>
    );
};

export default CreatePage;

