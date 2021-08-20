
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { publishReplay, refCount } from 'rxjs/operators';
import { AudioList} from '../models/audio-list';

@Injectable({
  providedIn: 'root'
})

export class AudioListService {

  iTunesUrl = 'https://itunes.apple.com/search';
  private audioList: Observable<AudioList[]> | null = null;

  constructor(private httpClient: HttpClient) { }

  getMusicList(queryString: any): Observable<AudioList[]> {

      if (!this.audioList) {
        this.audioList = this.httpClient.get<AudioList[]>(`${this.iTunesUrl}?term=${queryString}`).pipe(
          publishReplay(1),
          refCount()
        );
      }
      return this.audioList;

  }

  clearCache() {
    this.audioList = null;
  }

}
