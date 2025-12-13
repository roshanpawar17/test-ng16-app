import { BehaviorSubject, Observable, Subject } from "rxjs";

export class NgThemeService {
    currentTheme: string = 'light';

    users: string[] = ['Roshan'];

    private refreshSubject = new Subject<number>();
    refresh$ = this.refreshSubject.asObservable();

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    login() {
        this.isLoggedInSubject.next(true);
    }

    logout() {
        this.isLoggedInSubject.next(false);
    }

    // refresh = new Observable((observer) => {
    //     observer.next(Math.random())
    // })

    triggerRefresh() {
        this.refreshSubject.next(Math.random());
    }

    onSubscribe() {
        alert('Theme subscription activated.');
        console.log(`Subscribed to theme changes. Current theme is ${this.currentTheme}.`);
    }
}