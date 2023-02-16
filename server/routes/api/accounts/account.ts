const account = async (req: any, res: any) => {
  return res.status(201).json({ success: true, user: req.user });
};

export { account };
