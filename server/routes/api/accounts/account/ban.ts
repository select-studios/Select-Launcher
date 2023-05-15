import { User } from "../../../../models";

export const banAccount = (req, res) => {
  const { pass, id } = req.query;
  const idStr = id?.toString();
  const passStr = pass?.toString();

  if (!passStr || !passStr.length) return res.status(403);
  if (!idStr || !idStr.length) return res.status(400);

  if (passStr === process.env.ADMIN_SECRET) {
    User.findByIdAndUpdate(idStr, { banned: true })
      .then((user) => {
        return res.status(201).send({ success: true, user });
      })
      .catch((err) => res.status(500).send({ error: err }));
  }
};
