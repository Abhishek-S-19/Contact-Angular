import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent {
  @Input() contact!: Contact;
  @Output() delete = new EventEmitter<string>();
  hover = false;

}
