import React, { useContext } from 'react'
import { AppContext } from '../context/appContext'

const UserPage = () => {
    const {data} = useContext(AppContext);
  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen">
        <h1 className="text-white">
            Your selected data:
        </h1>
        <div className="text-white">
            {
                JSON.stringify(data)
            }
            {/* {
                data.map((item, index)=>{
                    return(
                        <div key={index|item.id} className="text-white my-5">
                            <p className="font-bold">{item.tag}</p>
                            <div className="flex flex-row gap-2">
                            {
                                item.values.map((v, i)=>{
                                    return(
                                        <p key={i} className="bg-cyan-900 px-5 py-1 rounded-2xl">{v}</p>
                                    )
                                })
                                
                            }
                            </div>
                        </div>
                    )
                })
            } */}
        </div>
    </div>
  )
}

export default UserPage