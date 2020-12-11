import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  StageProduct,
  StageBetweenRequest,
  StageBetweenResponse,
} from '../../../../../shared/models/calendar';
import { ArrozSecano } from '../../../../../shared/models/farm';
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
  endTrackingDate: Date;
  startTrackingDate: Date;
  products: StageProduct[];
  mode: 'edit' | 'view' | 'create' = 'view';
  files: FileList;
  textBack = 'Ir a segmentos';
  hasEndTrackingDate = true;
  hasStartTrackingDate = true;
  hasReferencePhoto = true;
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

  get hasSave() {
    return this.mode !== 'view';
  }
  get hasFilesButton() {
    return this.mode !== 'view';
  }
  get controls() {
    return this.burningForSowingForm.controls;
  }

  initAPI() {
    return this.calendarService
      .getProducts(this.landsService.idLand, this.segmentId)
      .then((products) => {
        this.products = products;
        this.dataSourceProducts = new MatTableDataSource(products);
      })
      .then(() =>
        this.calendarService.getStage(this.segmentId, this.landsService.idLand)
      )
      .then((stageOneData) => this.init(stageOneData));
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
      this.endTrackingDate = end_traking_date && new Date(end_traking_date);
      this.startTrackingDate =
        start_traking_date && new Date(start_traking_date);
      this.urlReferencePhoto = this.getUrlReferencePhoto();
      //TODO: TEST ME because is not the same instances
      this.selection.clear();
      console.log(this.products);
      console.log(products);
      
      if(this.products){
        products.forEach(product =>{
          const selectionProduct = this.products.find(data => data.id === product.id);
          if(selectionProduct){
            this.selection.select(selectionProduct);
          }
        })
      }
      this.rehydrateFormProducts();
      this.dataSourceProductsAdd = new MatTableDataSource(
        this.selection.selected
      );
    }, 1);

    this.configurationService.disableForm(
      this.burningForSowingForm,
      this.mode === 'view'
    );
    this.burningForSowingForm.patchValue({
      observations,
      application_date: application_date && new Date(application_date),
      products,
    });
  }

  get productsControl() {
    return this.burningForSowingForm.get('products') as FormArray;
  }

  isDisabledProduct(index: number){
    return (this.productsControl.controls[index] as FormGroup).controls.commercial_name.disabled;
  }

  // Table controls
  getProductControl(index: number) {
    return (this.productsControl.controls[index] as FormGroup).controls;
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
          }
        ],
        dose_by_ha: [
          {
            value: dose_by_ha,
            disabled: this.mode === 'view' || commercial_name,
          },
          [Validators.required],
        ],
        formulator: [
          {
            value: formulator,
            disabled: this.mode === 'view' || commercial_name,
          }
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
          }
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
          }
        ]
      })
    );
  }

  rehydrateFormProducts() {
    this.productsControl.clear();
    this.selection.selected.forEach((element) => this.addControl(element));
  }

  // FIXME: implement & integrate with API
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
          ...values,
        };
        if (filesSaved) {
          dataRequest.images = filesSaved;
        }
        return this.calendarService.setBurnStage(dataRequest);
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.commercial_name
      }`;
  }

  selectProduct(event, row) {
    event ? this.selection.toggle(row) : null;
    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
  }

  deleteProduct(row, i) {    
    if(!this.isDisabledProduct(i)){
      this.enableEditProduct= false;
    }
    this.selection.deselect(row);
    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
  }

  addProduct() {
    if(this.enableEditProduct){
      return
    }
    this.selection.select(new StageProduct);
    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
    this.enableEditProduct = true;
  }

  saveProduct(row, i) {
    const newProduct = this.productsControl.value[0];
    if(!newProduct.commercial_name || !newProduct.dose_by_ha || !newProduct.provider || !newProduct.commercial_name){
      this.snackBar.open('Debes llenar todos los campos', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
      return
    }
    const oldProduct = this.selection.selected[i];
    this.configurationService.updateValues(newProduct, oldProduct);

    this.dataSourceProductsAdd.data = this.selection.selected;
    this.rehydrateFormProducts();
    this.enableEditProduct = false;
  }

  editProduct(index){
    if(this.enableEditProduct){
      return
    }
    this.enableEditProduct = true;
    this.configurationService.disableForm(this.productsControl.controls[index] as FormGroup, false)
  }
}
