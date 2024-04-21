import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import "../css/customNode.css"
import 'reactflow/dist/style.css';

const Node = ({ data, selected }) => {
//   let customTitle = { ...style.title };
//   customTitle.backgroundColor = "#08c9bd";

  return (
    <div className="text-updater-node">
      <div className={`${selected?"node-selected":""}`}>
        <div className="custom-node-title">{data.heading}</div>
        <div className="contentWrapper">{data.content}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(Node);

//style={style.contentWrapper}
//style={{ ...style.body, ...(selected ? style.selected : []) }}
//style={customTitle} 