import { PostComment } from "./post-comment";

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  imageUrl: string;
  isEnabled: boolean;
  role: string;
  following: User[];
  comments: PostComment [];

  constructor(
    id: number =0,
    username: string = '',
    password: string = '',
    firstName: string = '',
    lastName: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    email: string = '',
    imageUrl: string = '',
    isEnabled: boolean = true,
    role: string = '',
    following: User[] = [],
    comments: PostComment [] = []
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.email = email;
    this.imageUrl = imageUrl;
    this.isEnabled = isEnabled;
    this.role = role;
    this.following = following;
    this.comments = comments;
  }
}
