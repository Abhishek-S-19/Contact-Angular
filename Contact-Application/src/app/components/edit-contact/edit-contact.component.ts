import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../contact.service';
import { Contact } from '../../contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./edit-contact.component.css'],
  standalone: true
})
export class EditContactComponent implements OnInit {
  contact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    designation: '',
    profilePic: '',
    discussion: '',
    identificationNumber: '', 
    previousVisits: [],
    socialMediaLinks: {
      twitter: '',
      linkedin: ''
    }
  };
  newPlatform: string = '';
  newUrl: string = '';
  newVisitDate: string = '';
  newVisitPurpose: string = '';
  id!: string;


  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.contactService.getContactById(this.id).subscribe((data) => {
      this.contact = data;
      this.contact.socialMediaLinks = this.contact.socialMediaLinks || {
        twitter: '',
        linkedin: ''
      };
      this.contact.previousVisits = this.contact.previousVisits || [];
    });
  }
  

  

  addPreviousVisit() {
    if (this.newVisitDate && this.newVisitPurpose) {
      this.contact.previousVisits!.push({
        date: new Date(this.newVisitDate),
        purpose: this.newVisitPurpose
      });
      this.newVisitDate = '';
      this.newVisitPurpose = '';
    }
  }
 

  removePreviousVisit(index: number) {
    this.contact.previousVisits!.splice(index, 1);
  }

  onSubmit() {
    this.contactService.updateContact(this.id, this.contact).subscribe(() => {
      alert('Contact updated successfully!');
      this.router.navigate(['/contacts']);
    });
  }
}
