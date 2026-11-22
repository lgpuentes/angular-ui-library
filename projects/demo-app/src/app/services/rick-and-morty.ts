import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Character } from '../models/character';

type Resource = 'character' | 'episode' |'location';
@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
    private http = inject(HttpClient);
    private apiUrl = 'https://rickandmortyapi.com/api';
    
    getCharacters(): Observable<ApiResponse<Character>> {
        return this.http.get<ApiResponse<Character>>(
            `${this.apiUrl}/character`);
    }

    getResource<T>(resource: Resource): Observable<ApiResponse<T>> {
        return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${resource}`)
    }

}
