import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TestversionGuard implements CanActivate {

  redirectUrl: string;
  private _testversionInfoAccepted = false;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._checkTestversionInfoAccepted(state.url);
  }

  acceptTestversionInfo() {
    this._testversionInfoAccepted = true;
  }

  private _checkTestversionInfoAccepted(url: string): boolean {
    if (this._testversionInfoAccepted) {
      return true;
    }

    this.redirectUrl = url;
    this.router.navigate(['/init']);
    return false;
  }

}
