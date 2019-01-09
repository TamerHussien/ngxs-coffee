import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';

import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { GetCoffeeList, AddToCart } from '../../state/app.actions';
import { AppState } from '../../state/app.state';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  // @Select((state: App) => state.app.coffeeList)
  @Select(AppState.coffeeList)
  list$;

  isFeatureRemixOn = environment.features.remix;

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
    const isListPopulated = this.store.selectSnapshot<AppModel>(x => x.app.coffeeList.length);
    if (isListPopulated) { return; }
    this.store.dispatch(new GetCoffeeList());

    // this.store.selectOnce(x => x.app.coffeeList.length)
    //   .subscribe(x => {
    //     if (x) { return; }
    //     this.store.dispatch(new GetCoffeeList());
    //   });

  }

  addToCart(name: string) {
    this.store.dispatch(new AddToCart(name));
  }

  addToCartAndCheckout(name: string) {
    this.addToCart(name);
    this.router.navigateByUrl('/cart');
  }
}
