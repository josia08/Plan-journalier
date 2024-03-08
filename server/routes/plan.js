const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/plans/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const plans = await prisma.plan.findMany({
        where: {
            chapterId: parseInt(id),
        },
        include: {
            item: true,
        },
    });
    res.status(200).json(plans);
  } catch (error) {
      console.error('Error fetching plans for chapter:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router