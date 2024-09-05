import exppress from "express";
import {
    getMahasiswa, getMahasiswaById, createMahasiswa, updateMahasiswa,
    deleteMahasiswa
} from "../controllers/MahasiswaControllers.js";

const router = exppress.Router();

router.get('/mhs', getMahasiswa);
router.get('/mhs/:id', getMahasiswaById);
router.post('/mhs', createMahasiswa);
router.put('/mhs/:id', updateMahasiswa);
router.delete('/mhs/:id', deleteMahasiswa)

export default router;