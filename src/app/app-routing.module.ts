import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CheckAccessService } from './guards/checkaccess';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [CheckAccessService],
    data: { 'accessLevel': '1' },
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'adminonly',
    canLoad: [CheckAccessService],
    data: { 'accessLevel': '4' },
    loadChildren: './adminonly/adminonly.module#AdminonlyPageModule',
  },
  {
    path: 'scheduled',
    canActivate: [CheckAccessService],
    data: { 'accessLevel': 0, 'scheduled': [1,2,3,4,5] },
    loadChildren: './scheduled/scheduled.module#ScheduledPageModule'
  },
  {
    path:
      'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
