import { Router } from "express";
import FavoritesController from "../Controllers/FavoritesController";
import FavoritesService from "../../Application/Services/FavoritesService";
import FavoritesRepository from "../../Infrastructure/Database/Repositories/FavoritesRepository";
import AuthenticateUser from "../Middleware/AuthenticateUser";

const router = Router();

const favRepo = new FavoritesRepository();
const favServe = new FavoritesService(favRepo);
const favCont = new FavoritesController(favServe);

router.post('/', AuthenticateUser, favCont.addModule);
router.get('/:email', AuthenticateUser, favCont.getModules);
router.delete('/', AuthenticateUser, favCont.deleteModule);

export default router;