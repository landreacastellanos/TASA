import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { StorageService } from '../../../../shared/services/storage.service';
import { Farm } from '../../../../shared/models/farm';
import { FarmsService } from '../farms.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit {
  id: string;
  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private storageService: StorageService,
    private farmsService: FarmsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listFarms);
    this.loadingService.setloading(true);
  }

  listFarms: Farm[] = [];
  displayedColumns: string[] = [
    'select',
    'name',
    'business_name',
    // FIXME: BACK NOT SUPPORTED
    'phone',
    'type_planting',
  ];
  dataSource: MatTableDataSource<Farm>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Selection
  selection = new SelectionModel<Farm>(false, []);

  ngAfterViewInit() {
    this.farmsService
      .getFarms()
      .then((data) => {
        this.listFarms = data;
      })
      .finally(() => {
        this.dataSource = new MatTableDataSource(this.listFarms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loadingService.setloading(false);
      });
  }
  goBack() {
    this.router.navigate(['/']);
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFarm();
      }
    });
  }

  deleteFarm(){
    let id = this.selection.selected[0].id;
    this.farmsService.deleteFarm(id).then((data) => {
      if (data) {
        this.snackBar.open('Finca eliminada', 'x', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
      this.ngAfterViewInit();
    });
  }

  onClickView() {
    this.router.navigate(['/farms/view', this.selection.selected[0].id]);
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
  checkboxLabel(row?: Farm): string {
    if (!row) {
      return ` all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }
}
