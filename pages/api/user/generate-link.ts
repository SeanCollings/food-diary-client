import { createGuid } from '@utils/string-utils';
import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  shareLink: string;
}

const generateShareLink = async () => {
  return {
    shareLink: createGuid(),
  };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  if (req.method === 'POST') {
    console.log('GENERATE LINK POST:', req.body);

    const { shareLink } = await generateShareLink();

    return res.status(201).json({ shareLink });
  }

  return;
};

export default handler;
