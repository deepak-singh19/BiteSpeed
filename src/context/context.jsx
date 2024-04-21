import React, { createContext, useContext, useState, useRef } from 'react';

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const reactFlowWrapper = useRef(null);
    const textRef = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
  
    return (
      <AppContext.Provider
        value={{
          reactFlowWrapper,
          textRef,
          reactFlowInstance,
          setReactFlowInstance,
          selectedNode,
          setSelectedNode,
          isSelected,
          setIsSelected
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };

  export const useAppContext = () => useContext(AppContext);
  