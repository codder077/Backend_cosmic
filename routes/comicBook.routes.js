import express from "express";

import { 
    createComicBook,
    updateComicBook,
    deleteComicBook,
    getAllComicBooks,
    getComicBookById
} from "../controllers/comicBook.controller.js";

const router = express.Router();

router.post('/comics',createComicBook); 
router.put('/comics/:id',updateComicBook); 
router.delete('/comics/:id',deleteComicBook); 

router.get('/comics',getAllComicBooks);

router.get('/comics/:id',getComicBookById);

export default router;