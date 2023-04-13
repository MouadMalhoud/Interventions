import { AbstractControl, ValidatorFn } from "@angular/forms";

export class VerifierCaracteresValidator {

    static longueurMinimum(min: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            // Vérifier s'il y a une valeur et si oui sa longueur est égale ou supérieure à min
             if (c.value && c.value.trim().length >= min) {
                return null;  // succès.  Tout est valide.
            }
            return { 'nbreCaracteresInsuffisant': true }; // erreur.  Valeur nulle ou longueur insuffisante        
        };
    }
}