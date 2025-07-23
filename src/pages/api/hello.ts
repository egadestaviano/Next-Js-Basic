// pages/api/hello.ts

import type { NextApiRequest, NextApiResponse } from "next";

// Definisi tipe untuk respons
type Data = {
  name: string;
  address: string;
};

// Handler utama
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe", address: "Indonesia" });
}
