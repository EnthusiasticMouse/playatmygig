import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../utils/db';

export default async(req: NextApiRequest, res: NextApiResponse) => {
  const response = await executeQuery(`SELECT displayName,userID,preview,payment,dates from tblUsers WHERE isVenue=1 AND published=1;`);
  res.status(200).json(response);
}