const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/chapter", async (req, res) => {
	try {
		// Récupérer tous les chapitres avec leurs notes associées
		const chapters = await prisma.chapter.findMany({
			include: {
			  notes: true,
			  plans: {
				include: {
				  item: true
				}
			  }
			}
		  });
		res.json(chapters);
	} catch (error) {
		console.error(error);
		res.status(500).send(
			"Une erreur est survenue lors de la lecture des chapitres"
		);
	}
});

module.exports = router;
