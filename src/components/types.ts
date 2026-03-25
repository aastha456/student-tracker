 // type define for gender
 export type Gender = "Male" | "Female" | "Other"
 //interface define for student
 export interface Student {
  _id: string;
  name: string;
  grade: string;
  phoneNumber: string;
  rollNumber: number;
  gender: Gender;
  photo?: string;
}
