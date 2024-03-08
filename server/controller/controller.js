const express =require('express')
const router = express.Router()
const  chapter= require('./chapter.route')
const plan =require('./plan.route')
const deleteRouterChapter= require('./delete.chapter')

router.use(chapter)
router.use(plan)
router.use(deleteRouterChapter)


module.exports= router;