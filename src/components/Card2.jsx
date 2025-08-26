import React from "react";

const data=[
    {
        name : "Amazon",
        desc : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, fuga.",
        inStock : true,
        link: "https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        name : "FlipKart",
        desc : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, fuga.",
        inStock : false,
        link: "https://images.unsplash.com/photo-1601598851547-4302969d0614?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        name : "Myntra",
        desc : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, fuga.",
        inStock : true,
        link: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];
function Card(){
    return (<>
    <div className="flex justify-center items-center h-screen bg-gray-600">
    {data.map((elem,val)=>(
        <div key={val} className="border-2 border-solid  max-w-80 border-gray-400 hover:bg-gray-400/50 hover:scale-105 duration-300  m-5 flex flex-col items-center bg-gray-400/80 text-white rounded-xl">
            <h1 className="p-5">{elem.name}</h1>
            <img className="w-40 h-40 object-cover rounded-sm shadow-xl shadow-gray-700" src={elem.link} alt="wait" />
            <p className="p-5">{elem.desc}</p>
            <button className="px-5 py-3 my-3 bg-gray-800 text-white rounded-xl">{elem.inStock?"Instock":"Out of stock"}</button>
        </div>
    )
    )
    }</div>
    </>)
}

export default Card;