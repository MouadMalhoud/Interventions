import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typesprobleme';
import { TypesproblemeService } from './typesprobleme.service';
import { emailMatcherValidator } from '../shared/longueur-minimum/email-matcher.component.spec';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  
  typesproblemeProbleme: ITypeProbleme[]
  errorMessage: string; 
  constructor(private fb:FormBuilder, private typesprobleme: TypesproblemeService) { }
  
  save(): void {
  }
  ngOnInit()  {
   this.problemeForm = this.fb.group
   
    ({
      prenom: ['',[VerifierCaracteresValidator.longueurMinimum(3),Validators.required]],
      nom: ['',[Validators.maxLength(50), Validators.required]],
      noTypeProbleme: ['',[Validators.required]],
      courrielGroup: this.fb.group({
      courriel: [{value: '', disabled: true}],
      courrielConfirmation: [{value: '', disabled: true}],  
    }),
    notification:['pasnotification'],
    telephone: [{value: '', disabled: true}],
    noUnite: '',
    descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]], 
    dateProbleme: {value: Date(), disabled: true}
    });


    this.typesprobleme.obtenirTypesprobleme()
    .subscribe(tp => this.typesproblemeProbleme = tp,
               error => this.errorMessage = <any>error); 

    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
            
  }
  appliquerNotifications(notifyVia: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const telephoneControl = this.problemeForm.get('telephone');      
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    
    courrielControl.clearValidators();
    courrielControl.reset();  
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();    
    telephoneControl.disable();

    courrielGroupControl.clearValidators();
    courrielGroupControl.reset();  
    courrielGroupControl.disable();  

    if (notifyVia === 'courriel') {   
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);    
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);       
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);                     
      courrielControl.enable(); 
      courrielConfirmationControl.enable();  
      
}   
else
{
  if(notifyVia === 'messageTexte')
  {
    telephoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);      
    telephoneControl.enable();           
  }
}
courrielControl.updateValueAndValidity();   
courrielConfirmationControl.updateValueAndValidity();         
telephoneControl.updateValueAndValidity();   
  }

  }
