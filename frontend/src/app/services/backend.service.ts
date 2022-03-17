import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hero } from '../types/Hero';

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
   * 
   * @returns A hero Object
   */
  getHeroById(id: String): Promise<Hero> {
    return this.http.get<Hero>(`${environment.api}/heroes/${id}`).toPromise();
  }
}
