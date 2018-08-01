import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../models/account';

@Injectable()
export class AccountService implements IAutoEntityService<Account> {
  static readonly PATH = '/accounts';
  readonly url: string;

  constructor(private http: HttpClient) {
    this.url = `http://localhost:3000${AccountService.PATH}`;
  }

  load(entityInfo: IEntityInfo, keys: any): Observable<Account> {
    return this.http.get<Account>(`${this.url}/${keys}`);
  }

  loadMany(entityInfo: IEntityInfo): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.url}`);
  }

  create(entityInfo: IEntityInfo, entity: Account): Observable<Account> {
    return this.http.post<Account>(`${this.url}`, entity);
  }

  update(entityInfo: IEntityInfo, entity: Account): Observable<Account> {
    return this.http.patch<Account>(`${this.url}/${entity.id}`, entity);
  }

  replace(entityInfo: IEntityInfo, entity: Account): Observable<Account> {
    return this.http.put<Account>(`${this.url}`, entity);
  }

  delete(entityInfo: IEntityInfo, entity: Account): Observable<Account> {
    return this.http
      .delete<Account>(`${this.url}/${entity.id}`)
      .pipe(map(() => entity));
  }
}
