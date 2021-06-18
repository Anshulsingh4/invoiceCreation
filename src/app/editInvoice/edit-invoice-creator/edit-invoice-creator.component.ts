import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/login/auth.service'

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice-creator.component.html',
  styleUrls: ['./edit-invoice-creator.component.css']
})
export class EditInvoiceCreatorComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  id: string;

  alldata = {
    customerName: String,
    address: String,
    contactNumber: Number,
    email: String,
    invoiceNumber: String,
    invoiceDate: String,
    pointToRemember: String
  }

  data: any;

  currentUser = null;
  currency = '1';
  state = '1';

  Subtotal = null;
  Discount = 10;
  GST = null;
  Total = null;

  products: Array<any> = []

  product = {
    Description: '',
    Quantity: null,
    Price: null,
    Amount: null
  }

  ngOnInit(): void {
    console.log(this.authService.loggedinUser)
    this.activatedRoute.params.subscribe((param: Params) => {
      this.id = param['id'];
      this.http.get('http://localhost:4000/manageinvoice/' + this.id).subscribe(res => {
        this.data = res;

        this.currentUser = this.authService.loggedinUser;
        // console.log("data", this.data)
        this.alldata.customerName = this.data.customerName
        this.alldata.address = this.data.address
        this.alldata.contactNumber = this.data.contactNumber
        this.alldata.email = this.data.email
        this.alldata.invoiceDate = this.data.invoiceDate,
          this.alldata.invoiceNumber = this.data.invoiceNumber
        this.alldata.pointToRemember = this.data.pointToRemember
        for (let i = 0; i < this.data.productDetails.length; i++) {
          let that = this.data.productDetails[i]
          console.log(that)
          let product = {
            Description: that.productName,
            Quantity: that.quantity,
            Price: that.price,
            Amount: that.amount,
          }
          this.Subtotal += product.Amount;
          this.GST = (this.Subtotal * 9) / 100;
          this.Total = this.Subtotal + this.GST + this.GST - this.Discount

          this.products.push(product)
        }
        console.log(this.products)

      })
    })

  }



  onAddProduct() {
    this.product.Amount = this.product.Quantity * this.product.Price;
    this.Subtotal += this.product.Amount;
    this.GST = (this.Subtotal * 9) / 100;
    this.Total = this.Subtotal + this.GST + this.GST - this.Discount

    const p = { ...this.product };
    console.log(p)
    this.products.push(p)

    this.product.Description = '';
    this.product.Quantity = null;
    this.product.Price = null;
    this.product.Amount = null;
    console.log(this.product)
    console.log(this.products)

  }

  onRemoveProduct(index: number) {
    console.log(this.products[index]['Amount'])
    this.Subtotal -= this.products[index]['Amount']
    this.GST = (this.Subtotal * 9) / 100;
    this.Total = this.Subtotal + this.GST + this.GST - this.Discount
    this.products.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    console.log(this.data._id)
    const id = this.data._id
    this.http.post('http://localhost:4000/editinvoice/' + id, { data: form.value, products: this.products, total: this.Total }).subscribe(res => {
      console.log(res)
    })

    alert("Data Update")
    this.products = [];
    this.Subtotal = null;
    this.Discount = null;
    this.Total = null;
    form.reset()
    this.router.navigate(['/manageInvoice'])
  }

}
