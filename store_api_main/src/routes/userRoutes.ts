import express from "express"
import * as userHandler from "../handlers/userHandler"

const router = express.Router()

router.post('/', userHandler.create);
router.get('/', userHandler.index);
router.get('/:id', userHandler.show)

export default router