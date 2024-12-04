import React, { useContext, useState } from "react";
import { XCircle, Plus } from "lucide-react";
import { AppContext } from "../context/appContext";

const SelectPage = () => {
  const [isOpenSidBar, setIsOpenSideBar] = useState(false);
  const { tags } = useContext(AppContext);

  const [addedPairs, setAddedPairs] = useState([]);

  const toogleSidebar = () => setIsOpenSideBar((isOpenSidBar) => !isOpenSidBar);

  const handleAddPair = () => {
    setAddedPairs((prev) => [
      ...prev,
      {
        id: prev.length,
        tag: "", 
        values: [""], 
      },
    ]);
  };

  const handleSelectTag = (id, tag) => {
    setAddedPairs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, tag } : item // Update only the selected pair's tag
      )
    );
  };

  return (
    <div className="text-black mt-5 w-full h-full bg-slate-300 flex flex-col items-center justify-start relative">
      <h1 className={`${isOpenSidBar ? "blur-md" : "blur-none"}`}>SelectPage</h1>
      <button
        className={`bg-blue-400 ${isOpenSidBar ? "blur-md" : "blur-none"}`}
        onClick={toogleSidebar}
      >
        Create
      </button>
      <div className="flex flex-row items-center justify-center relative">
        {isOpenSidBar && (
          <>
            {/* Sidebar */}
            <div className="fixed inset-0 bg-black opacity-50 z-5"></div>
            <div className="bg-red-400 h-[80vh] w-80 z-10 absolute left-1/2 transform -translate-x-1/2 -top-6 rounded-2xl p-3">
              <XCircle
                color="red"
                onClick={toogleSidebar}
                className="hover:cursor-pointer"
              />
              <h1>Sidebar</h1>
              <div className="flex flex-col items-start gap-5 bg-green-400 w-full p-2">
                {addedPairs.map((item, index) => {
                  const selectedTags = addedPairs.map((pair) => pair.tag);
                  const availableTags = tags.filter((t) => !selectedTags.includes(t.tag));
                  console.log("============Available Tags=============");
                
                  console.log(availableTags);

                  console.log("============Selected Tags=============");
                
                  console.log(JSON.stringify(selectedTags));
                  
                  return (
                    <div
                      key={item.id} // Using item.id as the key for uniqueness
                      value={selectedTags[0]}
                      className="flex flex-row items-start justify-center gap-3 w-full"
                    >
                      <select
                        className="w-full"
                        onChange={(e) => handleSelectTag(item.id, e.target.value)} // Update only the selected pair's tag
                      >
                        {availableTags.map((t, i) => (
                          <option key={i} value={t.tag}>
                            {t.tag}
                          </option>
                        ))}
                      </select>
                      <select className="w-full">
                        {item.values.map((val, vindex) => (
                          <option key={vindex}>{val}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={handleAddPair}
              >
                <Plus size={16} /> Add Pair
              </button>
            </div>
          </>
        )}
        <div
          className={`bg-green-400 h-20 w-40 z-0 ${isOpenSidBar ? "blur-md pointer-events-none" : "blur-none"}`}
        >
          Main
        </div>
      </div>
    </div>
  );
};

export default SelectPage;
