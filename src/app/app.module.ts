import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

import { AppRoutingModule } from './app.routing';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './_components/alert.component';
import { AddFileModalComponent } from './add-file-modal/add-file-modal.component';
import { ShareBucketModalComponent } from './share-bucket-modal/share-bucket-modal.component';
import { CreateBucketModalComponent } from './create-bucket-modal/create-bucket-modal.component';
import { DeleteBucketModalComponent } from './delete-bucket-modal/delete-bucket-modal.component';

@NgModule({
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatDialogModule,
      FormsModule,
      NgbModule
   ],
   declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      AlertComponent,
      AddFileModalComponent,
      ShareBucketModalComponent,
      CreateBucketModalComponent,
      DeleteBucketModalComponent
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      AddFileModalComponent
   ]
})
export class AppModule { };