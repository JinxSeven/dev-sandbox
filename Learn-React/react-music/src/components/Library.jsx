import * as React from "react";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ModalClose from "@mui/joy/ModalClose";
import Song from "./Song";
import ListItemButton from "@mui/joy/ListItemButton";

export default function Library({ songData, songClickHandler }) {
  const [isOpen, setIsOpen] = React.useState(false);

  function onSongClick(songId) {
    songClickHandler(songId);
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="soft" color="neutral" onClick={() => setIsOpen(true)}>
        Open Library
      </Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalClose />
        <DialogTitle>Songs Library</DialogTitle>
        <DialogContent>
          <List>
            {songData.map((song, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => onSongClick(song.id)}
                >
                  <Song
                    image={song.cover}
                    name={song.name}
                    artist={song.artist}
                    duration={song.duration}
                    state={song.active}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Drawer>
    </React.Fragment>
  );
}
