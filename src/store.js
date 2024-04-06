import { configureStore } from "@reduxjs/toolkit";
import testslice from "./slice/testslice";
import gameSlice from "./slice/gameslice";
export const store=configureStore({

    reducer:{
        color:testslice,
        game:gameSlice

    }
})