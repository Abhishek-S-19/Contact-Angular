import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports:[FormsModule],
  styleUrl:'./search-bar.component.css'
})
export class SearchBarComponent {
  @Output() searchChanged = new EventEmitter<string>();
  search = '';

  onInput() {
    this.searchChanged.emit(this.search.toLowerCase());
  }
}
