import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'}) //Totalmente disponible a lo largo de toda la aplicación con el root

export class GiftService {

  /* Privado para evitar modificarlo en otro servicio o lugar que se use */
  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(){
    /* Para no pasarlo por referencia */
    return [...this._tagsHistory]
  }

  searchTag(tag: string):void{
    this._tagsHistory.unshift(tag);
  }

}
