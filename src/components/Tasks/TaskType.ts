import { Timestamp } from "firebase/firestore"

export type TaskType = {
    id: string,
    name: string,
    description: string,
    dueDate: Timestamp,
    assignee: string[],
    tags: string[],
    status: 'in-progress' | 'completed'
}