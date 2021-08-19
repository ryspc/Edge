import { Component, OnChanges, OnInit } from '@angular/core';
import { AudioListService } from './audio-list.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss']
})
export class AudioListComponent implements OnInit{
  music: any;
  constructor(private audioListService: AudioListService) { }

  ngOnInit(): void {}

  searchSong(value: any) {
    this.audioListService.getMusicList(value).subscribe(music => {
      this.music = music;
    })
  }

}
