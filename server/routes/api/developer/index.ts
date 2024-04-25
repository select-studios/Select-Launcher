import { Router } from "express";
import { Developer } from "../../../models/developer";

const developerRouter = Router();

developerRouter.post("/add", async (req, res) => {
  const { name } = req.body;

  const devDoc = await Developer.findOneAndUpdate(
    { name },
    { name },
    { upsert: true, new: true }
  );
  devDoc.save().then((doc) => {
    res.status(201).json({ success: true, doc });
  });
});

export default developerRouter;
