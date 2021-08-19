import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() music: any;
  player = new Audio;

  constructor(  ) { }

  ngOnInit(): void {}

  playSong(audio: { previewUrl: string; }) {
    this.player.src = audio.previewUrl;
    this.player.play();
  }
  stopSong(audio: any) {
    this.player.pause();
  }
}
