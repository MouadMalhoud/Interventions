import { InMemoryBackendConfig, InMemoryDbService } from 'angular-in-memory-web-api';
import { catchError, tap } from 'rxjs/operators';
import { ITypeProbleme } from './typesprobleme';
export class ProblemeData implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        let typesprobleme: ITypeProbleme[] = [
            {
                'id': 1,
                'descriptionTypeProbleme': 'Problème avec la souris'
            },
            {
                'id': 2,
                'descriptionTypeProbleme': 'Problème de clavier'
            },
            {
                'id': 3,
                'descriptionTypeProbleme': 'Problème d\'accès Internet'
            },
            {
                'id': 4,
                'descriptionTypeProbleme': 'Problème avec un logiciel'
            },
            {
                'id': 5,
                'descriptionTypeProbleme': 'Problème d\'imprimante'
            },
            {
                'id': 6,
                'descriptionTypeProbleme': 'Carte graphique'
            },
            {
                'id': 7,
                'descriptionTypeProbleme': 'Carte mère'
            },
            {
                'id': 8,
                'descriptionTypeProbleme': 'Problème entre la chaise et le clavier'
            },
            {
                'id': 9,
                'descriptionTypeProbleme': 'Autre'
            }
        ];       
        //return { probleme, typesprobleme};
        return {typesprobleme};        
    }
}