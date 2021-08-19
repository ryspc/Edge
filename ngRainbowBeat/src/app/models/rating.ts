import { Post } from "./post";
import { User } from "./user";

export class Rating {

  rating: boolean;
  user: User;
  post: Post;


  constructor(

    rating: boolean = false,
    user: User = new User,
    post: Post = new Post
  ){

    this.rating = rating;
    this.user = user;
    this.post = post;

  }
}

