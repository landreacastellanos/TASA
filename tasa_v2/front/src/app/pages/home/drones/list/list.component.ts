import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Role } from '../../../../shared/models/role';
import { LoadingService } from '../../../../shared/services/loading.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { DronesService } from '../drones.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Drone } from 'src/app/shared/models/drone';

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
    private droneService: DronesService,
    private snackBar: MatSnackBar
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listDrones as Drone[]);
    this.loadingService.setloading(true);
  }

  listDrones: Drone[] = [];

  displayedColumns: string[] = [
    'select',
    'name',
    'state',
    'reason',
  ];
  dataSource: MatTableDataSource<Drone>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Selection
  selection = new SelectionModel<Drone>(false, []);

  ngAfterViewInit() {
    this.droneService
      .getDrones()
      .then((drones) => {
        this.listDrones = drones;
      })
      .finally(() => {
        this.dataSource = new MatTableDataSource(this.listDrones as Drone[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loadingService.setloading(false);
      });
  }
  goBack() {
    this.router.navigate(['/']);
  }

  onClickEdit() {
    this.router.navigate(['/drones/edit', this.selection.selected[0].id]);
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
  checkboxLabel(row?: Drone): string {
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
        this.deleteDrone();
      }
    });
  }

  onClickCreate() {
    this.router.navigate(['drones/create']);
  }

  deleteDrone() {
    this.droneService.delete(this.selection.selected[0]).then((data) => {
      if (data) {
        this.snackBar.open('Drone eliminado', 'x', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
      this.ngAfterViewInit();
    });
  }
}
