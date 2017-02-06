import { Component, ElementRef } from '@angular/core';

let templateStr: string = `
  <h1>Text Label</h1>
  <ng2-map center="Brampton, Canada" 
    (click)="log($event)"
    [scrollwheel]="false">
    <text-label position="Brampton, Canada"
      text = "asdfa"
      fontFamily = "sans-serif"
      fontSize = "42"
      fontColor = "#ff0000"
      strokeWeight = "14"
      strokeColor = "#aaffff"
      align = "center"
      zIndex = "1e3"
      (dragstart)="log($event, 'dragstart')"
      (dragend)="log($event, 'dragend')"
      draggable="true"></text-label>
  </ng2-map>
  <code>
    <br/><b>HTML</b>
    <pre>{{templateStr | htmlCode:'-code'}}</pre>
    <b>log function</b> 
    <pre>{{log|jsCode}}</pre>
  </code>
`;

@Component({ template: templateStr })
export class TextLabelComponent {
  templateStr: string = templateStr;
  log(event, str) {
    if (event instanceof MouseEvent) {
      return false;
    }
    console.log('event .... >', event, str);
  }
}
