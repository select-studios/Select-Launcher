import { Response, Request } from "express";
import * as bcrypt from "bcrypt";
import { User } from "../../../../models";

export const forgotPass = (req: Request, res: Response) => {
  const { id, newPass } = req.query;

  console.log(id, newPass);

  bcrypt.hash(newPass.toString(), 10, async (err, hash) => {
    if (err) return res.status(500).send({ error: "Server issue. " + err });

    await User.findByIdAndUpdate(id, { password: hash }).then((user) => {
      return res
        .status(201)
        .send({ success: true, msg: "Password changed successfully.", user });
    });
  });
};
