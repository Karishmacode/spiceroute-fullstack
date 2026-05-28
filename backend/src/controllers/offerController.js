import Offer from "../models/Offer.js";

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch offers",
      error: error.message,
    });
  }
};

export const createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);

    res.status(201).json({
      message: "Offer added successfully",
      offer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add offer",
      error: error.message,
    });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({
      message: "Offer updated successfully",
      offer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update offer",
      error: error.message,
    });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete offer",
      error: error.message,
    });
  }
};