import React from 'react'

const EditMessage = ({ textRef, nodeName, setNodeName }) => {
  return (
    <div className="flex text-black items-center flex-col w-full h-full">
      <div className='flex text-gray-300'>Message</div>
      <div>
      <label>Text</label>
      <textarea
        className='flex p-[2px]'
        ref={textRef}
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
      />
      </div>
    </div>
  )
}

export default EditMessage;

