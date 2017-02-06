/// <reference types="googlemaps" />
import { BaseMapDirective } from './base-map-directive';
import { Ng2MapComponent } from '../components/ng2-map.component';
export declare class Textlabel extends BaseMapDirective {
    private ng2MapComp;
    mapLabel: google.maps.OverlayView;
    mapObject: google.maps.Marker;
    objectOptions: google.maps.MarkerOptions;
    constructor(ng2MapComp: Ng2MapComponent);
    initialize(): void;
    setPosition(): void;
}
