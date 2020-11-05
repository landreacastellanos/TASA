import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../../../../shared/models/role';
import { UserCreate } from '../../../../shared/models/user-create';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
  };
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
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

  listUsers = new Array(122).fill(0).map(() => {
    const randNum = Math.floor(Math.random() * 1000);
    return {
      age: randNum,
      email: `juanse_${randNum}@yopmail.com`,
      last_name: `dussan_${randNum}`,
      name: `juanse_${randNum}`,
      password: `juanse_${randNum}@yopmail.com`,
      phone: randNum,
      profesion: `profesion_${randNum}`,
      role_id: 6,
    };
  });

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
  dataSource: MatTableDataSource<UserCreate>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listUsers as UserCreate[]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRoleName(roleId: Role['key']): Role['role'] {
    const role = this.roles.find((roleItem) => roleItem.key === roleId)
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

  // Selection
  selection = new SelectionModel<UserCreate>(false, []);

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
  checkboxLabel(row?: UserCreate): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }
}
