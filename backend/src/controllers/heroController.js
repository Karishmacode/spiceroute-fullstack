import Hero from "../models/Hero.js";

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hero" });
  }
};