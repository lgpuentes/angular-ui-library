import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'ui-card',
  templateUrl: './ui-card.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCard {
  title = input('');
  subtitle = input<string | null>(null);
  elevation = input<'flat' | 'raised' | 'outlined'>('flat');
  headerClicked = output<void>();
  elevationClasses: Record<'flat' | 'raised' | 'outlined', string> = {
    flat: 'shadow-none',
    raised: 'shadow-[0_4px_12px_rgba(0,0,0,0.12)]',
    outlined: 'border border-gray-300 shadow-none'
  };
}
