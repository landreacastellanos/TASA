import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { Farm } from '../../../../shared/models/farm';
import { FarmsService } from '../farms.service';

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
    private farmsService: FarmsService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listFarms);
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
    this.loadingService.setloading(true);
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
  checkboxLabel(row?: Farm): string {
    if (!row) {
      return ` all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
    }`;
  }
}
