import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[DatePipe]
})
export class HomeComponent implements OnInit {
  @Input() data: any[];
  BlogeerList; 
  tempBlogDetail = { Title: '', Content: '' ,CreatedDate:''}; //temporary list same as home model
  formFlag = false;
  btnText = 'Show Form'; // button text 
  selectedIndex; // undefiend variable to keep track of index 

  isDesc = false; // variable to define the button change which acts as flag
  column = ''; // to keep the name of column while sorting

  desc:boolean=false;

  constructor(private homeService:HomeService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.BlogeerList = this.homeService.getBloggerDetailsList();
    this.selectedIndex = -1;
    this.data=this.BlogeerList;
  }
   // Delete button to delete the record 
  deleteBlog(index) {
    this.homeService.deletBloggerContent(index);
    this.selectedIndex = -1;
  }

  // Add New Blog after filling data
  addBlog() {
    var date = new Date();
    var transformedDate = this.datePipe.transform(date,"dd-MM-yyyy");
    this.tempBlogDetail.CreatedDate=transformedDate;
    this.homeService.addBloggerContent(this.tempBlogDetail);
    this.tempBlogDetail = { Title: '', Content: '' ,CreatedDate:''};
  }
//When Edit button is clicked for editing the data of table
  editClicked(index) {
    this.selectedIndex = index;
    this.tempBlogDetail = Object.assign({}, this.BlogeerList[index]);
  }

  //When Save button is clicked after updating the data of table
  saveClicked(index) {
    this.homeService.updateBloggerContent(index, this.tempBlogDetail);
    this.selectedIndex = -1;
    this.tempBlogDetail = { Title: '', Content: '',CreatedDate:''};
  }
// when used doesn't want to edit the details , so cancel button is provided
  cancelClicked(index) {
    this.selectedIndex = -1;
    this.tempBlogDetail = { Title: '', Content: '',CreatedDate:''};
  }
  
  //function to show or hide the add blog form
  toggleForm() {
    this.formFlag = !this.formFlag;
    this.btnText = this.formFlag ? 'Hide Form' : 'Show Form';
  }

  // Sort method declared and can be reused in any application
  private sort(property) {
    this.desc=true;
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    const direction = this.isDesc ? 1 : -1;
    if (!this.data) {
        return;
    }

    this.data.sort(function (a, b) {
        if (a[property] < b[property]) {
            return -1 * direction;
        } else if (a[property] > b[property]) {
            return 1 * direction;
        } else {
            return 0;
        }
    });
}
}

