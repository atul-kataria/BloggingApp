import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Home } from '../Model/home';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  BloggerContent:Home[];
  constructor(private datePipe:DatePipe) { 
    // var date = new Date();
    // var transformedDate = this.datePipe.transform(date,"dd-MM-yyyy");
    this.BloggerContent = [
      { Title: 'Blog 1 ', Content: 'Mumbai',CreatedDate:'04-01-2021' },
      { Title: 'Blog 2', Content: 'Chennai',CreatedDate:'05-01-2021' },
      { Title: 'Blog 3', Content: 'London',CreatedDate:'01-01-2021' },
      { Title: 'Blog 4', Content: 'Chennai',CreatedDate:'08-01-2021' }
    ];
    
  }
  getBloggerDetailsList(): Home[] {
    return this.BloggerContent;
  }

  addBloggerContent(Content) {
    this.BloggerContent.push(Content);
  }

  deletBloggerContent(index) {
    this.BloggerContent.splice(index, 1);
  }

  updateBloggerContent(index, contnet) {
    this.BloggerContent.splice(index,1, contnet);
  }
}
