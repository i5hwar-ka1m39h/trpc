import { resolve } from 'path';
import { router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import jwt from 'jsonwebtoken';
import { Course, Student, Teacher } from './db';
import mongoose from 'mongoose';
import cors from 'cors';
import { teacherRouter } from './routers/teacher';
import { studentRouter } from './routers/student';
export const SECRET = "secret"


mongoose.connect("mongodb://127.0.0.1:27017/trpcDB")



 
const appRouter = router({
  // ...
  teacher: teacherRouter,
  student: studentRouter
});
 



 

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext(opts){
    let authHeader = opts.req.headers['authorization'];

    if(authHeader){
      let token = authHeader.split(' ')[1]
      console.log(token);
      return new Promise<{db:{Teacher: typeof Teacher, Student: typeof Student, Course: typeof Course}, userId?: string}>((resolve)=>{
        jwt.verify(token, SECRET, (err, user)=>{
          if(user){
            //@ts-ignore
            resolve({userId: user.userId as string, db:{Teacher, Student, Course}})
          }else{
            resolve({db:{Teacher, Student, Course}})
          }
        } )
      })
    }

    return { db: {Teacher, Student, Course}}
  }
});

server.listen(3000);