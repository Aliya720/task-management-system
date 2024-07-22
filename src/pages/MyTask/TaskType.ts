export type TaskType = {
    id: string,
    name: string,
    description: string,
    dueDate: string,
    assignee: string[],
    tags: string[],
    status: 'in-progress' | 'completed'
}