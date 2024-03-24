// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import queryString from "query-string";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

const order_to_playlist: any = {
  affogato: "1osg6NCTeplpaxAtFBZC3N",
  matcha: "71cq6hQ3JJQhqc4ktTk1rQ",
  latte: "6WnmsstQSgsCEYv4KTQwJU",
  mocha: "5SYrjaZI5YikHVADJcaZOL",
  americano: "1VSHh3EWBizCjbCMJQat4H",
  espresso: "080o39JzMvbUbmu2K5oDZe",
};

async function getAccessToken(): Promise<string> {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const resp = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
  });

  const access_token = resp?.data?.access_token || "";
  return access_token;
}

async function getPlaylistInfo(
  playlist_id: string,
  access_token: string,
): Promise<any> {
  const resp = await axios({
    method: "get",
    url: `${SPOTIFY_API_BASE}/playlists/${playlist_id}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return resp;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomSong(playlist: any): any {
  const numSongs: number = playlist?.tracks?.total || 1;
  return playlist.tracks.items[getRandomInt(numSongs)];
}

async function addSongToQueue(song: any, access_token: string) {
  const resp = await axios({
    method: "post",
    url: `${SPOTIFY_API_BASE}/me/player/queue?uri=${song.track.uri}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const access_token = await getAccessToken();
  const data = req.body;
  const order = data.drinkChoice;
  const playlist_id = order_to_playlist[order];
  const playlist = (await getPlaylistInfo(playlist_id, access_token)).data;
  const song = getRandomSong(playlist);
  await addSongToQueue(song, access_token);
  const to_send = `"${JSON.stringify({ order: data, song: song.track.name })}"`;
  const resp = await axios({
    method: "POST",
    url: process.env.DISCORD_WEBHOOK_URL,
    data: {
      content: to_send,
    },
  });
  res.status(200).json({ message: "success" });
}
