import { SourceMapRange } from "typescript";
import { Song } from "./song";
import { User } from "./user";

export class Playlist {

  id: number;
  title: string;
  description: string;
  imageUrl: string;
  published: boolean;
  user: User;
  songs: Song[];

  constructor(
    id: number = 0,
  title: string = '',
  description: string = '',
  imageUrl: string = '',
  published: boolean = false,
  user: User = new User(),
  songs: Song[] = []
  ) {
    this.id = id;
    this.title =title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.published = published;
    this.user =user;
    this.songs =songs;
  }

}
