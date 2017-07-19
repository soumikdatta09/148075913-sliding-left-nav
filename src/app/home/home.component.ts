import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Language } from 'angular-l10n';
import { Router, NavigationEnd } from '@angular/router';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    @Language() lang: string;
    headerValue = '';
    @Output() headerChange = new EventEmitter();
    public date: any;
    public data: string;
    public role: string;
    public token: string;
    jwtHelper: JwtHelper = new JwtHelper();
    sessionExpired: string = 'SessionExpired';
    @Input()
    get headerData() {
        return this.headerValue;
    }

    constructor(private _router: Router) {
        this.date = new Date();
        _router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.processUrl();
                this.tokenExpiry();
            }
        });
    }

    ngOnInit() {
        if (window.sessionStorage.getItem('currentUser')) {
            this.data = JSON.parse(window.sessionStorage.getItem('currentUser')).name;
            this.role = JSON.parse(window.sessionStorage.getItem('currentUser')).role;
        }
        this.openNav();
    }

    processUrl() {
        let currentUrl = this._router.url;
        switch (currentUrl) {
            case '/home/index':
                this.home();
                break;
            case '/home/processmonitor':
                this.process();
                break;
            case '/home/resourcestracker':
                this.resources();
                break;
            case '/home/content360':
                this.content();
                break;
            case '/home/patternview':
                this.pattern();
                break;

            default:
                this.home();
        }
    }

    set headerData(val) {
        this.headerValue = val;
        this.headerChange.emit(this.headerValue);
    }

    home() {
        this.headerData = '';
    }

    process() {
        this.headerData = 'homeComponent.processMonitor';
    }

    resources() {
        this.headerData = 'homeComponent.resourcesTracker';
    }

    content() {
        this.headerData = 'homeComponent.content360';
    }

    pattern() {
        this.headerData = 'homeComponent.patternView';
    }

    tokenExpiry() {

        if (window.sessionStorage.getItem('currentUser')) {
            this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
            if (this.jwtHelper.isTokenExpired(this.token)) {
                if (this.token != null) {
                    this._router.navigate(['/login', this.sessionExpired]);
                    return false;
                }
            }
        }
    }

    toggleSidenavLinks() {
        let home = document.getElementById('home');
        let processMonitor = document.getElementById('processMonitor');
        let resourcesTracker = document.getElementById('resourcesTracker');
        let content360 = document.getElementById('content360');
        let PatternView = document.getElementById('PatternView');

        if (home.style.display !== 'none') {
            home.style.display = 'none';
        } else {
            home.style.display = 'block';
        }
        if (processMonitor.style.display !== 'none') {
            processMonitor.style.display = 'none';
        } else {
            processMonitor.style.display = 'block';
        }
        if (resourcesTracker.style.display !== 'none') {
            resourcesTracker.style.display = 'none';
        } else {
            resourcesTracker.style.display = 'block';
        }
        if (content360.style.display !== 'none') {
            content360.style.display = 'none';
        } else {
            content360.style.display = 'block';
        }
        if (PatternView.style.display !== 'none') {
            PatternView.style.display = 'none';
        } else {
            PatternView.style.display = 'block';
        }
    }

    openNav() {
        document.getElementById('mySidenav').style.width = '18%';
        document.getElementById('main').style.marginLeft = '18%';
        document.getElementById('divToggle').style.marginRight = '15%';
    }

    toggleNav() {
        let sidenav = document.getElementById('mySidenav');
        let main = document.getElementById('main');
        let home = document.getElementById('spanHome');
        let process = document.getElementById('spanProcess');
        let resource = document.getElementById('spanResource');
        let content = document.getElementById('spanContent');
        let pattern = document.getElementById('spanPattern');
        let toggleIcon = document.getElementById('spanToggleIcon');
        let toggleIconArrow = document.getElementById('spanToggleIconArrow');
        let divToggle = document.getElementById('divToggle');

        if (sidenav.style.width === '18%') {
            sidenav.style.width = '5%';
            main.style.marginLeft = '5%';
            home.style.display = 'none';
            process.style.display = 'none';
            resource.style.display = 'none';
            content.style.display = 'none';
            pattern.style.display = 'none';
            toggleIcon.style.display = 'none';
            toggleIconArrow.style.display = 'block';
            divToggle.style.marginRight = '32%';
        } else {
            sidenav.style.width = '18%';
            main.style.marginLeft = '18%';
            home.style.display = 'inline';
            process.style.display = 'inline';
            resource.style.display = 'inline';
            content.style.display = 'inline';
            pattern.style.display = 'inline';
            toggleIcon.style.display = 'inline';
            toggleIconArrow.style.display = 'none';
            divToggle.style.marginRight = '15%';
        }
    }
}
