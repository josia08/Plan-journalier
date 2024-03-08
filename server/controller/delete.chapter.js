const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


router.post('/delete-all-links', async (req, res) => {
    const { id } = req.body;

    console.log(id);

    try {
        // Supprime tous les liens associés au chapitre
        await prisma.notes.deleteMany({
            where: {
                chapterId: id,
            },
        });

        await prisma.items.deleteMany({
            where: {
                plan: {
                    chapterId: id,
                },
            },
        });
        await prisma.plan.deleteMany({
            where: {
                chapterId: id,
            },
        });
       
        // Ajoutez d'autres lignes de suppression pour d'autres types de liens

        // Enfin, supprimez le chapitre lui-même
        await prisma.chapter.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'All links and chapter deleted successfully' });
    } catch (error) {
        console.error('Error deleting chapter links:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
