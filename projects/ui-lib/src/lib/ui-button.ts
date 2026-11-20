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
    [ngClass]="[variant(), size()]"
    (click)="clicked.emit()"
     >
     @if (loading()) {
    <span class="spinner" aria-hidden="true"></span> 
    <span>Cargando...</span>
    } @else {
        {{ label() }}
    }
     </button>`,

  styles: `
    .primary {
        background-color: #2563eb;
        color: white;
    }
    .secondary {
        background-color: #e5e7eb;
        color: #111827;
    }
    .danger {
    background-color: #dc2626;
    color: white;
    }
    .sm {
        padding: 4px 8px;
        font-size: 12px;
    }
    .md {
        padding: 8px 16px;
        font-size: 14px;
    }
    .lg {
        padding: 12px 24px;
        font-size: 16px;
    }
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    button {
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }   
    .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;   
    vertical-align: middle;
    margin-right: 6px;
    }
    @keyframes spin {
        to {
        transform: rotate(360deg); 
        }
    }           
    `
})
export class UiButton {
    label = input('Aceptar');
    variant = input<'primary' | 'secondary' | 'danger'>('primary');
    size = input<'sm' | 'md' | 'lg'>('md');
    disabled = input(false);
    loading = input(false);
    clicked = output<void>();
}    