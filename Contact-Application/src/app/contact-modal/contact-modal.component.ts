import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  @Input() contact: any;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  getProfileImage(): string {
    if (!this.contact?.profile) {
      return 'assets/default-profile.png';
    }

    if (this.contact.profile.startsWith('data:image') || this.contact.profile.startsWith('http')) {
      return this.contact.profile;
    }

    return `assets/${this.contact.profile}`;
  }
}
