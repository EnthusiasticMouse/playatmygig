import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from "../../../utils/lib/withSession";
import executeQuery from '../../../utils/db';
import bcrypt from 'bcrypt';
export default withSessionRoute(loginRoute);
interface login{
  userID: number;
  username: string;
  password: string;
}
async function loginRoute(req : NextApiRequest,res :NextApiResponse) {
  const result = await executeQuery({
    sql: "SELECT userID,password from tblUsers where username = ?",
    timeout: 10000,
    values: [req.body.username]
  }) as login[];

  if(result[0] === undefined){
    res.redirect('/?error=User not found&text=signup');
  }else{
    const hash = result[0].password;
    const compare = await bcrypt.compare(req.body.password, hash); 

    if(compare){
      req.session.user = {
        id: result[0].userID,
        admin: true,
      };
      await req.session.save();
      res.redirect("/")
    }else{
      res.redirect('/?error=User not found&text=signup');
    }
  }
}