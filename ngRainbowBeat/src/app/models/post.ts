import { User } from "./user";
import { Song } from "./song";

export class Post {

  id: number;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  songId: number;
  user: User;
  song: Song;
  isEnabled: boolean;
  rating: number;

  constructor(
    id: number = 0,
    content: string = '',
    title: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    userId: number = 0,
    songId: number = 0,
    user: User = new User,
    song: Song = new Song,
    isEnabled: boolean = true,
    rating: number = 0
  ){
    this.id = id;
    this.content = content;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.songId = songId;
    this.user = user;
    this.isEnabled = isEnabled;
    this.song = song;
    this.rating = rating;
  }
}
