import { createContext } from "react";
import { sessionContextType } from "./models";

export const SessionProvider = createContext<sessionContextType>({session: false, useSession: (val) => {}})