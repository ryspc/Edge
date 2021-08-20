import { User } from "./user";

export class Post {

  id: number;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  songId: number;
  user: User;
  isEnabled: boolean;

  constructor(
    id: number = 0,
    content: string = '',
    title: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    userId: number = 0,
    songId: number = 0,
    user: User = new User,
    isEnabled: boolean = true
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
  }
}
