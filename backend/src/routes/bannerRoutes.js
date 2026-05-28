import express from "express";
import {
  getBanners,
  addBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

router.get("/", getBanners);
router.post("/", addBanner);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

export default router;