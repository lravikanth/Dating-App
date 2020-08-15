import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { AuthGuard } from './_gaurds/auth.guard';
import { Component } from '@angular/core';
import { Routes, CanActivate, Resolve } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error-interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { PreventUnsaveChanges } from './_gaurds/prevent-unsaved-changes.guard';



export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', 
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        { path: 'members', component: MemberListComponent, resolve: {users : MemberListResolver} },  
        { path: 'members/:id', component: MemberDetailsComponent,resolve:{user: MemberDetailResolver } }, //'users' is how data is accessed on component
        { path: 'messages', component: MessagesComponent },
        { path: 'lists', component: ListComponent },
        { path: 'member/edit', component: MemberEditComponent, resolve:{user: MemberEditResolver}, canDeactivate: [PreventUnsaveChanges] }
      ], 
    },
    { path: '**', redirectTo:'' , pathMatch: 'full' }
];
