import {Component, input, output, ChangeDetectionStrategy} from '@angular/core';
import {NgClass} from '@angular/common';

/**
 * Componente de botón reutilizable.
 * Permite configurar su apariencia, tamaño y estados de interacción.
 */

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button
    type="button"
    [attr.aria-busy]="loading()"
    [attr.aria-disabled]="disabled() || loading()"
    [disabled]="disabled() || loading()"
    [ngClass]="[
        variantClasses[variant()],
        sizeClasses[size()],
        'rounded-md border-0 cursor-pointer transition-opacity duration-200',
        (disabled() || loading()) ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    (click)="clicked.emit()"
     >
     @if (loading()) {
    <span
        class="mr-1.5 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent align-middle"
        aria-hidden="true"
    ></span>
    <span>Cargando...</span>
    } @else {
        {{ label() }}
    }
     </button>`,

})
export class UiButton {
    /** Texto que se muestra cuando el botón no está cargando. */
    label = input('Aceptar');
     /** Variante visual del botón: primaria, secundaria o de peligro. */
    variant = input<'primary' | 'secondary' | 'danger'>('primary');
     /** Tamaño del botón. */
    size = input<'sm' | 'md' | 'lg'>('md');
     /** Indica si el botón está deshabilitado. */
    disabled = input(false);
     /** Indica si el botón está realizando una operación y muestra el spinner. */
    loading = input(false);
    /** Emite un evento cuando el usuario hace clic en el botón. */
    clicked = output<void>();

    /** Clases Tailwind asociadas a cada variante visual. */
    variantClasses: Record<'primary' | 'secondary' | 'danger', string> = {
        primary: 'bg-blue-600 text-white',
        secondary: 'bg-gray-200 text-gray-900',
        danger: 'bg-red-600 text-white'
    };

    /** Clases Tailwind asociadas a cada tamaño. */
    sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };
}    