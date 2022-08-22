import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from "../../../utils/lib/withSession";
import executeQuery from '../../../utils/db';
import bcrypt from 'bcrypt';
export default withSessionRoute(signupRoute);

async function signupRoute(req : NextApiRequest,res :NextApiResponse) {
  // get user from database then:
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)
  await executeQuery({
    sql: "INSERT INTO tblUsers (username,password) VALUES (?,?)",
    timeout: 10000,
    values: [req.body.username,hash]
  });
  res.redirect('/?success=User created&text=signup')
}