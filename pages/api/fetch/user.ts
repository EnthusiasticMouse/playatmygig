import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../utils/db';
import { withSessionRoute } from "../../../utils/lib/withSession";

const User = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.session.user !== undefined) {
  const userID = req.session.user.id;
  const response = await executeQuery('SELECT username,displayName from tblUsers where userID ='+ userID);
  res.json(response);
  }
}
export default withSessionRoute(User);