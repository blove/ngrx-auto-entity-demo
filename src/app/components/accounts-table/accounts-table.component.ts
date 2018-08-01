import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Account } from '../../models/account';

@Component({
  selector: 'nae-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements OnChanges, OnInit {
  columnsToDisplay = ['name', 'amount', 'actions'];
  dataSource = new MatTableDataSource();
  @Input() accounts: Account[];
  @Output() delete = new EventEmitter<Account>();
  @Output() edit = new EventEmitter<Account>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.accounts && simpleChanges.accounts.currentValue) {
      this.dataSource.data = simpleChanges.accounts.currentValue;
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
