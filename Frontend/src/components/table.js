import axios from "axios";
import { SquarePen, Trash2Icon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const TableComponent = ({ tags }) => {
    const [editableIndex, setEditableIndex] = useState(null);  // Track the index of the editable row
    const [updatedTag, setUpdatedTag] = useState("");  // State to store the updated tag
    const [updatedValues, setUpdatedValues] = useState([]);  // State to store the updated values

    const editTag = async ({ id, tag, values }) => {
        try {
            const bodyPayload = { id, tag, values };
            const response = await axios.put(
                "http://localhost:5000/api/tag/tag-edit",
                bodyPayload,
                { headers: { "Content-Type": "application/json","Access-Control-Allow-Origin": "*", } }
            );
            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            console.log("Protected Data:", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTag = async({ id }) => {
        try {
            // const bodyPayload = { id };
            const response = await axios.delete(
                `http://localhost:5000/api/tag/tag-delete/${id}`,
                // bodyPayload,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status !== 200) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            console.log("Protected Data:", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative overflow-x-auto my-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Tag
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sub-Tags
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Edit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((item, index) => {
                        const isRowEditable = editableIndex === index;
                        return (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={item.id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {isRowEditable ? (
                                        <input
                                            type="text"
                                            value={updatedTag}
                                            onChange={(e) => setUpdatedTag(e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-black"
                                        />
                                    ) : (
                                        item.tag
                                    )}
                                </th>
                                <td className="px-6 py-4 flex flex-row items-center justify-start gap-2 overflow-x-auto">
                                    {isRowEditable ? (
                                        <input
                                            value={updatedValues.join(", ")}
                                            onChange={(e) => setUpdatedValues(e.target.value.split(", "))}
                                            className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                        />
                                    ) : (
                                        item.values.join(", ")
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {isRowEditable ? (
                                        <CheckCircle2
                                            color="green"
                                            onClick={() => {
                                                editTag({ id: item.id, tag: updatedTag, values: updatedValues });
                                                setEditableIndex(null); // Disable editing after submitting
                                            }}
                                            className="hover:cursor-pointer"
                                        />
                                    ) : (
                                        <SquarePen
                                            color="white"
                                            onClick={() => {
                                                setEditableIndex(index); // Enable editing for this row
                                                setUpdatedTag(item.tag); // Initialize with existing tag name
                                                setUpdatedValues(item.values); // Initialize with existing values
                                            }}
                                            className="hover:cursor-pointer"
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <Trash2Icon 
                                        color="red" 
                                        onClick={() => deleteTag({ id: item.id })} 
                                        className="hover:cursor-pointer"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
