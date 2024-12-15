import type { Dispatch } from "react";
import type { SetStateAction } from "react";

export type State<T> = [T, Dispatch<SetStateAction<T>>];