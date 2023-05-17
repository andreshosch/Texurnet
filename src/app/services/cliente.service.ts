import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, Subject } from 'rxjs';
// import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private client$ = new Subject<any>();


  constructor(private firestore: AngularFirestore) { }

  createClient(cliente: Cliente):Promise<any> {
    return this.firestore.collection('Clientes').add(cliente)
  }

  getClients(): Observable<any> {
    return this.firestore.collection('Clientes').snapshotChanges()
  }
  deleteClient(id: string): Promise<any> {
    return this.firestore.collection('Clientes').doc(id).delete();
  }
  updateClient(id: string, cliente: any): Promise<any> {
    return this.firestore.collection('Clientes').doc(id).update(cliente);
  }
  addClientEdit(client: Cliente) {
    this.client$.next(client);
  }

  getClientsById(id:string): Observable<any> {
    return this.firestore.collection('Clientes').doc(id).valueChanges()
  }

  getClientEdit(): Observable<Cliente> {
    return this.client$.asObservable();
  }
}

