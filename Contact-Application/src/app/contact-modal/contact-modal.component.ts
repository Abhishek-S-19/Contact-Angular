import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  @Input() contact: any;
  @Output() closeModal = new EventEmitter<void>();
    @Output() delete = new EventEmitter<string>();
    hover = false;

  onClose() {
    this.closeModal.emit();
  }
  onDelete() {
    this.delete.emit(this.contact._id);
  }
  confirmDelete() {
    const confirmMsg = 'Are you sure you want to delete this contact?';
    if (confirm(confirmMsg)) {
      this.onDelete();
      this.onClose();
    }
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

  fixUrl(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }
}
