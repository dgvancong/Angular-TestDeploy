import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
  ],
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule
  ],
})
export class AppModule { }
