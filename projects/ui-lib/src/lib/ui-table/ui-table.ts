import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { TableColumn } from '../models/table-column';

@Component({
  imports: [],
  selector: 'ui-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full'
  },
  templateUrl: './ui-table.html',
})
export class UiTable<T> {
  rows = input<T[]>([]);
  columns = input<TableColumn<T>[]>([]);

  loading = input(false);
  emptyMessage = input('No hay datos disponibles');
  errorMessage = input<string | null>(null);
  
  actionTriggered = output<{
    action: 'view' | 'delete';
    row: T;
  }>();
}