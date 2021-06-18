import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  @ViewChild('createInvoice') form!: NgForm;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  invoiceNumber!: string;
  currentUser = null;
  currency = '1';
  state = '';
  isstate!: boolean;
  isOutofstate!: boolean;
  Subtotal = 0;
  Discount = 10;
  GST = 0;
  Total = 0;

  products: Array<any> = []

  product = {
    Description: '',
    Quantity: 0,
    Price: 0,
    Amount: 0
  }

  ngOnInit(): void {
    console.log(this.form)
  }

  onAddProduct() {
    if (this.isstate) {
      this.product.Amount = this.product.Quantity * this.product.Price;
      this.Subtotal += this.product.Amount;
      this.GST = (this.Subtotal * 9) / 100;
      this.Total = this.Subtotal + this.GST + this.GST - this.Discount
    }
    if (this.isOutofstate) {
      this.product.Amount = this.product.Quantity * this.product.Price;
      this.Subtotal += this.product.Amount;
      this.GST = (this.Subtotal * 18) / 100;
      this.Total = this.Subtotal + this.GST - this.Discount
    }
    if (this.form.controls["currency"].value == 2) {
      this.product.Amount = this.product.Quantity * this.product.Price;
      this.Subtotal += this.product.Amount;
      this.Total = this.Subtotal - this.Discount
    }



    const p = { ...this.product };
    console.log(p)
    this.products.push(p)

    this.product.Description = '';
    this.product.Quantity = 0;
    this.product.Price = 0;
    this.product.Amount = 0;
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
    console.log(this.form)
    console.log(form.value)
    console.log(this.products);
    return this.http.post('http://localhost:3000/createinvoice', { createdBy: localStorage.getItem('id'), data: form.value, products: this.products, total: this.Total })
      .subscribe(data => {
        console.log(data)
      })
  }
  onSelect() {
    let value = parseInt(this.form.controls["creator"].value)
    console.log(value)
    switch (value) {
      case 0:
        this.invoiceNumber = "xxx/ALH/2021"
        break;
      case 1:
        this.invoiceNumber = "xxx/SA/2021"
        break;
      case 2:
        this.invoiceNumber = "xxx/MG/2021"
        break;
      default:
        console.log("hiii")
    }
  }
  onSelectState() {
    let value = parseInt(this.form.controls["state"].value)
    console.log(value)
    switch (value) {
      case 0:
        this.isstate = true;
        this.isOutofstate = false;
        break;
      case 1:
        this.isOutofstate = true;
        this.isstate = false;
        break;

      default:
        console.log("hiii")
    }
  }
}