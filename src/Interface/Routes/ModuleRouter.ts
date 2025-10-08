import { Router } from "express";
import ModuleController from "../Controllers/ModuleController";
import ModuleService from "../../Application/Services/ModuleService";
import ModuleRepository from "../../Infrastructure/Database/Repositories/ModuleRepository";

const router = Router();

const moduleRepository = new ModuleRepository();
const moduleService = new ModuleService(moduleRepository);
const moduleController = new ModuleController(moduleService);

router.get('/', moduleController.getAll);

export default router;