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
import { environment } from 'src/environments/environment';
import { FarmsService } from '../../farms.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DronesService } from '../../../drones/drones.service';

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
  listProductError: { emptyListProducts: boolean; editListProducts: boolean };
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
  burningForSowingForm: FormGroup = this.fb.group({});
  enableEditProduct = false;
  validatorFloat = '^[0-9]+([.][0-9]+)?$';
  validatorFloat2 = '^(?:[0-9]{1,2})(?:\\.[0-9]{1,2})?$';
  hectares = 0;
  pictures = [];
  drones = [];
  drone: boolean;
  public users = [];

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private landsService: LandsService,
    private configurationService: ConfigurationService,
    private calendarService: CalendarService,
    private farmsService: FarmsService,
    private storageService: StorageService,
    private droneService: DronesService
  ) {
    this.segmentId = this.route.snapshot.data.segmentId;
    this.initAPI();
  }

  ngOnInit(): void {
    this.burningForSowingForm = this.fb.group({
      observations: [
        { value: '', disabled: this.mode === 'view' },
        [Validators.required],
      ],
      application_date: [{ value: '', disabled: this.mode === 'view' }, []],
      products: this.fb.array([]),
    });
    this.burningForSowingForm.controls.products.valueChanges.subscribe(
      (products) => this.productsValidation(products)
    );
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
  get controlsAerial() {
    return (this.burningForSowingForm.get('aerialApplication') as FormGroup)
      .controls;
  }
  get hasReferencePhoto() {
    // Some stages are not available for; @Luz:
    // Las fotos que hacen falta corresponden a las etapas de Fertilización y estas no llevan foto;
    // así que no falta nada.
    // Riego: 8, 10,12
    // Secano: 8,10,12
    if (!this.landsService.landSelected) {
      return false;
    }
    if ([8, 10, 12].includes(parseInt(this.segmentId, 10))) {
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
      .then(() => this.droneService.getDrones())
      .then((drones) => {
        this.drones = drones;
      })
      .then(() => this.farmsService.getUsers())
      .then((infoUsers) => {
        this.users = infoUsers[0];
      })
      .then(() =>
        this.calendarService.getStage(this.segmentId, this.landsService.idLand)
      )
      .then((stageOneData) => {
        this.init(stageOneData);
      })
      .finally(() => {
        this.configurationService.setLoadingPage(false);
      });
  }

  init(
    {
      air_application = '',
      observations = '',
      application_date = '',
      products = [],
      enabled = false,
      end_traking_date = '',
      start_traking_date = '',
      images = [],
      dron = false,
    }: StageBetweenResponse = {} as StageBetweenResponse
  ) {
    this.mode = enabled ? 'edit' : 'view';
    // ? ExpressionChangedAfterItHasBeenCheckedError

    setTimeout(() => {
      this.endTrackingDate = end_traking_date && moment(end_traking_date);
      this.startTrackingDate = start_traking_date && moment(start_traking_date);
      this.urlReferencePhoto = this.getUrlReferencePhoto();
      this.selection.clear();
      this.pictures = images ? images : [];
      const airApplication = air_application? JSON.parse(air_application): air_application;
      if (dron) {
        this.burningForSowingForm = this.fb.group({
          observations: [
            { value: observations, disabled: this.mode === 'view' },
            [Validators.required],
          ],
          application_date: [{ value: '', disabled: this.mode === 'view' }, []],
          products: this.fb.array([]),
          aerialApplication: this.fb.group({
            reportNumber: [
              {
                value: airApplication? airApplication.reportNumber: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.maxLength(10)],
            ],
            drone: [
              { value: airApplication? airApplication.drone : null, disabled: this.mode === 'view' },
              Validators.required,
            ],
            pilotName: [
              {
                value: airApplication? airApplication.pilotName: null,
                disabled: this.mode === 'view',
              },
              Validators.required,
            ],
            applicationManager: [
              {
                value: airApplication? airApplication.applicationManager: null,
                disabled: this.mode === 'view',
              },
              Validators.required,
            ],
            initialWaterPh: [
              {
                value: airApplication? airApplication.initialWaterPh: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            finalMixturePh: [
              {
                value: airApplication? airApplication.finalMixturePh: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            flightHeight: [
              {
                value: airApplication? airApplication.flightHeight: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            applicationVolume: [
              {
                value: airApplication? airApplication.applicationVolume: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            dropSize: [
              {
                value: airApplication? airApplication.dropSize: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            flightSpeed: [
              {
                value: airApplication? airApplication.flightSpeed : '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            coverageWidth: [
              {
                value: airApplication? airApplication.coverageWidth: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            startTime: [
              {
                value: airApplication? airApplication.startTime: '',
                disabled: this.mode === 'view',
              },
              Validators.required,
            ],
            endTime: [
              { value: airApplication? airApplication.endTime: '', disabled: this.mode === 'view' },
              Validators.required,
            ],
            windSpeed: [
              {
                value: airApplication? airApplication.windSpeed: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            applicationIncidence: [
              {
                value: airApplication? airApplication.applicationIncidence: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.maxLength(200)],
            ],
            applicationRating: [
              {
                value: airApplication? airApplication.applicationRating: '',
                disabled: this.mode === 'view',
              },
              [Validators.required, Validators.pattern(this.validatorFloat2)],
            ],
            liveTime: [
              airApplication?.liveTime? airApplication.liveTime : '',
              Validators.required,
            ],
            deadTime: [
              airApplication?.deadTime? airApplication.deadTime : '',
              Validators.required,
            ],
            liveTimePeriods: this.fb.array([]),
            deadTimePeriods: this.fb.array([]),
          }),
        });

        if (airApplication && airApplication.liveTimePeriods) {
          airApplication.liveTimePeriods.forEach((period: any) => {
            this.addLiveTimePeriod(period.startTime, period.endTime);
          });
        }
        if (airApplication &&  airApplication.deadTimePeriods) {
          airApplication.deadTimePeriods.forEach((period: any) => {
            this.addDeadTimePeriod(period.startTime, period.endTime);
          });
        }

        this.burningForSowingForm.controls.products.valueChanges.subscribe(
          (products) => this.productsValidation(products)
        );
      }
      this.drone = dron;

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
    setTimeout(() => {
      this.configurationService.disableForm(
        this.burningForSowingForm,
        this.mode === 'view'
      );
  
      if (!observations && !products.length) {
        this.burningForSowingForm.controls.application_date.disable();
      }
      this.burningForSowingForm.patchValue({
        observations,
        application_date: application_date && moment(application_date),
        products,
      });
    }, 200);
    this.onLiveTimePeriodsChanges();
    this.onDeadTimePeriodsChanges();
  }

  get productsControl() {
    return this.burningForSowingForm.get('products') as FormArray;
  }

  productsValidation(products: StageProduct[]) {
    const editListProducts = products
      .map((row, i) => !row.id && !this.isDisabledProduct(i))
      .includes(true);
    const emptyListProducts = !products.length;
    this.listProductError = { emptyListProducts, editListProducts };
    return this.listProductError;
  }

  get hasProductError() {
    return (
      this.submitted &&
      (this.listProductError.editListProducts ||
        this.listProductError.emptyListProducts)
    );
  }

  get hasAerialApplication() {
    return (
      this.submitted &&
      !(this.burningForSowingForm.get('aerialApplication') as FormGroup).valid
    );
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

  showTotal(index: number) {
    const product = this.getValueProduct(index);
    return product && !Number.isNaN(product.dose_by_ha);
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

  logFormErrors(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.logFormErrors(control);
      } else if (control && control.invalid) {
        console.error('Error in control: ', key, control.errors);
      }
    });
  }

  onSave() {
    this.submitted = true;
    // is needed because is no trigger by submit
    this.burningForSowingForm.markAllAsTouched();

    console.debug('BurningForSowingComponent:onSave', {
      form: this.burningForSowingForm,
      valid: this.burningForSowingForm.valid,
      files: this.files,
      productsDataSourceAdd: this.dataSourceProductsAdd,
    });
    const values = this.burningForSowingForm.value;
    values.application_date = !!values.application_date
      ? values.application_date
      : undefined;
    values.products = this.selection.selected.map((product) => {
      product.dose_by_ha = parseFloat(`${product.dose_by_ha}`);
      return product;
    });
    values.start_traking_date = this.startTrackingDate;
    values.end_traking_date = this.endTrackingDate;
    if(this.drone){
      values.air_application = values.aerialApplication;
      delete values.aerialApplication;
    }
    if (Object.values(this.listProductError).includes(true)) {
      return this.snackBar.open(
        'Valida todos los productos antes de continuar',
        'x',
        {
          duration: 2000,
          panelClass: ['snackbar-warn'],
        }
      );
    }
    if (this.burningForSowingForm.invalid) {
      this.logFormErrors(this.burningForSowingForm);
      return this.snackBar.open('Rectifica los campos', 'x', {
        duration: 2000,
        panelClass: ['snackbar-warn'],
      });
    }
    this.configurationService.setLoadingPage(true);
    Promise.resolve(this.files)
      .then((files) => (files ? this.calendarService.uploadFiles(files) : null))
      .then((filesSaved) => {
        // ? prevent duplicates saves
        delete this.files;
        return filesSaved;
      })
      .then((filesSaved) => {
        const dataRequest: StageBetweenRequest = {
          // tslint:disable-next-line: radix
          land_id: parseInt(this.landsService.idLand),
          stage_number: this.segmentId,
          ...values,
        };
        dataRequest.images = this.pictures.length
          ? this.addNewFiles(filesSaved)
          : filesSaved
          ? filesSaved
          : [];
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
        this.submitted = false;
      });
  }

  addNewFiles(filesSaved: string[]) {
    const oldPictures = this.calendarService.returnPicture(
      this.pictures
    ) as string[];
    if (filesSaved) {
      oldPictures.push(...filesSaved);
    }
    // Only last 3
    return oldPictures.slice(-3);
  }

  editPicture(picture, listPictures) {
    listPictures = this.calendarService.returnPicture(listPictures);
    picture = this.calendarService.returnPicture(picture);
    Promise.resolve(this.files)
      .then((files) => (files ? this.calendarService.uploadFiles(files) : null))
      .then((filesSaved) => {
        // ? prevent duplicates saves
        delete this.files;
        return filesSaved;
      })
      .then((filesSaved) => {
        listPictures = listPictures.map((element) => {
          element = element === picture ? filesSaved[0] : element;
          return element;
        });
        this.pictures = this.calendarService.setPictureFile(listPictures);
        return this.onSave();
      })
      .finally(() => {
        this.configurationService.setLoadingPage(false);
      });
  }

  deletePicture(picture) {
    this.configurationService.setLoadingPage(true);
    this.pictures = this.pictures.filter((data) => data !== picture);
    this.files = null;
    this.onSave();
  }

  onBack() {
    this.router.navigate([
      '/farms/calendar/',
      this.landsService.idProperty,
      this.landsService.idLand,
      'list',
    ]);
  }

  onChangeFiles(files: FileList, picture?: string, listPictures?: string[]) {
    this.files = files;
    if (this.pictures.length > 0 && picture) {
      this.editPicture(picture, listPictures);
    }
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
    if (this.mode === 'view') {
      return;
    }
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

  get liveTimePeriods(): FormArray {
    return this.controlsAerial['liveTimePeriods'] as FormArray;
  }

  get deadTimePeriods(): FormArray {
    return this.controlsAerial['deadTimePeriods'] as FormArray;
  }

  addLiveTimePeriod(startTime: string = '', endTime: string = '') {
    const periodGroup = this.fb.group({
      startTime: [startTime, Validators.required],
      endTime: [endTime, Validators.required]
    });

    this.liveTimePeriods.push(periodGroup);
    periodGroup.valueChanges.subscribe(() => this.updateLiveTime());
  }

  addDeadTimePeriod(startTime: string = '', endTime: string = '') {
    const periodGroup = this.fb.group({
      startTime: [startTime, Validators.required],
      endTime: [endTime, Validators.required]
    });

    this.deadTimePeriods.push(periodGroup);
    periodGroup.valueChanges.subscribe(() => this.updateDeadTime());
  }

  removeLiveTimePeriod(index: number) {
    this.liveTimePeriods.removeAt(index);
    this.updateLiveTime();
  }

  removeDeadTimePeriod(index: number) {
    this.deadTimePeriods.removeAt(index);
    this.updateDeadTime();
  }

  private onLiveTimePeriodsChanges(): void {
    this.liveTimePeriods.valueChanges.subscribe(() => this.updateLiveTime());
  }

  private onDeadTimePeriodsChanges(): void {
    this.deadTimePeriods.valueChanges.subscribe(() => this.updateDeadTime());
  }

  private updateLiveTime(): void {
    const totalLiveTime = this.calculateTotalTime(this.liveTimePeriods);
    this.controlsAerial['liveTime'].setValue(totalLiveTime, { emitEvent: false });
  }

  private updateDeadTime(): void {
    const totalDeadTime = this.calculateTotalTime(this.deadTimePeriods);
    this.controlsAerial['deadTime'].setValue(totalDeadTime, { emitEvent: false });
  }

  private calculateTotalTime(periods: FormArray): string {
    let totalMinutes = 0;

    periods.controls.forEach(control => {
      const startTime = control.get('startTime')?.value;
      const endTime = control.get('endTime')?.value;

      if (startTime && endTime) {
        const start = this.parseTime(startTime);
        const end = this.parseTime(endTime);

        if (start && end) {
          const diff = (end.hours * 60 + end.minutes) - (start.hours * 60 + start.minutes);
          totalMinutes += diff;
        }
      }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  private parseTime(time: string): { hours: number, minutes: number } | null {
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return null;
    }
    return { hours, minutes };
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  public getIdRole(value: number) {
    return this.storageService.settings.roles.find((rol) => rol.key === value);
  }

  get pilots() {
    return this.users.filter((user) => user.rol === this.getIdRole(6).key);
  }

  get managers() {
    return this.users.filter((user) => user.rol === this.getIdRole(2).key);
  }
}
