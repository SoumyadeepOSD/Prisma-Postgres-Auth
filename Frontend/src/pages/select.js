import { AppContext } from "../context/appContext";
import React, { useContext, useState } from "react";
import { XCircle, Plus } from "lucide-react";

const SelectPage = () => {
  const [isOpenSidBar, setIsOpenSideBar] = useState(false);
  const { tags } = useContext(AppContext);
  const temp = {
    tag: null,
    values: [""],
  }
  const [addedPairs, setAddedPairs] = useState([{...temp}]);

  const toggleSidebar = () => setIsOpenSideBar((prev) => !prev);

  const handleAddPair = () => {
    setAddedPairs((prev) => [
      ...prev,
      {...temp}
    ]);
  };

  const handleSelectTag = (index, value, propName) => {
    console.log(value)
  setAddedPairs((spans) => {
    const parsedData = JSON.parse(value)
    spans[index][propName] = {
      id: parsedData.id,
      tagName: parsedData.tagName
    }
    return [...spans]
} )
};

  console.log("==============Added Pairs================");
  console.log(addedPairs);

  return (
    <div className="text-black mt-5 w-full h-full bg-slate-300 flex flex-col items-center justify-start relative">
      <h1 className={`${isOpenSidBar ? "blur-md" : "blur-none"}`}>SelectPage</h1>
      <button
        className={`bg-blue-400 ${isOpenSidBar ? "blur-md" : "blur-none"}`}
        onClick={toggleSidebar}
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
                onClick={toggleSidebar}
                className="hover:cursor-pointer"
              />
              <h1>Sidebar</h1>
              <div className="flex flex-col items-start gap-5 bg-green-400 w-full p-2">
                {addedPairs.map((item, index) => {
                  return (
                    <div key={item.id} className="flex flex-row items-start justify-center gap-3 w-full">
                      <select
                        className="w-full"
                        value={JSON.stringify(item.tag)} 
                        aria-label={item.tag}
                        onChange={(e) => handleSelectTag(index, e.target.value, 'tag')} 
                      >
                        <option value="" disabled>Select a tag</option>
                        {tags.map((t, i) => {
                          return (
                            <option key={t.id} value={JSON.stringify({
                              id:t.id,
                              tagName: t.tag
                            })}>
                              {t.tag}
                            </option>
                          )
                        })}
                      </select>
                      <select 
                        className="w-full"
                      >
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