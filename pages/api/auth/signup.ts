import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from "../../../lib/withSession";
import executeQuery from '../../../utils/db';
import bcrypt from 'bcrypt';
export default withSessionRoute(signupRoute);

async function signupRoute(req : NextApiRequest,res :NextApiResponse) {
  // get user from database then:
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)
  await executeQuery('INSERT INTO tblUsers (username,password) VALUES ("' + req.body.username+ '","' + hash + '")')
  res.redirect('/?success=User created&text=signup')
}