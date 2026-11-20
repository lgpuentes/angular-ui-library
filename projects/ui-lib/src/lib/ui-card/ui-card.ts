import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'ui-card',
  styleUrl: './ui-card.css',
  templateUrl: './ui-card.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCard {
  title = input('');
  subtitle = input<string | null>(null);
  elevation = input<'flat' | 'raised' | 'outlined'>('flat');
  headerClicked = output<void>();
}
