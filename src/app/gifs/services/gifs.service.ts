import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' }) //Totalmente disponible a lo largo de toda la aplicación con el root


//const GIPHY_API_KEY = 'Hg2jxUep20n319GuF6Q4rtPIs99J1i0k';


export class GiftService {


  public gifList: Gif[] = [];

  /* Privado para evitar modificarlo en otro servicio o lugar que se use */
  private _tagsHistory: string[] = [];

  private apiKey: string = 'Hg2jxUep20n319GuF6Q4rtPIs99J1i0k';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    /* Para no pasarlo por referencia */
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag); //Solo dejo pasar los diferentes
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    /* serializar un objeto o arreglo para convetir en string */
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    /* Es un observable a lo largo del tiempo emite valores(estar escuchando la respuesta) */
    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params }) //Ordenar el codigo pasando parametros
      .subscribe(resp => {   /* Me suscribo a la respuesta */
        this.gifList = resp.data;
      })
  }

}
