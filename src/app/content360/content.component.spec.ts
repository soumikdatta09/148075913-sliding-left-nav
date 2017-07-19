import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ContentComponent } from './content.component';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


describe('Content360 Component', () => {

    let comp: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;
    let des: DebugElement[];
    let els: HTMLElement[] = [];

    let locale: LocaleService;
    let translation: TranslationService;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, HttpModule, MaterialModule,
                RouterTestingModule.withRoutes([]), TranslationModule.forRoot()],
            declarations: [ContentComponent]
        }).createComponent(ContentComponent);
        comp = fixture.componentInstance;
    });

    beforeEach((done) => {
        locale = TestBed.get(LocaleService);
        translation = TestBed.get(TranslationService); locale.addConfiguration()
            .disableStorage()
            .addLanguages(['en', 'it'])
            .defineLanguage('en');

        const translationEN: any = {
            'content360': 'Content 360°'
        };
        translation.addConfiguration()
            .addTranslation('en', translationEN);
        translation.init().then(() => done());
    });

    beforeEach(() => {
        locale.setCurrentLanguage('en');

        fixture.detectChanges();
        des = fixture.debugElement.queryAll(By.css('h3'));
        for (let i = 0; i < des.length; i++) {
            els.push(des[i].nativeElement);
        }
    });

    it('should render translated text of content component', (() => {
        expect(els[0].textContent).toContain('Content 360°');
    }));
});
