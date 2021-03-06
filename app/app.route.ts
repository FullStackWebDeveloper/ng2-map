import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SimpleInfoWindowComponent } from './map-components/simple-info-window.component';
import { SimpleMapComponent } from './map-components/simple-map.component';
import { SimpleCircleComponent } from './map-components/simple-circle.component';
import { SimpleMarkerComponent } from './map-components/simple-marker.component';
import { TextLabelComponent } from './map-components/text-label.component';
import { MarkerNgForComponent } from './map-components/marker-ng-for.component';
import { MultipleMapComponent } from './map-components/multiple-map.component';
import { PolygonComponent } from './map-components/polygon.component';
import { MapWithOptionsComponent } from "./map-components/map-with-options.component";
import { SimplePolylineComponent } from "./map-components/simple-polyline.component";
import { SimpleGroundOverlayComponent } from "./map-components/simple-ground-overlay.component";
import { BicyclingLayerComponent } from "./map-components/bicycling-layer.component";
import { TrafficLayerComponent } from "./map-components/traffic-layer.component";
import { TransitLayerComponent } from "./map-components/transit-layer.component";
import { HeatmapLayerComponent } from "./map-components/heatmap-layer.component";
import { KmlLayerComponent } from "./map-components/kml-layer.component";
import { DataLayerComponent } from "./map-components/data-layer.component";
import { StreetViewPanoramaComponent } from "./map-components/street-view-panorama.component";
import { PlacesAutoCompleteComponent } from "./map-components/places-auto-compolete.component";
import { DirectionsRendererComponent } from "./map-components/directions-renderer.component";
import { DrawingManagerComponent } from "./map-components/drawing-manager.component";
import { EventArgumentsComponent } from "./map-components/event-arguments.component";

export const routes: Routes = [
  { path: 'bicycling-layer', component: BicyclingLayerComponent },
  { path: 'data-layer', component: DataLayerComponent },
  { path: 'directions-renderer', component: DirectionsRendererComponent },
  { path: 'drawing-manager', component: DrawingManagerComponent },
  { path: 'heatmap-layer', component: HeatmapLayerComponent },
  { path: 'kml-layer', component: KmlLayerComponent },
  { path: 'map-with-options', component: MapWithOptionsComponent },
  { path: 'marker-ng-for', component: MarkerNgForComponent },
  { path: 'multiple-map', component: MultipleMapComponent },
  { path: 'places-auto-complete', component: PlacesAutoCompleteComponent },
  { path: 'polygon', component: PolygonComponent },
  { path: 'simple-circle', component: SimpleCircleComponent },
  { path: 'simple-ground-overlay', component: SimpleGroundOverlayComponent },
  { path: 'simple-info-window', component: SimpleInfoWindowComponent },
  { path: 'simple-map', component: SimpleMapComponent },
  { path: 'simple-marker', component: SimpleMarkerComponent },
  { path: 'text-label', component: TextLabelComponent },
  { path: 'simple-polyline', component: SimplePolylineComponent },
  { path: 'street-view-panorama', component: StreetViewPanoramaComponent },
  { path: 'traffic-layer', component: TrafficLayerComponent },
  { path: 'transit-layer', component: TransitLayerComponent },
  { path: 'event-arguments', component: EventArgumentsComponent },
  { path: '',  redirectTo: '/simple-marker', pathMatch: 'full' },
];

export const APP_ROUTER_PROVIDERS: ModuleWithProviders = RouterModule.forRoot(routes);
export const APP_ROUTER_COMPONENTS = [
  BicyclingLayerComponent,
  DataLayerComponent,
  DirectionsRendererComponent,
  DrawingManagerComponent,
  EventArgumentsComponent,
  HeatmapLayerComponent,
  KmlLayerComponent,
  MapWithOptionsComponent,
  MarkerNgForComponent,
  MultipleMapComponent,
  PlacesAutoCompleteComponent,
  PolygonComponent,
  SimpleCircleComponent,
  SimpleGroundOverlayComponent,
  SimpleInfoWindowComponent,
  SimpleMapComponent,
  SimpleMarkerComponent,
  TextLabelComponent,
  SimplePolylineComponent,
  StreetViewPanoramaComponent,
  TrafficLayerComponent,
  TransitLayerComponent
];

