const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");


const userShema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 40,
	},
	role: {
		type: String,
		enum: ["student", "teacher"],
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
},{
	methods:{
		isStudent() {
			return this.role == "student";
		},
		isTeacher(){
			return this.role == "teacher";
		}
	}
}
);

userShema.methods.comparePassword = async function (password, callback) {
	// let result = await bcrypt.compare(password, this.password); //password user input, password in user model
	// return callback(null, result);
	let result;
	try {
		result = await bcrypt.compare(password, this.password); //password user input, password in user model
		return callback(null, result);
	} catch (e) {
		return callback(e, result);
	}
};

//middleware
//if it is a new user or he is changing password then encoding password
userShema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const hashValue = await bcrypt.hash(this.password, 10);
		this.password = bcrypt.hashValue;
	}
	next();
});

module.exports = mongoose.model("User", userShema);
