import { createSlice } from "@reduxjs/toolkit";

const rcolors = {
    value: "#CD5C5C",
};

export const testslice = createSlice({
    name: "test",
    initialState: rcolors,
    reducers: {
        setcolor: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setcolor } = testslice.actions;
export default testslice.reducer;
