import mongoose, { mongo } from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userId: String,
  email: String,
  name: String,
  password: String,
  courseMADE: [{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
})


const studentSchema = new mongoose.Schema({
  userId: String,
  email: String,
  name: String,
  password: String,
  courseSUB: [{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
})

const courseSchema = new mongoose.Schema({
  uniqueID: String,
  title: String,
  description: String,
  price: Number,
  teacherID:{type:mongoose.Schema.Types.ObjectId, ref:'Teacher'},
  studentSUB:[{type: mongoose.Schema.Types.ObjectId, ref:'Student'}]
})


export const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);