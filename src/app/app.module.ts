import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule , Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { EditemployeeComponent } from './components/editemployee/editemployee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EmployeeService } from './services/employee.service';
import { EmployeesComponent } from './components/employees/employees.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { HotToastModule } from '@ngneat/hot-toast';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from './services/auth.service';
import { AuthGuard  } from './guards/auth.guard';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);

const appRoutes:Routes=[
  {path:'',pathMatch:'full', component:DashboardComponent,...canActivate(redirectToLogin)},
  {path:'register', component:RegisterComponent,...canActivate(redirectToHome)},
  {path:'add-employee', component:AddemployeeComponent,...canActivate(redirectToLogin)},
  {path:'edit-employee/:id', component:EditemployeeComponent,...canActivate(redirectToLogin)},
  {path:'employee/:id', component:EmployeeInfoComponent,...canActivate(redirectToLogin)},
  {path:'login', component:LoginComponent,...canActivate(redirectToHome)},

]


 export const firebaseConfig = {
  apiKey: "AIzaSyCEhTK7lTP06MXx4_DcfTtEaMstpf1VCxs",
  authDomain: "employeesmanagement-7f195.firebaseapp.com",
  databaseURL: "https://employeesmanagement-7f195-default-rtdb.firebaseio.com",
  projectId: "employeesmanagement-7f195",
  storageBucket: "employeesmanagement-7f195.appspot.com",
  messagingSenderId: "427425080978",
  appId: "1:427425080978:web:48e54ff129599b6fcfa84b",
  measurementId: "G-H2XRDT146Y"
};

// const firebaseApp = initializeApp(firebaseConfiguration);
// const firebaseAuth = getAuth(firebaseApp);
// signInAnonymously(firebaseAuth)
// .then(() => {
//     console.log("works")
// })

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeInfoComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    provideFirebaseApp(()=> initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    MatMenuModule


    // 7.24.0
  ],
  providers: [
    AngularFireDatabase,
    EmployeeService,
    AuthService,
    AngularFireAuth,
    AuthGuard,
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
