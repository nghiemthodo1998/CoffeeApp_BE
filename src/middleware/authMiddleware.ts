import { Request, Response, NextFunction } from "express";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Thực hiện xác thực token, ví dụ sử dụng JWT hoặc Supabase auth
  // Nếu xác thực thành công
  next();

  // Nếu xác thực thất bại
  // return res.status(401).json({ message: 'Invalid token' });
};
