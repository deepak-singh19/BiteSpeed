import { initialEdges, initialNodes } from "./initialElement"; // Importing initial nodes and edges from another file
import { useCallback, useState, useEffect } from "react"; // Importing useState and useCallback hooks from React
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow"; // Importing ReactFlow component and related functions
import "reactflow/dist/style.css"; // Importing styles for React Flow component
import customMessageNode from "./component/customMessageNode";
import SideBar from "./component/sideBar";
import { useAppContext } from "./context/context";
import { checkConnection } from "./utils/checkConnection";


let id = 0; 
const nodeTypes = { node: customMessageNode };// Custom Node Type
const getId = () => `node_${id++}`;// Generating Node Id

function App() {
  const [nodes, setNodes] = useState(initialNodes); // State hook for managing nodes
  const [edges, setEdges] = useState(initialEdges); // State hook for managing edges
  const [nodeName, setNodeName] = useState("Node 1");// State hook for managing name
  const [text, setText]= useState();
  const [connected, setConnected]= useState(false);

  const { reactFlowWrapper,
    textRef,
    reactFlowInstance,
    setReactFlowInstance,
    selectedNode,
    setSelectedNode,
    isSelected,
    setIsSelected
  } = useAppContext(); 

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("content");
    console.log(reactFlowInstance, "reactIns");
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { heading: "Send Message", content: label }
    };
    setNodes((es) => es.concat(newNode));
    setSelectedNode(newNode.id);
  };

  const connectionHandler = () => {
    if (checkConnection(nodes, edges)){ setText("Congrats its correct"); setConnected(true)}
    else {setText("Cannot Save Flow"); setConnected(false)};
  };

  

  // Callback function to handle changes to nodes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Callback function to handle changes to edges
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Callback function to handle adding a new edge
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);
  useEffect(() => {
    setNodeName(selectedNode?.data?.content || selectedNode);
  }, [selectedNode]);
  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            content: nodeName || " "
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex w-full h-[7%] bg-gray-400 p-2 ">
       <div className="w-2/3  ">
        {text && <span className={`flex justify-center items-center py-1 text-lg font-bold ${connected?'text-green-400':"text-red-400"}`}>
          {text?text:""}
          </span>}
       </div>
       <div className="w-1/3 flex justify-items-end justify-end px-2">
       <button className="flex items-center justify-centers px-[12px] py-[1px]  bg-white rounded-md" onClick={connectionHandler}>Save</button>

       </div>
      </div>
      
      <div className="flex w-full h-full">
        <ReactFlowProvider>
          <div className="flex w-full h-full">
            <div className="flex w-4/5" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes} // Pass nodes state to ReactFlow component
                edges={edges} // Pass edges state to ReactFlow component
                onNodesChange={onNodesChange} // Handle node changes
                onEdgesChange={onEdgesChange} // Handle edge changes
                onConnect={onConnect} // Handle edge connection
                nodeTypes={nodeTypes}
                onInit={onInit}
                onDrop={onDrop}
                onDragOver={onDragOver}
                attributionPosition="top-right"
                        
              >
              <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
            <div className="flex w-1/5">
            <SideBar isSelected={isSelected}
                textRef={textRef}
                nodeName={nodeName}
                setNodeName={setNodeName}/>
            </div>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
