import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../../../../shared/models/role';
import { User } from '../../../../shared/models/user';
import { LoadingService } from '../../../../shared/services/loading.service';
import { UserService } from '../user.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit {
  constructor(
    private loadingService: LoadingService,
    private userService: UserService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listUsers as User[]);
  }
  // TODO: get from back
  roles: Role[] = [
    { key: 1, role: 'Administrador' },
    { key: 2, role: 'Capataz' },
    { key: 3, role: 'Resp. Decisiones de Compra' },
    { key: 4, role: 'Dueño de la finca' },
    { key: 5, role: 'Socio Adicional' },
    { key: 6, role: 'Vendedor TASA' },
    { key: 7, role: 'Influenciador de Decisiones de Compra' },
    { key: 8, role: 'Encargado de Compras' },
    { key: 9, role: 'Encargado de Pagos' },
  ];

  listUsers: User[] = [];

  displayedColumns: string[] = [
    'select',
    'name',
    'last_name',
    'age',
    'email',
    'phone',
    'profesion',
    'role',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Selection
  selection = new SelectionModel<User>(false, []);

  ngAfterViewInit() {
    this.loadingService.setloading(true);
    this.userService
      .getUsers()
      .then((users) => {
        this.listUsers = users;
      })
      .finally(() => {
        this.dataSource = new MatTableDataSource(this.listUsers as User[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loadingService.setloading(false);
      });
  }

  getRoleName(roleId: Role['key']): Role['role'] {
    const role = this.roles.find((roleItem) => roleItem.key === roleId);
    return role?.role;
  }

  // Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }
}
