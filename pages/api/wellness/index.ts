import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  ok: boolean;
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  if (req.method === 'POST') {
    console.log('WELLNESS POST:', req.body);

    return res.status(201).json({ ok: true });
  }

  return;
};

export default handler;
