const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/add-chapter", async (req, res) => {
	try {
		const { name, status, date } = req.body;

		// console.log(req.body);
		// if (!name || !status || !date) {
		// 	return res.status(400).json({ error: "Invalid data" });
		// }

		const newChapter = await prisma.chapter.create({
			data: {
				name,
				date,
				status: true, // Assuming you want to set status as true by default
			},
		});

		res.status(201).json(newChapter);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});


module.exports = router;

