import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { HttpClientModule } from '@angular/common/http';
import { TypesproblemeService } from './typesprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypesproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();


  });

  it("#1 | Zone PRÉNOM invalide avec 2 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });
  
  
  it("#2 | Zone PRÉNOM valide avec 3 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });

  it("#3 | Zone PRÉNOM valide avec 200 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(200));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  it("#4 | Zone PRÉNOM valide avec aucune valeur", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(null);
    let errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it("#5 | Zone PRÉNOM valide avec 10 espaces", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(10));
    let errors = zone.errors || {};
   
    expect(errors['minlength']).toBeFalsy();
  });

  it("#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(3));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
    
  });
  it("#15 | Zone TELEPHONE est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications("ne pas me notifier");

    let zone= component.problemeForm.get('telephone')
    expect(zone.status).toEqual('DISABLED');
  });
  
  it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () =>{
    component.appliquerNotifications("ne pas me notifier");

    let zone = component.problemeForm.get("telephone");
   
    expect(zone.value).toBeNull();
  });

  it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications("ne pas me notifier");

    let zone= component.problemeForm.get('courrielGroup.courriel')
    expect(zone.status).toEqual('DISABLED');
  });

  it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications("ne pas me notifier");

    let zone= component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('ne pas notifier');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it("#20 |  Zone ADRESSE COURRIEL est activée quand notifier par courriel", () =>{
    component.appliquerNotifications('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enable).toBeTruthy();
  });
    it("#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel", () =>{
      component.appliquerNotifications('courriel');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.enable).toBeTruthy();
  
  });

  it("#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel", () =>{
    component.appliquerNotifications("courriel");

    let errors= {};
    let zone = component.problemeForm.get("courrielGroup.courriel");
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();

});

it("#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel", () =>{
  component.appliquerNotifications("courriel");

  let errors= {};
  let zone = component.problemeForm.get("courrielGroup.courrielConfirmation");
  zone.setValue('');
  errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();

});

it("#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme", () =>{
  component.appliquerNotifications("courriel");

  let errors= {};
  let zone = component.problemeForm.get("courrielGroup.courriel");
zone.setValue('bbbbb')
  errors = zone.errors || {};
  expect(errors['pattern']).toBeTruthy();

});

it("#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null", () =>{
  component.appliquerNotifications("courriel");

  let courriel = component.problemeForm.get('courrielGroup.courriel');
  let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');

  let erreurs= {};
  courriel.setValue('');
  courrielConfirmation.setValue('adas@dsd.com');
  erreurs = groupe.errors || {};
  expect(erreurs['match']).toBeUndefined();
});

it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null", () =>{
  component.appliquerNotifications("courriel");

  let courriel = component.problemeForm.get('courrielGroup.courriel');
  let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');

  let erreurs= {};
  courriel.setValue('dsads@dsd.com');
  courrielConfirmation.setValue('');
  erreurs = groupe.errors || {};
  expect(erreurs['match']).toBeUndefined();
});


it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel", () =>{
  component.appliquerNotifications("courriel");

  let courriel = component.problemeForm.get('courrielGroup.courriel');
  let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');

  let erreurs= {};
  courriel.setValue('dsdsdaaa@dad.comdsads@dsd.com');
  courrielConfirmation.setValue('dsads@dsd.com');
  erreurs = groupe.errors || {};

    expect(erreurs['match']).toBeTruthy();

});


it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel", () =>{
  component.appliquerNotifications("courriel");

  let courriel = component.problemeForm.get('courrielGroup.courriel');
  let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
  let groupe = component.problemeForm.get('courrielGroup');


  courriel.setValue('dsads@dsd.com');
  courrielConfirmation.setValue('dsads@dsd.com');
  
  let errors= {};
  errors = groupe.errors || {};

  expect(errors['match']).toBeUndefined();

});

it("#29 | Zone TELEPHONE est activée quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

  
  let zone = component.problemeForm.get('telephone');
  expect(zone.enable).toBeTruthy();
});


it("#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

  
  let zone = component.problemeForm.get('courrielGroup.courriel');
  expect(zone.status).toEqual('DISABLED'); 
});


it("#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

  
  let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
  expect(zone.status).toEqual('DISABLED'); 
});

it("#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

  let errors= {};
  let zone = component.problemeForm.get("telephone");
  zone.setValue('');
  errors = zone.errors || {};
  expect(errors['required']).toBeTruthy();

});

it("#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

  let errors= {};
  let zone = component.problemeForm.get("telephone");
  zone.setValue('fsfsfksjh');
  errors = zone.errors || {};
  expect(errors['pattern']).toBeTruthy();

});

it("#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

  let errors= {};
  let zone = component.problemeForm.get("telephone");
  zone.setValue('123456789');
  errors = zone.errors || {};
  expect(errors['minlength']).toBeTruthy();

});

it("#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

  let errors= {};
  let zone = component.problemeForm.get("telephone");
  zone.setValue('12345678911');
  errors = zone.errors || {};
  expect(errors['maxlength']).toBeTruthy();

});

it("#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte", () =>{
  component.appliquerNotifications("messageTexte");

 
  let zone = component.problemeForm.get("telephone");
  zone.setValue('1234567891');
  let errors = zone.errors || {};
  expect(zone.valid).toBeTruthy();
});
});