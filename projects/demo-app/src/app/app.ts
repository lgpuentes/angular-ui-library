import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiButton, SelectOption, UiSelect, UiCard, UiTable, TableColumn } from 'ui-lib';
import { RickAndMortyService } from './services/rick-and-morty';
import { Character} from './models/character';
import { Episode } from './models/episode';
import { Location } from './models/location';

type ResourceItem = Character | Episode | Location;

interface ResourceTableItem {
  id: number;
  name: string;
  detail1: string;
  detail2: string;
}
type ResourceColumn = 
  | TableColumn<Character>
  | TableColumn<Episode>
  | TableColumn<Location>;

@Component({
  imports: [RouterOutlet, UiButton, UiSelect, UiCard, UiTable],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit {
  private rickAndMortyService = inject(RickAndMortyService);
  protected readonly title = signal('demo-app');
  loadingResource = signal(false);
  errorResource = signal<string | null>(null);
  selectedItem = signal<ResourceTableItem | null>(null);
  showModal = signal(false);

  ngOnInit() {
    this.cargarPersonajes();
  }

  selectedValue = signal<string | null>('characters');

  onResourceChanges(){
    this.selectedStatus.set('all');

    const resource = this.selectedValue();

    if (resource === 'charaters'){
      this.cargarPersonajes();
    } else if (resource === 'episodes'){
      this.cargarEpisodios();
    }else if (resource === 'locations'){
      this.cargarUbicaciones();
    }
  }

  options: SelectOption[] = [
    { label: 'Personajes', value: 'characters' },
    { label: 'Episodios', value: 'episodes' },
    { label: 'Ubicaciones', value: 'locations' },
  ];

  characters = signal<Character[]>([]);
  episodes = signal<Episode[]>([]);
  locations = signal<Location[]>([]);

  columns = computed<TableColumn<ResourceTableItem>[]>(() => {
    const resource = this.selectedValue();

    let detail1 = 'Estado';
    let detail2 = 'Especie';

    if (resource === 'episodes') {
      detail1 = 'Episodio';
      detail2 = 'Fecha de emisión';
    } else if (resource === 'locations') {
      detail1 = 'Tipo';
      detail2 = 'Dimensión';
    }

    return [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nombre' },
      { key: 'detail1', label: detail1 },
      { key: 'detail2', label: detail2 },
    ];
});

  handleAction(event: { 
    action: 'view' | 'delete'; 
    row: ResourceTableItem;
   }) {
    if (event.action === 'view') {
        this.selectedItem.set(event.row);
        this.showModal.set(true);
    }else {
      console.log('Eliminar:', event.row);
    }
  }

  cargarPersonajes() {
    this.loadingResource.set(true);
    this.errorResource.set(null);

    this.rickAndMortyService.getCharacters().subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.loadingResource.set(false);
      },
      error: (error) => {
        console.error('Error al cargar personajes:', error);
        this.loadingResource.set(false);
        this.errorResource.set('Error al cargar personajes');
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

  resourceItems = computed<ResourceItem[]>(() => {
    const resource = this.selectedValue();

    if (resource === 'episodes'){
      return this.episodes();
    }

    if (resource === 'locations'){
      return this.locations();
    }

    return this.filteredCharacters();
  })

  tableItems = computed<ResourceTableItem[]>(() => {
  const resource = this.selectedValue();

    if (resource === 'episodes') {
      return this.episodes().map(episode => ({
        id: episode.id,
        name: episode.name,
        detail1: episode.episode,
        detail2: episode.air_date,
      }));
    }

    if (resource === 'locations') {
      return this.locations().map(location => ({
        id: location.id,
        name: location.name,
        detail1: location.type,
        detail2: location.dimension,
      }));
    }

    return this.filteredCharacters().map(character => ({
      id: character.id,
      name: character.name,
      detail1: character.status,
      detail2: character.species,
    }));
  });

  cargarEpisodios(){
    this.loadingResource.set(true);
    this.errorResource.set(null);

    this.rickAndMortyService.getResource<Episode>('episode').subscribe({
      next: (response) => {
        this.episodes.set(response.results);
        this.loadingResource.set(false);
      },
      error: (error) => {
        console.error('Error al cargar episodios:', error);
        this.loadingResource.set(false);
        this.errorResource.set('Error al cargar episodios');
      }
    });
  }
  
  cargarUbicaciones() {
    this.loadingResource.set(true);
    this.errorResource.set(null);

    this.rickAndMortyService.getResource<Location>('location').subscribe({
      next: (response) => {
        this.locations.set(response.results);
        this.loadingResource.set(false);
      },
      error: (error) => {
        console.error('Error al cargar ubicaciones:', error);
        this.loadingResource.set(false);
        this.errorResource.set('Error al cargar ubicaciones');
      }
    });
  }

  cerrarModal(){
    this.showModal.set(false);
    this.selectedItem.set(null);
  }


}