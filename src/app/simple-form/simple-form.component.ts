import { Component } from '@angular/core';
import { TitleService } from '../title.service';
import { Title } from '../title.model';
import { Customer } from '../customer.modal';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.sass'],
  providers: [ TitleService ]
})
export class SimpleFormComponent {
  public titleList: Title[] | undefined
  public model = new Customer()
  public clickedInactiveButton = false
  constructor( private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.getTitles().subscribe((titles) => {
      this.titleList = titles.filter( title => title.name !== '!' ).sort((a,b) => a.name > b.name ? 1 : -1)
      this.model.title = titles.find( title => title.isDefault )?.name
    })
  }

  onSubmit(isValid: boolean) {
    if (isValid && (this.clickedInactiveButton = true) ) {
      console.log( this.model )
    } else {
      this.clickedInactiveButton = true
    }
  }
}
