import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiButton, SelectOption, UiSelect, UiCard, UiTable, TableColumn } from 'ui-lib';
import { RickAndMortyService } from './services/rick-and-morty';

interface Character {
  name: string;
  status: string;
  species: string;
}

@Component({
  imports: [RouterOutlet, UiButton, UiSelect, UiCard, UiTable],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit {
  private rickAndMortyService = inject(RickAndMortyService);
  protected readonly title = signal('demo-app');
  loading = signal(false);
  loadingCharacters = signal(false);
  errorCharacters = signal<string | null>(null);

  ngOnInit() {
    this.cargarPersonajes();
  }

  guardar(){
    this.loading.set(true);

    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
    console.log('Se hizo click en el boton Guardar');
  }

  selectedValue = signal<string | null>(null);
  onResourceChanges(){
    this.selectedStatus.set('all');
  }

  options: SelectOption[] = [
    { label: 'Personajes', value: 'characters' },
    { label: 'Episodios', value: 'episodes' },
    { label: 'Ubicaciones', value: 'locations' },
  ];

  characters = signal<Character[]>([]);

  columns: TableColumn<Character>[] = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'species', label: 'Species' },
  ];

  handleAction(event: { 
    action: 'view' | 'delete'; 
    row: Character
   }) {
    console.log(event.action, event.row);
  }

  cargarPersonajes() {
    this.loadingCharacters.set(true);
    this.rickAndMortyService.getCharacters().subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.loadingCharacters.set(false);
        console.log(response.results);
      },
      error: (error) => {
        console.error('Error al cargar personajes:', error);
        this.loadingCharacters.set(false);
        this.errorCharacters.set('Error al cargar personajes');
      }
    });
  }
  statusOptions: SelectOption[] = [
    {label: 'Todos', value: 'all'},
    {label: 'Vivo', value: 'Alive'},
    {label: 'Muerto', value: 'Dead'},
    {label: 'Desconocido', value: 'unknown'},
  ];

  selectedStatus = signal<string>('all');

  filteredCharacters = computed(()=> {
    const status = this.selectedStatus();

    if (status === 'all'){
      return this.characters();
    }

    return this.characters().filter(
      character => character.status === status
    );
  });
  
}