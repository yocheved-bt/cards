import { Component } from '@angular/core';
import { CardTypes,Card } from './cards/card.type';

@Component({
  selector: 'app-root',
  template: `<div class="container">
                <h1 class="display-1">Cards</h1>
                <ng-container *ybCards="let card in cards; primary altPrimary"></ng-container>
            </div>
            <ng-template #altPrimary let-card>
                <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
                    <div class="card-header">{{card.header}} </div>
                    <div class="card-body">
                      <h5 class="card-title">{{card.title}}</h5>
                      <p class="card-text">{{card.text}}</p>
                    </div>
                  </div>
                </ng-template>
            `,
})
export class AppComponent {
 cards:Card[] =[
   {
    type:CardTypes.Plain,
    title: 'title card 1',
    text: 'text for card one',
  },
  {
    type:CardTypes.Plain,
    title: 'title card 2',
    text: 'text for card two',
  },
  {
    type:CardTypes.Primary,
    title: 'title card 3',
    text: 'text for card three',
    header: 'some nice header for card',
    smallText: 'small text for primary card'
  },

];
}
