export interface UserConfig {
    name: string;
    email: string;
    rating: number;
    javascript: boolean;
    ruby: boolean;
    php: boolean;
}

export class DomainModelsUser {
    name: string;
    email: string;
    rating: number;

    constructor(user: UserConfig) {
        console.log('constructor: ', user);
        this.name = user.name;
        this.email = user.email;
        this.rating = this.calculateRating(user);
    }

    private calculateRating(userInfo: UserConfig) {
        var rating = 0;
        if (userInfo.javascript) rating += 30;
        if (userInfo.ruby) rating += 20;
        if (userInfo.php) rating += 50;
        return rating;
    }

    save() {
        console.log('saved: ', this.name, this.email, this.rating);
    }

    public static GetByName(name: string) {
        //HTTP request would go here
        return new DomainModelsUser({
            name: 'Gonto',
            email: 'gonto@auth0.com',
            rating: 42,
            javascript: true,
            ruby: true,
            php: false
        });
    }
}
