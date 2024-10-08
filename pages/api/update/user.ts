import type { NextApiRequest, NextApiResponse } from 'next'
import executeQuery from '../../../utils/db';
import { withSessionRoute } from "../../../utils/lib/withSession";

const User = async(req: NextApiRequest, res: NextApiResponse) => {
  console.log("username:")
  console.log(req.body.username)
  console.log("displayName:")
  console.log(JSON.stringify(req.body.displayName))
  if (req.session.user !== undefined && req.method === 'POST') {
    if(req.body.username !== ""){
      //await executeQuery("update tblUsers set username ='"+req.body.username+"' where userID = "+req.session.user.id);
      await executeQuery({
        sql: "update tblUsers set username =? where userID = ?",
        timeout: 10000,
        values: [req.body.username,req.session.user.id.toString()]
      });
    }if(req.body.displayName !== ""){
      //await executeQuery("update tblUsers set displayName ='"+req.body.displayName+"' where userID = "+req.session.user.id);
      await executeQuery({
        sql: "update tblUsers set displayName =? where userID = ?",
        timeout: 10000,
        values: [req.body.displayName,req.session.user.id.toString()]
      });
    }if(req.body.description){
      //await executeQuery(`update tblUsers set description ='${req.body.description}' where userID = ${req.session.user.id}`)
      await executeQuery({
        sql: "update tblUsers set description =? where userID = ?",
        timeout: 10000,
        values: [req.body.description,req.session.user.id.toString()]
      });
    }if(req.body.payment != "" && req.body.payment != undefined){
      //await executeQuery(`update tblUsers set payment =${req.body.payment} where userID =${req.session.user.id}`);
      await executeQuery({
        sql: "update tblUsers set payment =? where userID = ?",
        timeout: 10000,
        values: [req.body.payment,req.session.user.id.toString()]
      });
    }if(req.body.dates != ""){
      //await executeQuery(`update tblUsers set dates ='${req.body.dates}' where userID =${req.session.user.id}`);
      await executeQuery({
        sql: "update tblUsers set dates =? where userID = ?",
        timeout: 10000,
        values: [req.body.dates,req.session.user.id.toString()]
      });
    }if(req.body.preview != ""){
      //await executeQuery(`update tblUsers set preview ='${req.body.preview}' where userID =${req.session.user.id}`);
      await executeQuery({
        sql: "update preview set username =? where userID = ?",
        timeout: 10000,
        values: [req.body.preview,req.session.user.id.toString()]
      });
    }
    
    res.redirect('/profile');
  }
}
export default withSessionRoute(User);
