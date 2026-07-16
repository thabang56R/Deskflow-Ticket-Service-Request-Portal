const {body}=require("express-validator");

exports.createTicketValidation=[

body("title")
.notEmpty()
.withMessage("Title is required"),

body("description")
.notEmpty()
.withMessage("Description is required"),

body("priority")
.optional()
.isIn(["Low","Medium","High","Critical"]),

body("category")
.optional()
.isIn([
"Hardware",
"Software",
"Network",
"Email",
"Other"
])

];