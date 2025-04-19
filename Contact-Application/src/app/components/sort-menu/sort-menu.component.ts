import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-menu',
  templateUrl: './sort-menu.component.html'
})
export class SortMenuComponent {
  @Output() sortChanged = new EventEmitter<string>();

  onSelectChange(event: any) {
    this.sortChanged.emit(event.target.value);
  }
}
