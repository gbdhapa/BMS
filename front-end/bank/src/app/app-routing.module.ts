import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { DepositComponent } from './component/deposit/deposit.component';
import { WithdrawComponent } from './component/withdraw/withdraw.component';
import { TransferComponent } from './component/transfer/transfer.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { ViewbalanceComponent } from './component/viewbalance/viewbalance.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'profiles', component: ProfilesComponent  ,canActivate:[AuthGuard]},
  { path: 'deposit', component: DepositComponent  ,canActivate:[AuthGuard] },
  { path: 'withdraw', component: WithdrawComponent  ,canActivate:[AuthGuard] },
  { path: 'transfer', component: TransferComponent  ,canActivate:[AuthGuard]},
  { path: 'viewbalance', component: ViewbalanceComponent  ,canActivate:[AuthGuard]},
  { path: 'transactions', component: TransactionsComponent  ,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
