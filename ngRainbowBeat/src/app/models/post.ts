export class Post {

  id: number;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  songId: number;
  constructor(
    id: number = 0,
    content: string = '',
    title: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    userId: number = 0,
    songId: number = 0
  ){
    this.id = id;
    this.content = content;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
    this.songId = songId;
  }
}
