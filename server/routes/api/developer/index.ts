import { Router } from "express";
import { Developer } from "../../../models/developer";

const developerRouter = Router();

developerRouter.post("/add", async (req, res) => {
  const { developerName } = req.body;

  const devDoc = await Developer.findOneAndUpdate(
    { developerName },
    { developerName, publisherName: developerName },
    { upsert: true, new: true }
  );
  devDoc.save().then((doc) => {
    res.status(201).json({ success: true, doc });
  });
});

export default developerRouter;
