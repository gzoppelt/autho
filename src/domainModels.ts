//domainModels.ts

import { Component, View, bootstrap, bind, FORM_DIRECTIVES, Inject } from 'angular2/angular2';

import { DomainModelsUser, UserConfig } from './models/domainModelsUser';

import { DomainModelsUserFactory } from './models/domainModelsUserFactory'

@Component({
    selector: 'users'
})
@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'domainModels.html'
})
class UsersAppComponent {
    userFactory : DomainModelsUserFactory;
    user: any;

    constructor(userFactory: DomainModelsUserFactory) {
        this.userFactory = userFactory;
    }

    submit(userInfo: UserConfig) {
        this.user = this.userFactory.create(userInfo);
        console.log('userInfo: ', userInfo, this.user);
        this.user.save();
        this.getUser();
    }

    getUser() {
        console.log("getting user from server: ", DomainModelsUser.GetByName('gonto'));
    }
}

bootstrap(UsersAppComponent, [DomainModelsUserFactory]);

