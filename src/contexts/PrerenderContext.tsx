import { createContext, useContext } from "react";
import type { Course } from "@/services/courseService";

export type PrerenderData = { courses?: Course[] };
export const PrerenderContext = createContext<PrerenderData>({});
export const usePrerenderData = () => useContext(PrerenderContext);
