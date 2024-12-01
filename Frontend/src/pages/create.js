import { yupResolver } from "@hookform/resolvers/yup";
import useSubmit from "../utils/useSubmit";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as yup from "yup";


const schema = yup.object().shape({
    tag: yup.string()
        .required('Tag name is required'),
    values: yup.string()
        .required('Values are required'),
});


const CreatePage = () => {
    const [name, setName] = useState("");
    const [valueType, setValueType] = useState("text");
    const [textValue, setTextValue] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const toggleChange = () => {
        setValueType(valueType === "text" ? "dropdown" : "text");
    };

    const { handleSubmitData } = useSubmit();

    return (
        <div className="flex flex-col items-center justify-center bg-red-300 w-full h-screen">
            <h1 className="text-[60px] font-bold text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text">Create Form</h1>
            {/* <div className=" bg-gradient-to-br from-slate-800 to-slate-300 rounded-xl w-[30%] h-[50%]"> */}
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
                <div className="flex flex-col items-center w-[400px] mt-5">
                    <button
                        className="text-white bg-blue-800 hover:bg-blue-900 px-16 rounded-xl py-2 mx-auto mt-5"
                        onClick={handleSubmit}
                    >
                        Send Data
                    </button>
                </div>
                {
                    JSON.stringify({
                        name,
                        textValue,
                    })
                }
            </form>
            {/* </div> */}
        </div>
    );
};

export default CreatePage;

