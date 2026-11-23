import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { TableColumn } from '../models/table-column';

/**
 * Componente de tabla reutilizable y genérico.
 * Permite mostrar colecciones de datos con columnas configurables
 * y estados de carga, error y ausencia de registros.
 *
 * @template T Tipo de dato de cada fila de la tabla.
 */

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
  /** Colección de registros que se mostrarán en la tabla. */
  rows = input<T[]>([]);

  /** Configuración de las columnas y sus propiedades asociadas al tipo T. */
  columns = input<TableColumn<T>[]>([]);

  /** Indica si la tabla está cargando información. */
  loading = input(false);
  
  /** Mensaje que se muestra cuando no hay registros disponibles. */
  emptyMessage = input('No hay datos disponibles');
  
  /** Mensaje de error que se muestra cuando ocurre un problema. */
  errorMessage = input<string | null>(null);

  /**
   * Emite una acción realizada sobre una fila de la tabla.
   * Puede ser visualizar o eliminar un registro.
   * Incluye la fila sobre la que se realizó la acción.
  */
  actionTriggered = output<{
    action: 'view' | 'delete';
    row: T;
  }>();
}