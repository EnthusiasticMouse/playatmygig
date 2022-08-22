import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from "../../../../utils/lib/withSession";
import executeQuery from '../../../../utils/db';

export default withSessionRoute(publish);

async function publish(req: NextApiRequest, res: NextApiResponse){
  const boolean = req.query.boolean as string;
  const newBool = parseInt(boolean) === 1 ? 0 : 1;
  if(req.session.user){
    //await executeQuery(`update tblUsers set published = '${newBool}' where userID = ${req.session.user.id}`);
    await executeQuery({
      sql: "update tblUsers set published = '?' where userID = ?",
      timeout: 10000,
      values: [newBool.toString(),req.session.user.id.toString()]
    }) as {username: string,displayName: string}[];
  }
  res.redirect("/profile");
}
