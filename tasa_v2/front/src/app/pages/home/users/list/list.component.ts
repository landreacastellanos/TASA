import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Role } from '../../../../shared/models/role';
import { User } from '../../../../shared/models/user';
import { LoadingService } from '../../../../shared/services/loading.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit {
  id: string;

  constructor(
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listUsers as User[]);
    this.loadingService.setloading(true);
  }

  get roles(): Role[] {
    return this.storageService.getValue('roles');
  }

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
  goBack() {
    this.router.navigate(['/']);
  }

  getRoleName(roleId: Role['key']): Role['role'] {
    const role = this.roles.find((roleItem) => roleItem.key === roleId);
    return role?.role;
  }

  onClickEdit() {
    this.router.navigate(['/users/edit', this.selection.selected[0].id]);
  }

  // Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }
  openDialogDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser();
      }
    });
  }

  onClickCreate() {
    this.router.navigate(['users/create']);
  }

  deleteUser() {
    this.userService.delete(this.selection.selected[0]).then((data) => {
      if (data) {
        this.snackBar.open('Usuario eliminado', 'x', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
      this.ngAfterViewInit();
    });
  }
}
