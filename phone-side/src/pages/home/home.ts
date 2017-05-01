import { Component } from '@angular/core';
import { NavController, AlertController,LoadingController } from 'ionic-angular';

import { Stripe } from '@ionic-native/stripe';


import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Stripe]
})
export class HomePage {

    public token;
    loading: any;
    public money:number=0;

    constructor(
        public navCtrl: NavController,
        private stripe: Stripe,
        private http: Http,
        private alertCtrl: AlertController,
        public loadingCtrl: LoadingController

    ) {
       
    }

    presentPrompt() {
        let alert = this.alertCtrl.create({
            title: 'card information',
            inputs: [
                {
                    name: 'cardNumber',
                    placeholder: 'card number',
                   
                },
                {
                    name: 'expMonth',
                    placeholder: 'expMonth',
                  
                },
                {
                    name: 'expYear',
                    placeholder: 'expYear',

                },
                {
                    name: 'cvc',
                    placeholder: 'cvc',

                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Go',
                    handler: data => {
                        this.loading.present();
                        //test
                        this.stripe.setPublishableKey('pk_test_KFuKDO7ayBQ3tw9nsQAYGls5');
                        //this.stripe.setPublishableKey('pk_live_DHwxcZn1QkjzG44dllKG4ViT');
                        let card = {
                            number: data.cardNumber,
                            expMonth: data.expMonth,
                            expYear: data.expYear,
                            cvc: data.cvc
                        };

                        this.stripe.createCardToken(card)
                            .then(token => this.token = token

                        )
                            .catch(error => console.error(error));

                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        console.log("charging you use" + this.token);


                        let body = {
                            token: this.token
                        };
                        //console.log(JSON.stringify(body.token));

                        this.http.post('http://192.168.1.64:3000/charge',
                            JSON.stringify(body), { headers: headers })

                            .subscribe(data => {
                                this.loading.dismiss();
                                if (data) {
                                    this.money = this.money+20;
                                }
                                console.log(data);
                            });

                    }
                }
            ]
        });
        alert.present();
        this.loading = this.loadingCtrl.create();
       
    }

     //test
      //  this.stripe.setPublishableKey(' pk_test_KFuKDO7ayBQ3tw9nsQAYGls5');


}
