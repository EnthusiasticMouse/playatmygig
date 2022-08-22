import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../utils/db';
import { withSessionRoute } from "../../../utils/lib/withSession";

const User = async(req: NextApiRequest, res: NextApiResponse) => {
  if (req.session.user !== undefined) {
  const userID = req.session.user.id;
  //const response = await executeQuery('SELECT username,displayName from tblUsers where userID ='+ userID);
  const response = await executeQuery({
    sql: "SELECT username,displayName from tblUsers where userID = ?",
    timeout: 10000,
    values: [userID.toString()]
  }) as {username: string,displayName: string}[];
  res.json(response);
  }
}
export default withSessionRoute(User);