import { Post } from "./post";
import { User } from "./user";

export class PostComment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  post: Post;

  constructor(
  id: number = 0,
  content: string = '',
  createdAt: Date = new Date(),
  updatedAt: Date = new Date(),
  user: User = new User,
  post: Post = new Post
  ){
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.post = post;
  }
}
