export const initialNodes=[
    {
        id:"1",
        type:"node",
        data:{heading:"Send Message", content:"Test Message 1"},
        position:{x:50, y:500}

    },
    {
        id:"2",
        type:"node",
        data:{heading:"Send Message", content:"Test Message 2"},
        position:{x:200, y:100}

    }
]

export const initialEdges=[
    { id:"e1-2", source:"1", target:"2" }
]