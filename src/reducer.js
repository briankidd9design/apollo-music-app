function songReducer(state, action) {
    switch (action.type) {
        case "PLAY_SONG": {
            return{
                ...state,
                isPlaying: true
            };
        }
        case "PAUSE_SONG": {
            return {
              ...state,
              isPlaying: false
            };
          }
          //sets new song
        case "SET_SONG": {
            return {
                ...state,
                song: action.payload.song
            };
        }
        default: 
            return state
    }
}
//reducers are hip as fuck, but they don't work when you have to interact with something out side of the program, like an api. For this I use Apollo

export default songReducer;