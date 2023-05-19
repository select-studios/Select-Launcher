import * as fetch from "node-fetch";
import { User } from "../../../../models";

export const banAccount = (req, res) => {
  const reqUser = req.user;
  const { id, reason } = req.body;

  if (reqUser.moderator) {
    User.findByIdAndUpdate(
      id,
      { banned: true, banReason: reason },
      { new: true, upsert: true }
    )
      .then((user) => {
        fetch("http://localhost:6969/postBan", {
          method: "POST",
          headers: {
            Authorization: `Bearer ssadmin12345`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        return res.status(201).send({ success: true, user });
      })
      .catch((err) => res.status(500).send({ error: err }));
  } else {
    return res.status(403).send({ error: "Unauthorized. Invalid request." });
  }
};
