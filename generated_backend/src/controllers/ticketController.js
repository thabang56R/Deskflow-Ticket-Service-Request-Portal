const Ticket=require("../models/Ticket");

exports.createTicket=async(req,res)=>{

try{

const ticket=await Ticket.create({

title:req.body.title,

description:req.body.description,

priority:req.body.priority,

category:req.body.category,

createdBy:req.user.id

});

res.status(201).json({

success:true,

data:ticket

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.getTickets=async(req,res)=>{

try{

const{

status,

priority,

page=1,

limit=10,

search

}=req.query;

let filter={};

if(status){

filter.status=status;

}

if(priority){

filter.priority=priority;

}

if(search){

filter.title={

$regex:search,

$options:"i"

};

}

if(req.user.role==="employee"){

filter.createdBy=req.user.id;

}

const tickets=await Ticket.find(filter)

.populate("createdBy","name email")

.populate("assignedTo","name")

.skip((page-1)*limit)

.limit(Number(limit))

.sort({

createdAt:-1

});

const total=await Ticket.countDocuments(filter);

res.json({

success:true,

total,

page:Number(page),

pages:Math.ceil(total/limit),

data:tickets

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.getTicket=async(req,res)=>{

try{

const ticket=await Ticket.findById(req.params.id)

.populate("createdBy","name")

.populate("assignedTo","name");

if(!ticket){

return res.status(404).json({

message:"Ticket not found"

});

}

res.json(ticket);

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.updateTicket=async(req,res)=>{

try{

const ticket=await Ticket.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true

}

);

res.json({

success:true,

data:ticket

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.deleteTicket=async(req,res)=>{

try{

await Ticket.findByIdAndDelete(req.params.id);

res.json({

success:true,

message:"Ticket deleted"

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.assignTicket=async(req,res)=>{

try{

const ticket=await Ticket.findById(req.params.id);

ticket.assignedTo=req.body.assignedTo;

ticket.status="In Progress";

await ticket.save();

res.json({

success:true,

data:ticket

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};