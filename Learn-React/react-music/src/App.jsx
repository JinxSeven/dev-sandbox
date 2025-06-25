import Player from "./components/Player";
import Library from "./components/Library";
import getSongData from "./utils/getSongData"
import React from "react";
import "./App.scss";

export default function App() {
  const [songs, setSongs] = React.useState(getSongData())
  const [activeSong, setActiveSong] = React.useState(null);

  const handleNextSong = () => {
    const index = songs.findIndex(song => activeSong.id === song.id);
    if (index === -1 || index === songs.length) return;
    
    handleSongClick(songs[index + 1].id);
  }

  const handlePrevSong = () => {
    const index = songs.findIndex(song => activeSong.id === song.id);
    if (index === -1 || index === 0) return;

    handleSongClick(songs[index - 1].id);
  }

  const handleSongClick = (songId) => {
    setSongs(songsData => 
      songsData.map(song => {
        if (activeSong && song.id === activeSong.id) {
          song.audio.pause();
          song.audio.currentTime = 0;
          return { ...song, active: false };
        } if (song.id === songId) {
          song.audio.play();
          return { ...song, active: true };
        } 
        return song;
      })
    );

    setActiveSong(songs.find(song => song.id === songId));
  }

  return (
    <>
      <div style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '5px',
          height: '96.96vh'        
        }
      }>
        <div className="head-container">
          <Library 
            songData={songs}
            songClickHandler={handleSongClick}
          />
        </div>
        <div className="">
          
        </div>
        <div className="foot-container">
          <Player
            activeSong={activeSong}
            nextSong={handleNextSong}
            prevSong={handlePrevSong}
          />
        </div>
      </div>
    </>
  );
}
