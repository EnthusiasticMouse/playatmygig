import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../utils/db';

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const response = await executeQuery('SELECT displayName,userID,preview from tblUsers WHERE isVenue=0;');
  res.status(200).json(response);
}