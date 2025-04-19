import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../contact.service';
import { Contact } from '../../contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  contact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    designation: '',
    profilePic: '',
  purposeOfVisit: '',
  identificationNumber: ''
  };

  

  // Flags for success/error messages
  isSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private contactService: ContactService, private router: Router) {}
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);
  
    this.contactService.uploadProfilePic(formData).subscribe((res) => {
      this.contact.profilePic = res.imageUrl; // Save image path to contact
    });
  }


  onSubmit() {
    this.contactService.addContact(this.contact).subscribe(
      () => {
        this.isSuccess = true;
        this.errorMessage = '';  // Clear any previous error message
        this.router.navigate(['/contacts']);
      },
      (error) => {
        this.isSuccess = false;
        this.errorMessage = 'There was an error adding the contact. Please try again.';
        console.error('Error:', error);
      }
    );
  }
}
