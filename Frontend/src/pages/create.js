import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import useRouter from "../hooks/useRouter";

const CreatePage = () => {
    const { setData } = useContext(AppContext);
    const { navigate } = useRouter();
    const [name, setName] = useState("");
    const [valueType, setValueType] = useState("text");
    const [textValue, setTextValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(""); // State for dropdown value
    const [tags, setTags] = useState([
        {
            id: 1,
            tag: "Role",
            values: ["Admin", "User", "Client"],
        },
        {
            id: 2,
            tag: "Position",
            values: ["Director", "Manager", "Clerk"],
        },
        {
            id: 3,
            tag: "Location",
            values: ["Kolkata", "USA", "Bangalore"],
        },
        {
            id: 4,
            tag: "Company",
            values: ["Google", "Amazon", "Hitachi"],
        },
    ]);

    const toggleChange = () => {
        setValueType(valueType === "text" ? "dropdown" : "text");
    };

    const onAppend = () => {
        if (name.trim() === "") {
            alert("Field name cannot be empty!");
            return;
        }

        if (textValue.trim() === "") {
            alert("Value cannot be empty!");
            return;
        }

        const existingTagIndex = tags.findIndex((tag) => tag.tag === name);

        if (existingTagIndex !== -1) {
            const updatedTags = [...tags];
            const existingTag = updatedTags[existingTagIndex];
            if (!existingTag.values.includes(textValue)) {
                existingTag.values.push(textValue);
            } else {
                alert("This value already exists!");
                return;
            }
            setTags(updatedTags);
        } else {
            setTags([
                ...tags,
                {
                    id: tags.length + 1,
                    tag: name,
                    values: [textValue],
                },
            ]);
        }

        setTextValue("");
    };

    const handleSubmit = () => {
        if (name.trim() === "") {
            alert("Please select a field name.");
            return;
        }

        const dataToSend =
            valueType === "text"
                ? { tag: name, value: textValue.trim() }
                : { tag: name, value: selectedValue };

        if (!dataToSend.value) {
            alert("Please enter or select a value before submitting.");
            return;
        }

        setData(dataToSend);
        navigate("/user-page");
    };

    const filteredValues = tags.filter((item) => item.tag === name);

    return (
        <div className="flex flex-col items-center justify-center bg-black h-screen">
            <h1 className="text-white">Create Form</h1>
            <div className="border-2 border-slate-700 rounded-lg h-[50%] w-[30%] mt-5 flex flex-col items-start pl-3 justify-start">
                <label className="text-white">Field Name</label>
                <input
                    className="my-5 px-3 text-black h-8"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex flex-row items-center gap-5 text-black">
                    <span className="flex flex-row gap-3 items-center">
                        <label className="text-white">Dropdown</label>
                        <input
                            className="my-5 text-black"
                            type="radio"
                            checked={valueType === "dropdown"}
                            onChange={toggleChange}
                        />
                    </span>

                    <span className="flex flex-row gap-3 items-center">
                        <label className="text-white">Text</label>
                        <input
                            className="my-5 text-black"
                            type="radio"
                            checked={valueType === "text"}
                            onChange={toggleChange}
                        />
                    </span>
                </div>
                {valueType === "text" ? (
                    <div className="w-[90%]">
                        <label className="text-white">Add Value</label>
                        <div className="flex flex-row items-start gap-2">
                            <input
                                className="text-black px-3 w-[60%] h-8"
                                type="text"
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                            />
                            <button
                                className="bg-blue-500 text-white px-3 py-1"
                                onClick={onAppend}
                            >
                                Append
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-[90%]">
                        <label className="text-white">Select Value</label>
                        <select
                            className="w-[90%] text-black px-3"
                            value={selectedValue}
                            onChange={(e) => setSelectedValue(e.target.value)}
                        >
                            <option value="">Select an option</option>
                            {filteredValues.length > 0 &&
                                filteredValues[0].values.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                <div className="flex flex-col items-center w-full mt-5">
                    <button
                        className="bg-blue-500 text-white px-3 py-1"
                        onClick={handleSubmit}
                    >
                        Send Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;


// 
// model Tag {
//     id     Int      @id @default(autoincrement())
//     tag    String   @unique 
//     values TagValue[] 
//   }
  
//   model TagValue {
//     id    Int    @id @default(autoincrement())
//     value String 
//     tagId Int    
//     tag   Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)
//   }
