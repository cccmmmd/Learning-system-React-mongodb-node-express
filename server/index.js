const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes").auth

dotenv.config();

mongoose
	.connect(
		"mongodb+srv://ultrabarbie:nICyxPlnpYKoKf4r@cluster0.l32dv3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => {
		console.log("db is connected...");
	})
	.catch((e) => {
		console.log(e);
	});

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use("/api/user", authRoute)

app.listen(8080, () => {
	console.log("server at 8080 ...");
});
