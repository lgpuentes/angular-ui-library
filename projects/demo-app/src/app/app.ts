import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiButton, SelectOption, UiSelect, UiCard } from 'ui-lib';


@Component({
  imports: [RouterOutlet, UiButton, UiSelect, UiCard],
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
}
