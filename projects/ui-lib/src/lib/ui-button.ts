import {Component, input, output, ChangeDetectionStrategy} from '@angular/core';
import {NgClass} from '@angular/common';
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
    label = input('Aceptar');
    variant = input<'primary' | 'secondary' | 'danger'>('primary');
    size = input<'sm' | 'md' | 'lg'>('md');
    disabled = input(false);
    loading = input(false);
    clicked = output<void>();

    variantClasses: Record<'primary' | 'secondary' | 'danger', string> = {
        primary: 'bg-blue-600 text-white',
        secondary: 'bg-gray-200 text-gray-900',
        danger: 'bg-red-600 text-white'
    };

    sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };
}    