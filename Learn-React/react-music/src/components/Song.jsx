import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

export default function Song({ image, name, artist, duration, state }) {
  return (
    <Card orientation="horizontal" variant="soft" sx={{ width: '100%' }} color={state === false ? 'primary' : 'success'}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 110 }}>
          <img
            src={image}
            srcSet={image + "&dpr=2 2x"} loading="lazy"
            alt={name + " " + artist}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography textColor="primary.plainColor" sx={{ fontWeight: "md" }}>{name}</Typography>
        <Typography level="body-sm" sx={{ fontWeight: "md", fontSize: "md" }}>{artist}</Typography>
        <div style={
          {
            display: "flex", gap: "8px"
          }
        }>
          <Typography level="body-sm" sx={{ fontWeight: "sm" }}>Duration: {duration}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
