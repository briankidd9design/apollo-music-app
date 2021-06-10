import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import songReducer from './reducer';

export const SongContext = React.createContext({
  song: {
    id: "22059360-97f6-4ad6-82c5-74297380af61",
    title: "N I G H T V I S I O N",
    artist: "Kylmyys",
    thumbnail:"https://i1.sndcdn.com/artworks-000223081051-3kpabu-t500x500.jpg",
    url: "https://soundcloud.com/kylmyys/n-i-g-h-t-v-i-s-i-o-n" ,
    duration: 257.433,
  },
  isPlaying: false
});

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10,
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70,
                }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
      </SongContext.Provider>
  );
}

export default App;
