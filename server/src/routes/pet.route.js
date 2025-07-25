import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addPet,
  getAllPets,
  recentPets,
  likePets,
  featurePets,
} from "../controllers/pet.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/add-pet").post(verifyJWT, upload.array("images", 5), addPet);
router.route("/petsData").get(verifyJWT, getAllPets);
router.route("/recent").get(verifyJWT, recentPets);
router.route("/featured").get(verifyJWT, featurePets);
router.route("/:petId/like").post(verifyJWT, likePets);

export default router;
