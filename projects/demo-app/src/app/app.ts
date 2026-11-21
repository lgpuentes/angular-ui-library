import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiButton, SelectOption, UiSelect, UiCard, UiTable, TableColumn } from 'ui-lib';

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

export class App {
  protected readonly title = signal('demo-app');
  loading = signal(false);
  guardar(){
    this.loading.set(true);

    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
    console.log('Se hizo click en el boton Guardar');
  }

  selectedValue = signal<string | null>(null);

  options: SelectOption[] = [
    { label: 'Personajes', value: 'characters' },
    { label: 'Episodios', value: 'episodes' },
    { label: 'Ubicaciones', value: 'locations' },
  ];

  characters: Character[] = [
    { name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
    { name: 'Morty Smith', status: 'Alive', species: 'Human' },
    { name: 'Summer Smith', status: 'Alive', species: 'Human' },
    { name: 'Beth Smith', status: 'Alive', species: 'Human' },
    { name: 'Jerry Smith', status: 'Alive', species: 'Human' },
  ];

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
}