import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  editMode = false;
  id: string;
  selectedUser: any;
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id']
      if (this.id) {
        this.editMode = true
      }

    })

    if (this.editMode) {
      this.http.get('http://localhost:4000/getUser/' + this.id).subscribe(res => {
        this.selectedUser = res
        // console.log(this.selectedUser)
        this.form.setValue({
          name: this.selectedUser.name,
          email: this.selectedUser.email,
          contactNumber: this.selectedUser.contactNumber,
          department: this.selectedUser.department,
          role: this.selectedUser.role,
          password: this.selectedUser.password,
        })
      })

    }
  }

  onSubmit(data: NgForm) {
    // console.log(this.editMode)
    if (this.editMode) {
      this.http.post('http://localhost:4000/getUser/' + this.id, data.value).subscribe(res => {
        console.log(res)
        data.reset()
        this.router.navigate(['/invoiceCreator']);
      })
    }
    else {
      // console.log(data.value)
      this.http.post('http://localhost:4000/registerUser', data.value).subscribe(res => {
        console.log(res)
        data.reset()
        this.router.navigate(['/invoiceCreator']);
      })
    }
  }

}
