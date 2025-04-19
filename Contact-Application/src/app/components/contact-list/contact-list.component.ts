import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../../contact.service';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SortMenuComponent } from '../sort-menu/sort-menu.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContactCardComponent,
    SearchBarComponent,
    SortMenuComponent
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']

})
export class ContactListComponent {
  private router = inject(Router);
  private contactService = inject(ContactService);

  contacts: any[] = [];
  filteredContacts: any[] = [];
  isDisplayingAllContacts: boolean = false;
  isContactAdded: boolean = false;  // Flag to show success message
  errorMessage: string = ''; // Error message to display

  ngOnInit() {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
      this.filteredContacts = [...data];
    });
  }

  displayAllContacts() {
    this.isDisplayingAllContacts = true;
    this.filteredContacts = [...this.contacts];
  }

  onSearch(query: string) {
    const lower = query.toLowerCase();
    this.filteredContacts = this.contacts.filter(
      c => c.name.toLowerCase().includes(lower) || c.email.toLowerCase().includes(lower)
    );
  }

  onSort(criteria: string) {
    if (criteria === 'name') {
      this.filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'createdAt') {
      this.filteredContacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  onDelete(id: string) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter(c => c._id !== id);
      this.filteredContacts = [...this.contacts];
    });
  }

  // Handle the contact adding event
  onAddContact(isAdded: boolean, error?: string) {
    if (isAdded) {
      this.isContactAdded = true; // Contact added successfully
      this.errorMessage = ''; // Clear any previous error message
    } else {
      this.isContactAdded = false; // Contact not added
      this.errorMessage = error || 'Contact could not be added!';
    }
  }
}
