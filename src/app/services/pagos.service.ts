import { Injectable } from '@angular/core';
import { Pagos } from '../models/pagos';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore'



@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private pago$ = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  createPago(pagos: Pagos):Promise<any> {
    return this.firestore.collection('Pagos').add(pagos)
  }

  getPagos(): Observable<any> {
    return this.firestore.collection('Pagos').snapshotChanges()
  }
  // deleteClient(id: string): Promise<any> {
  //   return this.firestore.collection('Clientes').doc(id).delete();
  // }
  // updateClient(id: string, cliente: any): Promise<any> {
  //   return this.firestore.collection('Clientes').doc(id).update(cliente);
  // }
  // addClientEdit(client: Cliente) {
  //   this.pago$.next(client);
  // }

  // getClientsById(id:string): Observable<any> {
  //   return this.firestore.collection('Clientes').doc(id).valueChanges()
  // }

  // getClientEdit(): Observable<Cliente> {
  //   return this.client$.asObservable();
  // }

}
