import { Playlist } from "./playlist";
import { User } from "./user";

export class Song {

  id: number;
  title: string;
  artist: string;
  imageURL: string;
  songURL: string;
  songLength: number;
  releaseDate: Date;
  album: string;
  user: User;
  post: Post;
  genres: Genre[];
  playlists: Playlist[];

  constructor(

    id: number = 0,
    title: string = '',
    artist: string = '',
    imageURL: string = '',
    songURL: string = '',
    songLength: number = 0,
    releaseDate: Date = new Date(),
    album: string = '',
    user: User = new User(),
    post: Post = new Post(),
    genres: Genre[] = [],
    playlists: Playlist[] = []
  ){
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.imageURL=imageURL;
    this.songURL = songURL;
    this.songLength = songLength;
    this.releaseDate =releaseDate;
    this.album = album;
    this.user = user;
    this.post = post;
    this.genres = genres;
    this.playlists = playlists;

  }

}
