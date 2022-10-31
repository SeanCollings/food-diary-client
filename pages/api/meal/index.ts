import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest<T extends unknown> extends NextApiRequest {
  query: {
    date: string;
  };
  body: T;
}
interface IResponse {
  ok: boolean;
  message?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    if (req.method === 'POST') {
      const { date } = req.query;
      console.log('POST MEAL:', date, req.body);

      return res.status(201).json({ ok: true });
    }

    if (req.method === 'PUT') {
      const { date } = req.query;
      console.log('PUT MEAL:', date, req.body);

      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const { date } = req.query;
      console.log('DELETE MEAL:', date, req.body);

      return res.status(200).json({ ok: true });
    }
  } catch (err) {
    return res.status(500).json({ ok: false, message: (err as Error).message });
  }

  return;
};

export default handler;
