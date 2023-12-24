import { initTRPC } from '@trpc/server';
import { Teacher, Student, Course } from './db';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<{db:{Teacher:typeof Teacher,Student: typeof Student, Course: typeof Course}, userId?:string}>().create();
 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;