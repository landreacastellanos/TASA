import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import moment, { Moment } from 'moment';
import {
  StageProduct,
  StageBetweenRequest,
  StageBetweenResponse,
} from '../../../../../shared/models/calendar';
import { ArrozDeRiego, ArrozSecano } from '../../../../../shared/models/farm';
import { ConfigurationService } from '../../../../../shared/services/configuration.service';
import { CalendarChildren } from '../calendar-children.interface';
import { CalendarService } from '../calendar.service';
import { LandsService } from '../lands.service';

@Component({
  selector: 'app-burning-for-sowing',
  templateUrl: './burning-for-sowing.component.html',
  styleUrls: ['./burning-for-sowing.component.scss'],
})
export class BurningForSowingComponent implements OnInit, CalendarChildren {
  submitted: boolean;
  segmentId: string;
  endTrackingDate: Moment;
  startTrackingDate: Moment;
  products: StageProduct[];
  mode: 'edit' | 'view' | 'create' = 'view';
  files: FileList;
  textBack = 'Ir a segmentos';
  hasEndTrackingDate = true;
  hasStartTrackingDate = true;
  urlReferencePhoto = ''; // change after
  referencePhotoSelected: CalendarChildren['referencePhotoSelected'] = 'after';
  // Selection
  selection = new SelectionModel<StageProduct>(true, []);
  displayedColumnsProducts = [
    'select',
    'commercial_name',
    'ing_active',
    'provider',
    'dose_by_ha',
  ];
  displayedColumnsProductsAdd = [
    'interactive',
    'commercial_name',
    'ing_active',
    'provider',
    'dose_by_ha',
    'total',
  ];
  dataSourceProducts: MatTableDataSource<StageProduct>;
  dataSourceProductsAdd: MatTableDataSource<StageProduct>;
  burningForSowingForm: FormGroup = this.fb.group({
    observations: [
      { value: '', disabled: this.mode === 'view' },
      [Validators.required],
    ],
    application_date: [{ value: '', disabled: this.mode === 'view' }, []],
    products: this.fb.array([]),
  });
  enableEditProduct = false;
  validatorFloat = '^[0-9]+([.][0-9]+)?$';
  hectares = 0;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private landsService: LandsService,
    private configurationService: ConfigurationService,
    private calendarService: CalendarService
  ) {
    this.segmentId = this.route.snapshot.data.segmentId;
    this.initAPI();
  }

  ngOnInit(): void {
    this.init();
  }
  get title() {
    return (
      this.route.snapshot.data.title[
        this.landsService?.landSelected?.sowing_system
      ] || ''
    );
  }
  get hasSave() {
    return this.mode !== 'view';
  }
  get hasFilesButton() {
    return this.mode !== 'view';
  }
  get controls() {
    return this.burningForSowingForm.controls;
  }
  get hasReferencePhoto() {
    // Some stages are not available for; @Luz:
    // Las fotos que hacen falta corresponden a las etapas de Fertilización y estas no llevan foto;
    // así que no falta nada.
    // Riego: 10,12
    // Secano: 8,10,12
    if (!this.landsService.landSelected) {
      return false;
    }
    if (
      this.landsService.arrozRiego.id ===
        this.landsService.landSelected?.sowing_system &&
      [10, 12].includes(parseInt(this.segmentId, 10))
    ) {
      return false;
    }
    if (
      this.landsService.arrozSecano.id ===
        this.landsService.landSelected?.sowing_system &&
      [8, 10, 12].includes(parseInt(this.segmentId, 10))
    ) {
      return false;
    }
    return true;
  }

  initAPI() {
    this.configurationService.setLoadingPage(true);
    return this.calendarService
      .getProducts(this.landsService.idLand, this.segmentId)
      .then((products) => {
        this.products = products;
        this.dataSourceProducts = new MatTableDataSource(products);
      })
      .then(() =>
        this.calendarService.getStage(this.segmentId, this.landsService.idLand)
      )
      .then((stageOneData) => this.init(stageOneData))
      .finally(() => {
        this.configurationService.setLoadingPage(false);
      });
  }

  init(
    {
      observations = '',
      application_date = '',
      products = [],
      enabled = false,
      end_traking_date = '',
      start_traking_date = '',
    }: StageBetweenResponse = {} as StageBetweenResponse
  ) {
    this.mode = enabled ? 'edit' : 'view';

    // ? ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.endTrackingDate = end_traking_date && moment(end_traking_date);
      this.startTrackingDate = start_traking_date && moment(start_traking_date);
      this.urlReferencePhoto = this.getUrlReferencePhoto();
      this.selection.clear();

      if (this.products) {
        products.forEach((product) => {
          const selectionProduct = this.products.find(
            (data) => data.id === product.id
          );
          if (selectionProduct) {
            this.selection.select(selectionProduct);
          } else {
            this.selection.select(product);
          }
        });
      }
      this.rehydrateFormProducts();
      this.dataSourceProductsAdd = new MatTableDataSource(
        this.selection.selected
      );
      this.hectares = this.landsService.lands[
        this.landsService.landsSelectedIds
      ]
        ? this.landsService.lands[this.landsService.landsSelectedIds].batchs
            .hectares_number
        : 0;
    }, 1);

    this.configurationService.disableForm(
      this.burningForSowingForm,
      this.mode === 'view'
    );
    this.burningForSowingForm.patchValue({
      observations,
      application_date: application_date && moment(application_date),
      products,
    });
  }

  get productsControl() {
    return this.burningForSowingForm.get('products') as FormArray;
  }

  isDisabledProduct(index: number) {
    return (this.productsControl.controls[index] as FormGroup).controls
      .commercial_name.disabled;
  }

  // Table controls
  getProductControl(index: number) {
    return (this.productsControl.controls[index] as FormGroup).controls;
  }

  getValueProduct(index: number) {
    return this.productsControl.controls[index].value;
  }

  addControl({
    commercial_name = '',
    id = undefined,
    color = '',
    concentration = '',
    dose_by_ha = undefined,
    formulator = '',
    ing_active = '',
    presentation = '',
    provider = '',
    segment = '',
  } = {}) {
    this.productsControl.push(
      this.fb.group({
        commercial_name: [
          {
            value: commercial_name,
            disabled: this.mode === 'view' || commercial_name,
          },
          [Validators.required],
        ],
        id: [
          {
            value: id,
            disabled: this.mode === 'view' || commercial_name,
          },
        ],
        color: [
          {
            value: color,
            disabled: this.mode === 'view' || commercial_name,
          },
        ],
        concentration: [
          {
            value: concentration,
            disabled: this.mode === 'view' || commercial_name,
          },
        ],
        dose_by_ha: [
          {
            value: dose_by_ha,
            disabled: this.mode === 'view' || commercial_name,
          },
          [Validators.required, Validators.pattern(this.validatorFloat)],
        ],
        formulator: [
          {
            value: formulator,
            disabled: this.mode === 'view' || commercial_name,
          },
        ],
        ing_active: [
          {
            value: ing_active,
            disabled: this.mode === 'view' || commercial_name,
          },
          [Validators.required],
        ],
        presentation: [
          {
            value: presentation,
            disabled: this.mode === 'view' || commercial_name,
          },
        ],
        provider: [
          {
            value: provider,
            disabled: this.mode === 'view' || commercial_name,
          },
          [Validators.required],
        ],
        segment: [
          {
            value: segment,
            disabled: this.mode === 'view' || commercial_name,
          },
          [Validators.required],
        ],
      })
    );
  }

  rehydrateFormProducts() {
    this.productsControl.clear();
    this.selection.selected.forEach((element) => this.addControl(element));
  }

  onSave() {
    this.submitted = true;
    // is needed because is no trigger by submit
    this.burningForSowingForm.markAllAsTouched();

    console.debug('BurningForSowingComponent:onSave', {
      form: this.burningForSowingForm,
      valid: this.burningForSowingForm.valid,
      files: this.files,
    });
    const values = this.burningForSowingForm.value;
    values.products = this.selection.selected.map((product) => {
      product.dose_by_ha = parseFloat(`${product.dose_by_ha}`);
      return product;
    });
    values.start_traking_date = this.startTrackingDate;
    values.end_traking_date = this.endTrackingDate;
    if (!this.burningForSowingForm.valid) {
      return this.snackBar.open('Rectifica los campos', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
    }
    this.configurationService.setLoadingPage(true);
    Promise.resolve(this.files)
      .then((files) => (files ? this.calendarService.uploadFiles(files) : null))
      .then((filesSaved) => {
        const dataRequest: StageBetweenRequest = {
          // tslint:disable-next-line: radix
          land_id: parseInt(this.landsService.idLand),
          stage_number: this.segmentId,
          ...values,
        };
        if (filesSaved) {
          dataRequest.images = filesSaved;
        }
        return this.calendarService.setStage(dataRequest);
      })
      .then(
        (message) =>
          message &&
          this.snackBar.open(message, 'x', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          })
      )
      .then(() => this.initAPI())
      .finally(() => {
        this.configurationService.setLoadingPage(false);
      });
  }

  onBack() {
    this.router.navigate([
      '/farms/calendar/',
      this.landsService.idProperty,
      this.landsService.idLand,
      'list',
    ]);
  }
  onChangeFiles(files: FileList) {
    this.files = files;
  }

  onClickAfterReferencePhoto() {
    this.referencePhotoSelected = 'after';
    this.urlReferencePhoto = this.getUrlReferencePhoto();
  }

  onClickBeforeReferencePhoto() {
    this.referencePhotoSelected = 'before';
    this.urlReferencePhoto = this.getUrlReferencePhoto();
  }

  getUrlReferencePhoto() {
    if (!this.landsService.landSelected) return '';
    const sowingSystem =
      this.landsService.landSelected?.sowing_system === new ArrozSecano().id
        ? 'arroz_secano'
        : 'arroz_riego';

    return `../../../../../../assets/img/segments/${sowingSystem}/${this.segmentId}/${this.referencePhotoSelected}.jpg`; // change after
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StageProduct): string {
    if (!row) {
      return ` all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.commercial_name
    }`;
  }

  selectProduct(event, row) {
    event ? this.selection.toggle(row) : null;
    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
  }

  deleteProduct(row, i) {
    if (!this.isDisabledProduct(i)) {
      this.enableEditProduct = false;
    }
    this.selection.deselect(row);
    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
  }

  addProduct() {
    if (this.enableEditProduct) {
      return;
    }
    this.selection.select(new StageProduct());
    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
    this.enableEditProduct = true;
  }

  saveProduct(row, i) {
    const newProduct = this.productsControl.value[0];
    const controlsProduct = (this.productsControl.controls[i] as FormGroup)
      .controls;

    if (
      controlsProduct.commercial_name.errors ||
      controlsProduct.dose_by_ha.errors ||
      controlsProduct.provider.errors ||
      controlsProduct.commercial_name.errors
    ) {
      this.snackBar.open('Debes llenar todos los campos correctamente', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
      return;
    }
    const oldProduct = this.selection.selected[i];
    this.configurationService.updateValues(newProduct, oldProduct);
    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
    this.enableEditProduct = false;
  }

  editProduct(index) {
    if (this.enableEditProduct) {
      return;
    }
    this.enableEditProduct = true;
    this.configurationService.disableForm(
      this.productsControl.controls[index] as FormGroup,
      false
    );
  }
}
