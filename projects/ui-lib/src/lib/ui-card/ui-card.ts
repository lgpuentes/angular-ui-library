import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

/**
 * Componente de tarjeta reutilizable.
 * Permite mostrar contenido con diferentes niveles de elevación.
 */

@Component({
  imports: [NgClass],
  selector: 'ui-card',
  templateUrl: './ui-card.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCard {
  /** Título principal de la tarjeta. */
  title = input('');

  /** Subtítulo opcional de la tarjeta. */
  subtitle = input<string | null>(null);

  /** Estilo de elevación de la tarjeta. */
  elevation = input<'flat' | 'raised' | 'outlined'>('flat');

  /** Emite un evento cuando se hace clic en la cabecera. */
  headerClicked = output<void>();
  
  /** Clases Tailwind asociadas a cada nivel de elevación. */
  elevationClasses: Record<'flat' | 'raised' | 'outlined', string> = {
    flat: 'shadow-none',
    raised: 'shadow-[0_4px_12px_rgba(0,0,0,0.12)]',
    outlined: 'border border-gray-300 shadow-none'
  };
}
