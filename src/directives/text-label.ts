import { Directive, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { BaseMapDirective } from './base-map-directive';
import { Ng2MapComponent } from '../components/ng2-map.component';

const INPUTS = [
  'anchorPoint', 'animation', 'clickable', 'cursor', 'draggable', 'icon', 'label', 'opacity',
  'optimized', 'place', 'position', 'shape', 'title', 'visible', 'zIndex', 'options', 'text', 'fontFamily', 'fontSize', 'fontColor', 'strokeWeight', 'strokeColor', 'align'
];
const OUTPUTS = [
  'animationChanged', 'click', 'clickableChanged', 'cursorChanged', 'dblclick', 'drag', 'dragend', 'draggableChanged',
  'dragstart', 'flatChanged', 'iconChanged', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'positionChanged', 'rightclick',
  'dhapeChanged', 'titleChanged', 'visibleChanged', 'zindexChanged'
];


@Directive({
  selector: 'ng2-map > text-label',
  inputs: INPUTS,
  outputs: OUTPUTS,
})
export class TextLabel extends BaseMapDirective {
  public mapObject: google.maps.Marker;
  public objectOptions: google.maps.MarkerOptions = <google.maps.MarkerOptions>{};
  public mapLabel: MapLabel;  

  constructor(private ng2MapComp: Ng2MapComponent) {
    super(ng2MapComp, 'Marker', INPUTS, OUTPUTS);    
  }

  initialize(): void {
    super.initialize();
    this.setPosition();    
  }

  setPosition(): void {
    if (!this['position']) {
      this.ng2MapComp.geolocation.getCurrentPosition().subscribe(position => {
        console.log('setting marker position from current location');
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);        
        this.mapObject.setPosition(latLng);
        this.mapLabel = new MapLabel({
          text: this['text'],
            position: latLng,
            panes: this.ng2MapComp.el,
            fontSize: this['fontSize'],
            fontColor: this['fontColor'],
            strokeWeight: this['strokeWeight'],
            strokeColor: this['strokeColor'],
            align: 'right',
            map: this.mapObject.getMap()
        });
        this.mapLabel.onAdd();
      });
    } else if (typeof this['position'] === 'string') {
      this.ng2MapComp.geoCoder.geocode({address: this['position']}).subscribe(results => {
        console.log('setting marker position from address', this['position']);        
        this.mapObject.setPosition(results[0].geometry.location);        
        if(!this.mapLabel){
          this.mapLabel = new MapLabel({
            text: this['text'],
            position: results[0].geometry.location,
            panes: this.ng2MapComp.el,
            fontSize: this['fontSize'],
            fontColor: this['fontColor'],
            strokeWeight: this['strokeWeight'],
            strokeColor: this['strokeColor'],
            align: this['align'],
            map: this.mapObject.getMap()
          });
          this.mapLabel.onAdd();
        }
        this.mapLabel.draw(results[0].geometry.location);
      });
    }
  }
}

export class MapLabel{
  canvas_: any;
  fontFamily = 'sans-serif';
  fontSize = '36';
  fontColor = '#000000';
  strokeWeight = '24';
  strokeColor = '#ffffff';
  align = 'center';
  zIndex = '0';
  text = 'edrrdrdrd';
  position: google.maps.LatLng;
  map:google.maps.Map;
  public mapOverlayView: google.maps.OverlayView;

  public panes: HTMLElement;
  
  constructor(values: any){
    this.position = new google.maps.LatLng(34.03, -118.235);
    this.mapOverlayView = new google.maps.OverlayView();
    this.mapOverlayView.draw = function() {};
    this.setValues(values);    
  }

  setValues(value: any){
    this.text=value.text || this.text;
    this.position = value.position || this.position;
    this.panes = value.panes|| this.panes;
    this.fontFamily = value.fontFamily|| this.fontFamily;
    this.fontSize = value.fontSize|| this.fontSize;
    this.fontColor = value.fontColor|| this.fontColor;
    this.strokeWeight = value.strokeWeight|| this.strokeWeight;
    this.strokeColor = value.strokeColor|| this.strokeColor;
    this.align = value.align|| this.align;
    this.map = value.map|| this.map;
    this.mapOverlayView.setMap(value.map);
    console.log(this.mapOverlayView.getProjection());
  }

  public change(prop){    
    switch (prop) {
      case 'fontFamily':
      case 'fontSize':
      case 'fontColor':
      case 'strokeWeight':
      case 'strokeColor':
      case 'align':
      case 'text':
        return this.drawCanvas_();
      case 'maxZoom':
      case 'minZoom':
      case 'position':
        return this.draw(this.position);
    }
  }
  
  public onAdd(){
    let canvas = this.canvas_ = document.createElement('canvas');
    let style = canvas.style;
    style.position = 'absolute';
    let ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.textBaseline = 'top';

    this.drawCanvas_();
    this.panes.appendChild(canvas);    
  }

  public getMarginLeft_(textWidth) {
    switch (this.align) {
      case 'left':
        return 0;
      case 'right':
        return -textWidth;
    }
    return textWidth / -2;
  }

  public drawCanvas_() {   

    let canvas = this.canvas_;
    if (!canvas) return;

    let style = canvas.style;
    style.zIndex = this.zIndex;

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fontColor;
    ctx.font = this.fontSize + 'px ' + this.fontFamily;

    let strokeWeight = Number(this.strokeWeight);

    let text = this.text;

    if (text) {
      if (strokeWeight) {
        ctx.lineWidth = strokeWeight;
        ctx.strokeText(text, strokeWeight, strokeWeight);
      }

      ctx.fillText(text, strokeWeight, strokeWeight);

      let textMeasure = ctx.measureText(text);
      let textWidth = textMeasure.width + strokeWeight;
      style.marginLeft = this.getMarginLeft_(textWidth) + 'px';      
      style.marginTop = '-0.4em';
    }
  }

 public draw(position: google.maps.LatLng) {    
    let projection = this.map.getProjection();
    this.position = position;
    let latLng = position;
    let bounds = this.map.getBounds();
    let topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
    let bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
    let scale = Math.pow(2, this.map.getZoom());
    let pos = projection.fromLatLngToPoint(latLng);
    
    console.log("projection"+"========="+projection);
    console.log(this.map.getProjection());
    if (!projection) {
      // The map projection is not ready yet so do nothing
      return;
    }
    console.log("canvas"+"========="+this.canvas_);
    if (!this.canvas_) {
      // onAdd has not been called yet.
      return;
    }

    
    console.log("canvas"+"========="+latLng);
    if (!latLng) {
      return;
    }

    

    let style = this.canvas_.style;

    style.top = pos.y + 'px';
    style.left = pos.x + 'px';
    style.visibility = this.getVisible_();
    console.log(style.top+"============"+style.left);
  }

  public getVisible_() {
    let minZoom = (this.map.get('minZoom'));
    let maxZoom = (this.map.get('maxZoom'));

    if (minZoom === undefined && maxZoom === undefined) {
      return '';
    }

    let map = this.map;
    if (!map) {
      return '';
    }

    let mapZoom = map.getZoom();
    if (mapZoom < minZoom || mapZoom > maxZoom) {
      return 'hidden';
    }
    return '';
  }

  public onRemove() {
    let canvas = this.canvas_;    
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }
}
