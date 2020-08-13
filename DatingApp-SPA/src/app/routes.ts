import { AuthGuard } from './_gaurds/auth.guard';
import { Component } from '@angular/core';
import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error-interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', 
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        { path: 'members', component: MemberListComponent},
        { path: 'messages', component: MessagesComponent },
        { path: 'lists', component: ListComponent }
      ], 
    },
    { path: '**', redirectTo:'' , pathMatch: 'full' }
];
