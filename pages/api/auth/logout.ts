import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from "../../../utils/lib/withSession";

export default withSessionRoute(
  async function logoutRoute(req : NextApiRequest,res :NextApiResponse) {
    req.session.destroy();
    res.redirect("/");
  }
);