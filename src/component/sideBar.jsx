import React from 'react'
import EditMessage from "./editMessage";
import { AiOutlineMessage } from "react-icons/ai";

const SideBar = ({ isSelected, textRef, nodeName, setNodeName }) => {
    const onDragStart = (event, content, nodeType) => {
              event.dataTransfer.setData("application/reactflow", nodeType);
              event.dataTransfer.setData("content", content);
              event.dataTransfer.effectAllowed = "move";
            };
  return (
    <div className='flex w-full h-full'>
         
        {isSelected ? (
          <EditMessage
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
        ) : (
          <div className='flex w-full h-full p-7'>
            <div
            className="flex flex-col items-center justify-center w-[40%] h-[13%] border "
            onDragStart={(event) => onDragStart(event, "message" ,"node")}
            draggable
          >
            <AiOutlineMessage size={20}/>
            Message
          </div>
          </div>
        )}
    </div>
  )
}

export default SideBar
