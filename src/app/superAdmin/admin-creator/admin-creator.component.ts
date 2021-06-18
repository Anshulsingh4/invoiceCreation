import { AfterContentInit, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { AdminCreatorService } from '../admin-creator-service';

@Component({
  selector: 'app-admin-creator',
  templateUrl: './admin-creator.component.html',
  styleUrls: ['./admin-creator.component.css']
})



export class AdminCreatorComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  public allUser: any;
  register = false;
  editMode = false;
  id: string;
  selectedUser: any;
  constructor(private http: HttpClient, private adminService: AdminCreatorService) { }

  ngOnInit(): void {

    this.http.get('http://localhost:4000/getUser').subscribe(res => {
      this.allUser = res
      // console.log(this.allUser)
    })
  }

  onDelete(id: string) {
    // console.log(id)
    this.http.get('http://localhost:4000/deleteUser/' + id).subscribe(res => {
      console.log(res)
      alert("User Deleted")
      this.allUser = this.allUser.filter(user => user._id !== id)
      // console.log(this.allUser)
    })

  }

}
