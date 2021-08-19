import { Song } from "./song";

export class Genre {

  id: number;
  name: string;
  songs: Song[];


  constructor(
    id: number = 0,
    name: string = '',
    songs: Song[] = []
  ){
  this.id = id;
  this.name = name;
  this.songs = songs;
  }
}
