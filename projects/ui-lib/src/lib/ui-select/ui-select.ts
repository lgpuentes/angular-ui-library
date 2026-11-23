import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';
import {SelectOption} from '../models/select-option';

/**
 * Componente de selección reutilizable.
 * Permite elegir una opción de una lista y sincronizar el valor seleccionado.
 */

@Component({
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-select',
  templateUrl: './ui-select.html',
})
export class UiSelect {
  /** Lista de opciones disponibles para seleccionar. */
  options = input<SelectOption[]>([]);

  /** Texto descriptivo del selector. */
  label = input('');

  /** Texto mostrado cuando no hay una opción seleccionada. */
  placeholder = input('Selecciona una opción');

  /** Indica si las opciones están cargando. */
  loading = input(false);

  /** Indica si el selector está deshabilitado. */
  disabled = input(false);

  /** Valor seleccionado; permite vinculación bidireccional mediante model(). */
  value = model<string | null>(null);

  /** Emite la opción seleccionada cuando cambia el valor. */
  selectionChanged = output<SelectOption>();

  /**
   * Actualiza el valor seleccionado y emite la opción correspondiente.
   * Evento de cambio generado por el elemento select.
   */
  onSelectionChange(event: Event) {
    const selectedvalue = (event.target as HTMLSelectElement).value;
    this.value.set(selectedvalue);

    const selectedOption = this.options().find(option => option.value === selectedvalue);
    if (selectedOption) {
      this.selectionChanged.emit(selectedOption);
    }
  }
}
