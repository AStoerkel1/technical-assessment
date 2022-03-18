import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hero } from '../types/Hero';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  /**
   * Gets a list of heroes from the backend API
   * 
   * @returns An array of heroes
   */
  getHeroes(): Promise<Hero[]> {
    return this.http.get<Hero[]>(`${environment.api}/heroes`).toPromise();
  }

  /**
   * Gets a hero by id from the backend API
   * @param string a hero ID
   * @returns A hero Object
   */
  getHeroById(id: string): Promise<Hero> {
    return this.http.get<Hero>(`${environment.api}/heroes/${id}`).toPromise();
  }

  /**
   * creates a new hero and sends it to the backend API
   * @param Hero a hero object
   * @returns a JSON response
   */
  createHero(newHero: Hero): Promise<JSON>{
    return this.http.post<JSON>(`${environment.api}/heroes`, newHero).toPromise();
  }
  /**
   * deletes a hero from the backend API
   * @param string id of the hero to be deleted
   * @returns a JSON response
   */
  deleteHeroById(id: string): Promise<JSON>{
    return this.http.delete<JSON>(`${environment.api}/heroes/${id}`).toPromise();
  }
}
