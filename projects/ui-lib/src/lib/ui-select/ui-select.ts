import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';
import {SelectOption} from '../models/select-option';

@Component({
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-select',
  templateUrl: './ui-select.html',
})
export class UiSelect {
  options = input<SelectOption[]>([]);
  label = input('');
  placeholder = input('Selecciona una opción');
  loading = input(false);
  disabled = input(false);

  value = model<string | null>(null);
  selectionChanged = output<SelectOption>();

  onSelectionChange(event: Event) {
    const selectedvalue = (event.target as HTMLSelectElement).value;
    this.value.set(selectedvalue);

    const selectedOption = this.options().find(option => option.value === selectedvalue);
    if (selectedOption) {
      this.selectionChanged.emit(selectedOption);
    }

  }
}
