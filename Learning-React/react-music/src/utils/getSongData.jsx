import { v4 as uuidv4 } from "uuid";

function getSongData() {
  return [
    {
      name: "Down For Whatever",
      cover: "https://img.icons8.com/?size=512&id=69459&format=png",
      artist: "Ice Cube",
      audio: new Audio("./music/Down For Whatever.mp3"),
      id: uuidv4(),
      duration: "4:40",
      active: false,
    },
    {
      name: "Way Down We Go - Speed Up",
      cover: "https://img.icons8.com/?size=512&id=69459&format=png",
      artist: "Kaleo",
      audio: new Audio("./music/Down we go - Speed Up.mp3"),
      id: uuidv4(),
      duration: "3:34",
      active: false,
    },
    {
      name: "You Know How We Do It",
      cover: "https://img.icons8.com/?size=512&id=69459&format=png",
      artist: "Ice Cube",
      audio: new Audio("./music/Ice Cube - You Know How We Do It.mp3"),
      id: uuidv4(),
      duration: "4:13",
      active: false,
    },
    {
      name: "Harleys In Hawaii",
      cover: "https://img.icons8.com/?size=512&id=69459&format=png",
      artist: "Katy Perry",
      audio: new Audio("./music/Harleys In Hawaii 320.mp3"),
      id: uuidv4(),
      duration: "3:14",
      active: false,
    },
    {
      name: "Desperado (Slowed TikTok Remix)",
      cover: "https://img.icons8.com/?size=512&id=69459&format=png",
      artist: "Rihanna",
      audio: new Audio("./music/Rihanna - Desperado (Slowed TikTok Remix).mp3"),
      id: uuidv4(),
      duration: "4:09",
      active: false,
    },
    {
      name: "San Andreas x Insomnia - Remix",
      cover: "https://img.icons8.com/?size=512&id=69459&format=png",
      artist: "Faithless, GTA Remix",
      audio: new Audio("./music/San Andreas x Insomnia - Remix.mp3"),
      id: uuidv4(),
      duration: "2:00",
      active: false,
    },
    {
      name: "Let Me Down Slowly",
      cover: "https://img.icons8.com/?size=512&id=69459&format=png",
      artist: "Alec Benjamin",
      audio: new Audio("./music/Let Me Down Slowly Alec Benjamin 320 Kbps.mp3"),
      id: uuidv4(),
      duration: "2:49",
      active: false,
    }
  ];
}


export default getSongData;