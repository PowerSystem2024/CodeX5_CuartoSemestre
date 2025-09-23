import { Router } from "express";   
import{ crearTarea, eliminarTarea, listarTarea } from "../controllers/tareas.controller.js";
import { act } from "react";

const router = Router();

router.get("tareas/", listarTarea);

router.get('/tareas/ id', listarTarea);

router.post('/tareas', crearTarea );

router.put('/tareas/:id', actualizarTarea );

router.delete('/tareas/:id', eliminarTarea );



export default router;