import express from "express";

import {
  getRestaurants,
  getRestaurantBySlug,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getRestaurants);

router.get("/:slug", getRestaurantBySlug);

router.put("/:id", updateRestaurant);

router.delete("/:id", deleteRestaurant);

export default router;