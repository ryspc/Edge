import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { Song } from 'src/app/models/song';
import { PlaylistService } from 'src/app/services/playlist.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(
    private userService: UserService,
    private playlistService: PlaylistService
  ) { }

  playlists: Playlist[] = [];
  playlist: Playlist = new Playlist;


  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.loadUserPlaylists();

  }

  loadUserPlaylists(){
    this.playlistService.index().subscribe(
      playlists => {
        this.playlists = playlists;
        console.log(this.playlists)
      },
      noPlaylists => {
        console.error('PlaylistComponenet.loadPosts: error displaying Playlists')
      }
    )
  }

  getVideoId(song: Song): string{
    const regex = /[^=]*$/g;
    let songString = song.songURL;
    let songId = songString.substr(songString.search(regex));
    console.log(songId);
    return songId;
  }

  getSongLength(song: Song): number{
    return song.songLength;
  }
}
