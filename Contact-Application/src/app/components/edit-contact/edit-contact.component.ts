import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../contact.service';
import { Contact } from '../../contact.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  imports: [ FormsModule],
  styleUrls: ['./edit-contact.component.css']

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
  purposeOfVisit: '',
  identificationNumber: ''
  };
  id!: string;

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.contactService.getContactById(this.id).subscribe(data => this.contact = data);
  }

  onSubmit() {
    this.contactService.updateContact(this.id, this.contact).subscribe(() => {
      alert('Contact updated successfully!');
      this.router.navigate(['/contacts']);
    });
  }
}
