import { NextApiHandler } from 'next';
import executeQuery from '../db';
const checkUser = async (profile: any) => {
  try { 
    const result : any = await executeQuery('SELECT * from tblUser where userID =' + profile.id)
    //console.log(result[0])
    if(result[0] === undefined){ // checking if user is registered
      await executeQuery('INSERT INTO tblUser (userID) VALUES(' + profile.id + ')')
    }
    } catch (error){
      console.log(error)
  }
}


export default checkUser;