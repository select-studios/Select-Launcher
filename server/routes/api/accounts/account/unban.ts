import { User } from "../../../../models";

export const unbanAccount = (req, res) => {
  const reqUser = req.user;
  const { id } = req.body;

  if (reqUser.moderator) {
    User.findByIdAndUpdate(id, { banned: false, banReason: "" }, { new: true })
      .then((user) => {
        return res.status(201).send({ success: true, user });
      })
      .catch((err) => res.status(500).send({ error: err }));
  } else {
    return res.status(403).send({ error: "Unauthorized. Invalid request." });
  }
};
