# EDGE - *Dive into the world of fresh music.*

## Developers
* [Caleb Koch](https://github.com/CKoch92)
* [Gabriel Avila](https://www.linkedin.com/in/gabrielavila/)
* [Michael Ingram](https://github.com/mjingram)
* [Ray Space](https://github.com/ryspc)

## Overview
 Do you feel like you are listening to the same songs since high school?<br>
 Do you want to explore the newest music in your favorite genres?<br>
 Do you want to become a part of like-minded communities and stay on the edge of new music?
#### With EDGE, you can dive into the world of fresh music.
Discover, listen, share and discuss for free.<br>
<br>
<p float="left">
<img src="media/java-logo.png" alt = "java" width="75" height="130"   align="center"/>
<img src="media/angular.png" alt = "Angular" width="130"  align="center"/>
<img src="media/typescript.png" alt = "typesript" width="100" align="center"/>&nbsp;&nbsp;&nbsp;
<img src="media/git-logo.png" alt ="git" width="100" align="center"/>
<img src="media/mySQL-logo.png" alt = "MySQL"  height="110"  align="center"/>
<img src="media/spring-logo.png" alt = "Spring Boot" width="260"  align="center"/>
<!--   <img src="media/eclipse-logo.png" alt = "eclipse" width="150" align="center"/> -->
</p>

## Functionality
- The app functions as a social platform for music discovery. Users can create posts about new music, comment on posts, follow other users, favorite songs, and search the database by genres or unique queries and more.

- The backend is developed with Spring Boot, MySql and the frontend uses Angular with Material components.

- The app utilizes Spring Security for user authentication, all passwords are hashed in the database.

- Upon logging in, users are redirected to the home page where they can view posts about the most recent music, they can favorite, read and add comments, listen to the song by clicking on the cards which opens the Post Details modal.

- The site navigation relies on the responsive sidebar. Users can conduct searches for posts, songs, genres and even other users. The Create Post button on the side bar allows users to create a new post. The sidebar also highlights filtering by Featured Genres and contains a link to the user's profile page.

- From the profile page, users can view their existing posts, comments, favorite songs, users they follow, and modify their profile through the settings page.

## Technologies Used
* [Angular](https://angular.io/)</br>
* [Typescript](https://www.typescriptlang.org/)</br>
* [Java](https://en.wikipedia.org/wiki/Java_)</br>
* [Javascript](https://www.javascript.com/)</br>
* [Object-Oriented design](https://stackabuse.com/object-oriented-design-principles-in-java)</br>
* [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer)<br>
* [Spring Framework](https://en.wikipedia.org/wiki/Spring_Framework#Spring_Boot)<br>
* [MySQL](https://www.mysql.com/)</br>
* [Git](https://git-scm.com/)</br>
* [Eclipse](https://www.eclipse.org/ide/)</br>

## How to Run (Demo)
To run, make sure your favorite browser is updated to the latest version. Listed below are each developers ec2 instances' of the application.<br>
NOTE: You'll need to create an account
* [Ray Space's Instance](http://52.8.239.60:8080/RainbowBeat/)

## Lessons Learned
###### Caleb K:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
###### Gabriel A.:
Working on this team during this final sprint has taught me a lot about authentication and angular. I'm grateful to have been partnered with such insightful and driven individuals. The planning phase and communication really helped with mitigating potential issues that would appear later on. All that being said this was definitely a challenging project, particularly with the social aspect of the site and using angular to retrieve good data. Adding a following/followers feature was also challenging, and given the time frame I feel we did a great job implementing this feature. Taking the time to talk about design ideas and compromise as a team on certain decisions really helped us with getting a good final product.
###### Michael I:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
###### Ray S:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## REST Endpoints

#### Users
| Return Type    | Route                           | Functionality              |
|:---------------|:--------------------------------|----------------------------|
|`User`          | `POST api/users`                | Creates a new user         |
|`User`          | `PUT api/users`                 | Updates a user             |
|`void`          | `DELETE api/users/{id}`         | Deletes a user             |

#### Songs
| Return Type    | Route                           | Functionality              |
|:---------------|:--------------------------------|----------------------------|
|`List<Song>`    | `GET api/songs`                 | Retrieves all songs        |
|`List<Song>`    | `GET api/songs/search/{keyword}`| Retrieves songs by keyword |
|`List<Song>`    | `GET api/songs/{genre}`         | Retrieves songs by genre   |

#### Posts
| Return Type    | Route                           | Functionality              |
|:---------------|:--------------------------------|----------------------------|
|`List<Post>`    | `GET api/posts`                 | Retrieves all posts        |
|`List<Post>`    | `GET api/posts/search/{keyword}`| Retrieves posts by keyword |
|`List<Post>`    | `GET api/posts/{genre}`         | Retrieves posts by genre   |
|`Post`          | `POST api/posts`                | Creates a new post         |
|`Post`          | `PUT api/posts`                 | Updates a post             |
|`void`          | `DELETE api/posts/{id}`         | Deletes a post             |

#### Comments
| Return Type    | Route                           | Functionality              |
|:---------------|:--------------------------------|----------------------------|
|`Comment`       | `POST api/comments`             | Creates a new comment      |
|`Comment`       | `PUT api/comments`              | Updates a comment          |
|`void`          | `DELETE api/comments/{id}`      | Deletes a comment          |

#### Playlists
| Return Type    | Route                           | Functionality              |
|:---------------|:--------------------------------|----------------------------|
|`Playlist`      | `GET api/playlists/{id}`        | Retrieves  a playlist by id|
|`Playlist`      | `POST api/playlists`            | Creates a new playlist     |
|`Playlist`      | `PUT api/playlists`             | Updates a playlist         |
|`void`          | `DELETE api/playlists/{id}`     | Deletes a playlist         |

## EER Diagram
<!-- <img src="DB/housereportdbSchema.png" alt="DB Schema"/> -->
Coming Soon.
