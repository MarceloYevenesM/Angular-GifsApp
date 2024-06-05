import { Component } from '@angular/core';
import { GiftService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  //Privado gifsService
  constructor(private gifsService: GiftService) {
  }

  public searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }



}
