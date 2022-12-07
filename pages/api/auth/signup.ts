import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    name: string;
    token: string;
  };
}

const handler = async (req: IRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return;
    }

    const { data } = await axios.post(
      `${process.env.SERVER_HOST}/auth/signup`,
      req.body
    );

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export default handler;
