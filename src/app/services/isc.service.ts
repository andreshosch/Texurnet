import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Isc } from '../models/isc';

@Injectable({
  providedIn: 'root'
})
export class IscService {
  private isc$ = new Subject<any>();
  
  constructor(private firestore:AngularFirestore) {}
    createIsc(cliente: Isc):Promise<any> {
      return this.firestore.collection('Isc').add(cliente)
    }
  
    getIsc(): Observable<any> {
      return this.firestore.collection('Isc').snapshotChanges()
    }
    deleteIsc(id: string): Promise<any> {
      return this.firestore.collection('Isc').doc(id).delete();
    }
    updateIsc(id: string, isc: any): Promise<any> {
      return this.firestore.collection('Isc').doc(id).update(isc);
    }
    addIscEdit(isc : Isc) {
      this.isc$.next(isc);
    }
  
    getIscById(id:string): Observable<any> {
      return this.firestore.collection('Isc').doc(id).valueChanges()
    }
  
    getIscEdit(): Observable<Isc> {
      return this.isc$.asObservable();
    }
   }

