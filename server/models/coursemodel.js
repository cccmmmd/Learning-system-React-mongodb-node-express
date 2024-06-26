const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseShema = new Schema({
	id: { type: String },
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId, //pk
		ref: "User",
	},
	students: {
		type: [String],
		default: [],
	},
});

module.exports = mongoose.model("Course", courseShema);
