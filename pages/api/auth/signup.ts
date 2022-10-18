import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return;
    }

    const data = req.body;

    const { email, password } = data;

    const existingUser = await Promise.resolve(false);

    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    const result = await Promise.resolve({ user: { name: 'Name Surname' } });

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export default handler;
