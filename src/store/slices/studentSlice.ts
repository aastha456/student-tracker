import type { Student } from "../../components/types";
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { fetchAll, deleteById, create, update } from "../../api/students";


interface StudentState {
    students: Student[];
    loading: boolean;
}

const initialState: StudentState = {
    students: [],
    loading: false
}

export const fetchAllStudents = createAsyncThunk(
    'students/fetchAllStudents',
    async () => {
        const { data } = await fetchAll();
        return data;
    }
)

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (data: Omit<Student,"_id">) => {
    const { data: createdStudent } = await create(data);
    return createdStudent;
  }
);

export const deleteStudent = createAsyncThunk(
    "students/deleteStudent",
    async (id: string) => {
        const data = await deleteById(id);
        return data; 

    }
)

export const updateStudent = createAsyncThunk(
    "students/updateStudent",
    async (student: Student) => {
        const {_id, ...data} = student;
        const { data: updatedStudent } = await update(_id, data);
        return updatedStudent;
    }
)

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchAllStudents.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(fetchAllStudents.fulfilled, (state, action) => {
            state.loading = false;
            state.students = action.payload;
          
        })

        builder.addCase(fetchAllStudents.rejected, (state) => {
            state.loading = false;
        })
        
        builder.addCase(createStudent.fulfilled, (state, action) => {
            state.students.push(action.payload);
        })
        
        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            state.students = state.students.filter(student => student._id !== action.meta.arg);
        })

        builder.addCase(updateStudent.fulfilled, (state, action)=> {
            const index = state.students.findIndex(student => student._id === action.payload._id);
            if(index !== -1){
                state.students[index] = action.payload;
            }
        })

    }
})

export default studentSlice.reducer;