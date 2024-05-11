import { createContext } from "react";

export const RoleProvider = createContext<{role : "teacher" | "student" | "admin"} | null >(null)