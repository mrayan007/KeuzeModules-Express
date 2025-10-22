import { Router } from "express";

import ModuleRepository from "../../Infrastructure/Database/Repositories/ModuleRepository";
import ModuleService from "../../Application/Services/ModuleService";
import ModuleController from "../Controllers/ModuleController";

const router = Router();

const moduleRepository = new ModuleRepository();
const moduleService = new ModuleService(moduleRepository);
const moduleController = new ModuleController(moduleService);

router.get('/', moduleController.GetModules);
router.get('/:id', moduleController.FindModule);

export default router;