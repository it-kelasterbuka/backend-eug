import exppress from "express";
import {
    getComic,
    createComic,
    getComicById,
    updateComic,
    deleteComic
} from "../controllers/ComicControllers.js";

const router = exppress.Router();

router.get('/comic', getComic);
router.get('/comic/:id', getComicById);
router.post('/comic', createComic);
router.put('/comic/:id', updateComic);
router.delete('/comic/:id', deleteComic);

export default router;