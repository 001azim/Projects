import { createSlice } from '@reduxjs/toolkit';


export const gameSlice = createSlice({
    name: "gameSlice",
    initialState:{
        players:{
            player1:"",
            player2:""
        }
    },
    reducers: {
        setplayernames: (state, action) => {
        state.players.player1=action.payload.player1
        state.players.player2=action.payload.player2
        }
    }
});

export const { setplayernames } = gameSlice.actions;
export default gameSlice.reducer;
