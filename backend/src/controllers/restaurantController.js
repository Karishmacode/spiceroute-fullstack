import Restaurant from "../models/Restaurant.js";
import Food from "../models/Food.js";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({
      createdAt: -1,
    });

    res.json(restaurants);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
};

export const getRestaurantBySlug = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      slug: req.params.slug,
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const foods = await Food.find({
      category: restaurant.category,
    });

    res.json({
      restaurant,
      foods,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurant",
      error: error.message,
    });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant =
      await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update restaurant",
      error: error.message,
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant =
      await Restaurant.findByIdAndDelete(
        req.params.id
      );

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete restaurant",
      error: error.message,
    });
  }
};