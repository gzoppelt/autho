import {DomainModelsUser, UserConfig} from './domainModelsUser';

export class DomainModelsUserFactory {
    create(userInfo: UserConfig) {
        return new DomainModelsUser(userInfo);
    }
}