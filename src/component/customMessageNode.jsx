import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import "../css/customNode.css"
import 'reactflow/dist/style.css';
import { AiOutlineMessage } from "react-icons/ai";


const Node = ({ data, selected }) => {

  return (
    <div className="flex border-2">
      <div className={`${selected?"node-selected":""}`}>
        <div className="custom-node-title flex flex-row w-full justify-center items-center gap-2 bg-[#25D366] px-4 py-2">
          <AiOutlineMessage />
          {data.heading}
          </div>
        <div className="contentWrapper">{data.content}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(Node);

