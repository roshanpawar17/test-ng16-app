export class NgThemeService {
    currentTheme: string = 'light';

    users: string[] = ['Roshan'];

    onSubscribe() {
        alert('Theme subscription activated.');
        console.log(`Subscribed to theme changes. Current theme is ${this.currentTheme}.`);
    }
}