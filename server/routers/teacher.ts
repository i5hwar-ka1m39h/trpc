import { router, publicProcedure } from "../trpc";
import z from 'zod';
import  jwt  from "jsonwebtoken";
import { SECRET } from "..";


export const teacherRouter = router({
  signUPteacher: publicProcedure
  .input(z.object({email: z.string(), password: z.string()}))
  .mutation(async(opts)=>{
    let email = opts.input.email;
    let password = opts.input.password;
    let response = await opts.ctx.db.Teacher.insertMany([{email: email, password: password}])
    let userId = response[0]._id;
    const token = jwt.sign({userId: userId}, SECRET, {expiresIn: '24hr'})

    return {
      token
    }
  })
})
