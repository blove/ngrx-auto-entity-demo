import { Key } from '@briebug/ngrx-auto-entity';

export class Account {
  @Key id: number;
  customer_id: number;
  accountNumber: string;
  name: string;
  amount: string;
}
