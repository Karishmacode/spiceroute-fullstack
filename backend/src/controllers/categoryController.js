import Category from "../models/Category.js";
import Food from "../models/Food.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: 1,
    });

    const totalFoods = await Food.countDocuments();

    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        let itemsCount = 0;

        if (category.name === "All") {
          itemsCount = totalFoods;
        } else {
          itemsCount = await Food.countDocuments({
            category: category.name,
          });
        }

        return {
          ...category.toObject(),
          items: itemsCount,
        };
      })
    );

    res.status(200).json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add category",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update category",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
      error: error.message,
    });
  }
};