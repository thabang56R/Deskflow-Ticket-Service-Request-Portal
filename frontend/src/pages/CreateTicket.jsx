import {useState} from "react";

import api from "../api/api";

export default function CreateTicket(){

const[title,setTitle]=useState("");

const[description,setDescription]=useState("");

const submit=async(e)=>{

e.preventDefault();

await api.post("/tickets",{

title,

description

});

alert("Ticket Created");

};

return(

<form onSubmit={submit}>

<input

placeholder="Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>

<textarea

placeholder="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

/>

<button>

Create

</button>

</form>

);

}