import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name:String='';

  constructor(private _user:UserService, private _router:Router) { 
    this._user.user()
    .subscribe(
      data=> this.pangolinName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  pangolinName(data){
    this.name = data.name
  }

  ngOnInit(): void {
  }
  
  moveToProfile(){
    this._router.navigate(['/profile']);
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=> {console.log(data); this._router.navigate(['/login'])},
      error=> console.error(error)
    )
  }



}
