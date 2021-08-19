import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
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
}
