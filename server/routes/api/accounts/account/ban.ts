import { User } from "../../../../models";

export const banAccount = (req, res) => {
  const { pass, id, reason } = req.query;
  const idStr = id?.toString();
  const passStr = pass?.toString();
  const reasonStr = reason?.toString();

  if (!passStr || !passStr.length) return res.status(403);

  if (passStr === process.env.ADMIN_SECRET) {
    User.findByIdAndUpdate(
      idStr,
      { banned: true, banReason: reasonStr },
      { new: true, upsert: true }
    )
      .then((user) => {
        console.log(user);
        return res.status(201).send({ success: true, user });
      })
      .catch((err) => res.status(500).send({ error: err }));
  }
};
