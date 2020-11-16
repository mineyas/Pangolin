import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    race: new FormControl(null, Validators.required),
    food: new FormControl(null, Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

 
}
