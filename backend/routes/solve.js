import express from "express";
import { getSolution } from "../services/aiService.js";
import { cleanJSON } from "../utils/cleanJson.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem || problem.length < 5) {
      return res.status(400).json({
        error: "Enter valid problem"
      });
    }

    const aiResponse = await getSolution(problem);

    const parsed = cleanJSON(aiResponse);

    res.json({ data: parsed });

  } catch (err) {
    console.error("AI Service Error:", err?.response?.data || err.message || err);
    res.status(500).json({
      error: err?.response?.data?.error?.message || err.message || "Server error"
    });
  }
});

export default router;
