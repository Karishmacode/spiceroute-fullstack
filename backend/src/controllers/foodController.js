import Food from "../models/Food.js";

export const getFoods = async (req, res) => {
  try {
    const { limit, category, search } = req.query;

    const query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    let foodsQuery = Food.find(query).sort({
      createdAt: -1,
    });

    const limitNumber = Number(limit);

    if (limit && !isNaN(limitNumber) && limitNumber > 0) {
      foodsQuery = foodsQuery.limit(limitNumber);
    }

    const foods = await foodsQuery;

    res.status(200).json(foods);
  } catch (error) {
    console.log("Get foods error:", error.message);

    res.status(500).json({
      message: "Failed to fetch foods",
      error: error.message,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    console.log("Update food error:", error.message);

    res.status(500).json({
      message: "Failed to update food",
      error: error.message,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.log("Delete food error:", error.message);

    res.status(500).json({
      message: "Failed to delete food",
      error: error.message,
    });
  }
};


export const createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    console.log("Create food error:", error.message);

    res.status(500).json({
      message: "Failed to add food",
      error: error.message,
    });
  }
};