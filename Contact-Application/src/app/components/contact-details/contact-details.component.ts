import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../contact.service';
import { Contact } from '../../contact.model'; // make sure this path is correct
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  standalone: true,
  imports: [CommonModule ],
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.getContactById(id).subscribe((data: Contact) => {
        this.contact = data;
      });
    }
  }

  getSocialPlatforms(): string[] {
    return this.contact?.socialMediaLinks ? Object.keys(this.contact.socialMediaLinks) : [];
  }
}
