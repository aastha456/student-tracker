import http from '../utils/http';
import type { Student } from '../components/types';

export const fetchAll = () => {
    return http.get('/students');
}

export const fetchById = (id: string) => {
    return http.get(`/students/${id}`);
}

export const deleteById = (id: string) => {
    return http.delete(`/students/${id}`);
}

export const create = (data: Omit<Student, '_id'>) => {
    return http.post('/students', data);
}

export const update = (id: string, data: Omit<Student, '_id'>) => {
    return http.put(`/students/${id}`, data);
}