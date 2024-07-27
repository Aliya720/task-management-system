import { Timestamp } from "firebase/firestore";

 //to formate dueDate from timestamp to string
 export const formatDueDate = (dueDate: Timestamp | undefined): string => {
    if (!dueDate) return "";
    const date = dueDate.toDate();
    return date.toLocaleString();
  };