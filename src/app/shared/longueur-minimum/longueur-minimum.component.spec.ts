import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    it("#7 | une chaîne avec 10 espaces est invalide", () => {
       let validator = VerifierCaracteresValidator.longueurMinimum(3); 
       let control = {value: '          '}
       let result = validator(control as AbstractControl);
       expect(result['nbreCaracteresInsuffisant']).toBe(true);

    });

    it("#8 | une phrase avec des mots est valide", () => {
        let validator = VerifierCaracteresValidator.longueurMinimum(3); 
        let control = {value: 'Vive angular'}
        let result = validator(control as AbstractControl);
        expect(result==null).toBe(true);

     });

     it("#9 | une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide", () => {
      let validator = VerifierCaracteresValidator.longueurMinimum(3); 
      let control = {value: ' je le veux'}
      let result = validator(control as AbstractControl);
      expect(result==null).toBe(true);

   });

   it("#10 | une phrase avec 1 espaces et 2 caractères est invalide", () => {
      let validator = VerifierCaracteresValidator.longueurMinimum(3); 
      let control = {value: ' xx'}
      let result = validator(control as AbstractControl);
      expect(result['nbreCaracteresInsuffisant']).toBe(true);

   });

   it("#11 | une phrase avec 2 espaces et 1 caractères est invalide", () => {
      let validator = VerifierCaracteresValidator.longueurMinimum(3); 
      let control = {value: '  x'}
      let result = validator(control as AbstractControl);
      expect(result['nbreCaracteresInsuffisant']).toBe(true);

   });

   it("#12 | une phrase avec 3 espaces et 3 caractères est valide", () => {
      let validator = VerifierCaracteresValidator.longueurMinimum(3); 
      let control = {value: '   xxx'}
      let result = validator(control as AbstractControl);
      expect(result==null).toBe(true);
   });

   it("#13 | une phrase avec 5 espaces et 5 caractères est valide", () => {
      let validator = VerifierCaracteresValidator.longueurMinimum(3); 
      let control = {value: '   xxxxx  '}
      let result = validator(control as AbstractControl);
      expect(result==null).toBe(true);
   });

   it("#14 | une chaine null est invalide", () => {
      let validator = VerifierCaracteresValidator.longueurMinimum(2); 
      let control = {} ;
      let result = validator(control as AbstractControl);
      expect(result['nbreCaracteresInsuffisant']).toBe(true);
   });
});