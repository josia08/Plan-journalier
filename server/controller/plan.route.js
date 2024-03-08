const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/add-plan', async (req, res) => {
    try {
        const { title, plans, id } = req.body;
        console.log(req.body);
    
        // Vérifiez si les données nécessaires sont présentes
        if (!title || !plans || !Array.isArray(plans) || !id) {
          return res.status(400).json({ error: 'Invalid data' });
        }
    
        // Créez le nouveau plan avec les données fournies
        const newPlan = await prisma.plan.create({
            data: {
              title,
              chapterId: parseInt(id),
              item: { create: plans.map((note) => ({ item: note.plan })) },
            },
          });
    
        // Répondez avec les données du nouveau plan créé
        res.status(201).json(newPlan);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });

  module.exports = router;
