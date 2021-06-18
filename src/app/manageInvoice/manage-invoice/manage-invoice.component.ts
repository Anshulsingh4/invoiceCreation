import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.css']
})
export class ManageInvoiceComponent implements OnInit {


  searchText;
  username;
  invoice;
  invoiceIds = [];
  dummyArray = [];
  allData: any;
  batch = '0';
  pdfData;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get("http://localhost:4000/manageInvoice").subscribe(res => {
      // console.log(res)
      this.allData = res['invoices']
      this.username = res['username']
      this.dummyArray = this.allData;
      console.log(this.allData)
    })

  }

  onselectCheckbot(event, id) {

    console.log(id)
    if (event.target.checked) {
      this.invoiceIds.push(id);
    }
    else {
      const target = this.invoiceIds.findIndex(invoiceid => {
        return invoiceid === id
      });
      this.invoiceIds.splice(target, 1);
    }
    console.log(this.invoiceIds)
    console.log(this.batch)
  }

  updatestatus() {
    this.http.post('http://localhost:4000/updatestatus', { ids: this.invoiceIds, status: this.batch })
      .subscribe(res => {
        console.log(res)
        this.http.get('http://localhost:4000/manageinvoice').subscribe(res => {
          console.log(res);
          this.dummyArray = res['invoices']
          this.username = res['username']
        })
      })

  }

  onAll() {
    this.dummyArray = this.allData
  }

  onPaid() {
    this.dummyArray = []
    for (let i of this.allData) {
      if (i.status === "Paid") {
        this.dummyArray.push(i)
      }
    }
  }

  onUnpaid() {
    this.dummyArray = []
    for (let i of this.allData) {
      if (i.status === "Unpaid") {
        this.dummyArray.push(i)
      }
    }
  }
  onCancel() {
    this.dummyArray = []
    for (let i of this.allData) {
      if (i.status === "Cancelled") {
        this.dummyArray.push(i)
      }
    }
  }

  onPending() {
    this.dummyArray = []
    for (let i of this.allData) {
      if (i.status === "pending") {
        this.dummyArray.push(i)
      }
    }
  }

  onDelete(id: String) {
    this.http.get('http://localhost:4000/deleteInvoice/' + id).subscribe(res => {
      console.log(res)
      alert("User deleted")
      this.dummyArray = this.dummyArray.filter(user => user._id !== id)
    })
  }

  generatepdf(id: String) {
    this.http.get('http://localhost:4000/manageinvoice/' + id)
      .subscribe(res => {
        this.pdfData = res;
        console.log(this.pdfData)
        let pdfproducts = []
        let sn = 1;
        for (let i of this.pdfData.productDetails) {
          const newarray = []
          newarray.push(sn)
          newarray.push(i['productName'])
          newarray.push(i['amount'])
          newarray.push(i['price'])
          newarray.push(i['quantity'])
          pdfproducts.push(newarray)
          sn = sn + 1
        }

        let docDefinition = {
          content: [
            {
              text: 'INVOICE',
              fontSize: 20,
              bold: true,
              alignment: 'center',
              decoration: 'underline',
              color: 'black',
              style: 'sectionHeader'
            },
            {
              text: `
            
            
            `
            },
            // Previous configuration  
            {
              columns: [
                [
                  {
                    text: `Customer Name: ${this.pdfData.customerName}`,
                  },
                  {
                    text: `Address: ${this.pdfData.address}`
                  },
                  {
                    text: `Contact no.: ${this.pdfData.contactNumber}`
                  },
                  {
                    text: `Email: ${this.pdfData.email}`
                  },
                  {
                    text: `Invoice No.: ${this.pdfData.invoiceNumber}\n\n\n\n\n`
                  },
                ],
                [
                  {
                    text: `Date: ${new Date().toLocaleString()}`,
                    alignment: 'right'
                  },
                  {
                    text: `Bill No: ${(Math.random() * 1000).toFixed(0)}`,
                    alignment: 'right'
                  }
                ]
              ],

            },

            {
              text: `
              
              
                
              `
            },
            {
              table: {
                headerRows: 1,
                margin: [0, 190, 0, 80],
                widths: ['auto', '*', 'auto', 'auto', 'auto'],
                body: [
                  ['S No.', 'Product Name', 'Amount', 'price', 'quantity'],
                  ...pdfproducts
                ]
              }
            },
            {
              text: `\n\nRupees: Seven hundred and ninety eight  \n\n`,
              bold: true,
            },
            {
              text: `PAN No AADCD0760G`
            },
            {
              text: `GST NO 06AADCD0760G121`
            },
            {
              text: ` Lut No. 154/CGSTIDIMSION North/GGN/2017-18dated04 10.2017\n\n\n\n`
            },
            {
              text: `Bank Details\n\n`,
              bold: true,
            },
            {
              text: `Account Name BigStep Technologies Pvt Ltd.`
            },
            {
              text: `Account Na 10022560000 199 
                    Bank HDFC Bank Ltd.
                    Account Address HDFC Bank Ltd. DSS 13 Old Judicial Complex, 
                    Civil Lines. Gurgaon-122001.Haryana.
                    India FSC Code HDFC0009113`
            },
            {
              text: `
              
              
              
              
              
              `
            },
            {
              columns: [
                {
                  text: `Bigstep Technologies Private Limited.
                  2nd Floor, SCO-63 Judical Complex,
                  Sector 15, Gurgaon - 122001, Haryana, India
                  CIN: U77220HR2009PTC038717`,
                },
                {
                  text: `Phone: +91-9136773059
              Email: info@bigsteptech.com
              http://www.bigsteptech.com `,
                  alignment: 'right'
                },

              ]
            },
          ]
        }
        pdfMake.createPdf(docDefinition).download();

      })// this.pdfData = this.activatedRoute.snapshot.data
    // console.log(this.data.downloadData.productDetails)  
  }
}



