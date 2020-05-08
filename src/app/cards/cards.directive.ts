import { CardTemplatesComponent } from './card-templates.component';
import { Directive, Input, OnInit, ViewContainerRef, TemplateRef, ComponentFactoryResolver, Injector, Renderer2, ElementRef, ComponentRef} from '@angular/core';
import { Card, CardTemplateContext, CardTypes } from './card.type';

@Directive({
  selector: '[ybCards]'
})
export class CardsDirective implements OnInit{

  @Input('ybCardsIn') cards:Card[];
  @Input('ybCardsPrimary') primaryTemlate:TemplateRef<CardTemplateContext>;

  constructor(private viewContainer:ViewContainerRef,
              private cfr:ComponentFactoryResolver,
              private injector:Injector,
              private rendrer:Renderer2,
              private hostElement:ElementRef) {

  }
  ngOnInit():void{
    console.log(this.primaryTemlate);

    this.createWrapper();
    this.createTemplateComponent();

  }
  createWrapper():void{
    const parrentNode = this.rendrer.parentNode(this.hostElement.nativeElement)
    const wrapper = this.rendrer.createElement('div');

    this.rendrer.addClass(wrapper,'card-deck');

    this.rendrer.insertBefore(parrentNode,wrapper,this.hostElement.nativeElement);
    this.rendrer.removeChild(parrentNode,this.hostElement.nativeElement);
    this.rendrer.appendChild(wrapper,this.hostElement.nativeElement);
  }

  createTemplateComponent():void{
    const cardTemplateFactory = this.cfr.resolveComponentFactory<CardTemplatesComponent>(CardTemplatesComponent);
    const cardTemplate:ComponentRef<CardTemplatesComponent> = cardTemplateFactory.create(this.injector);

    this.cards.forEach(card => {
      this.rendrerTemplate(card,cardTemplate);
    });
  }
    rendrerTemplate(card:Card,templateComponent:ComponentRef<CardTemplatesComponent>):void{
      switch (card.type) {

        case CardTypes.Plain:
          this.viewContainer.createEmbeddedView(templateComponent.instance.plainCard,{$implicit:card})
          break;

          case CardTypes.Primary:
         this.viewContainer.createEmbeddedView( this.primaryTemlate || templateComponent.instance.primaryCard,{$implicit:card})
          break;
      }
    }

}
