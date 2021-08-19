import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudioListService } from 'src/app/audio-list/audio-list.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

  constructor(private audioListService: AudioListService) { }

  ngOnInit(): void {}

  passQueryString(value: string | undefined) {
    this.searchQuery.emit(value);
    this.audioListService.clearCache();
  }

}
