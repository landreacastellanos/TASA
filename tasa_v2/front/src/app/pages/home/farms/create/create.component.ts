import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { RolAdministrador } from 'src/app/shared/models/role';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FarmsService } from '../farms.service';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  public farmForm: FormGroup;
  public submitted = false;
  public listLot = [];
  public initialListLot = [];
  public users = [];
  public systems = [];
  public mode: 'edit' | 'view' | 'create';
  public title = 'Registrar finca';
  public id: string;
  public idLot: number;
  public drone: boolean;
  public roleIdAdmin = new RolAdministrador().key;
  public roleId: any;

  constructor(
    public configService: ConfigurationService,
    private fb: FormBuilder,
    private router: Router,
    private farmsService: FarmsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private storageService: StorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.configService.loading = true;
    }, 1);
    this.roleId = this.storageService.settings.user.roleId;
    this.mode = this.route.snapshot.data.mode;
    return this.farmsService
      .getUsers()
      .then((infoUsers) => {
        this.users = infoUsers[0];
        return this.farmsService.getSystems().then((infoSystems) => {
          this.systems = infoSystems[0];
        });
      })
      .finally(() => {
        if (this.mode === 'view') {
          this.initView();
        } else {
          this.initCreate();
        }
      });
  }

  public initCreate() {
    this.mode = 'create';
    this.farmForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      businessName: ['', [Validators.required, Validators.minLength(3)]],
      web: [undefined],
      address: [undefined],
      phone: [undefined],
      totalHectares: [undefined, [Validators.required, Validators.min(0)]],
      system: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
      lotName: ['', [Validators.required]],
      lotHectare: ['', [Validators.required]],
      owner: [undefined, [Validators.required]],
      partner: [undefined],
      influencer: [undefined],
      liable: [undefined],
      foreman: [undefined],
      purchasingAgent: [undefined],
      paymentAgent: [undefined],
    });
    this.configService.loading = false;
  }

  public async initView() {
    this.mode = 'view';
    this.id = this.route.snapshot.paramMap.get('id');
    const farm = await this.farmsService.getFarm(this.id);
    this.idLot = farm.batchs.length > 0 ? farm.batchs[0].id : undefined;
    this.title = 'Consultar finca';
    this.listLot = [];
    this.farmForm = this.fb.group({
      name: [farm.name, [Validators.required, Validators.minLength(3)]],
      businessName: [
        farm.business_name,
        [Validators.required, Validators.minLength(3)],
      ],
      web: [farm.web_page],
      address: [farm.direction],
      phone: [farm.phone],
      totalHectares: [
        farm.hectares_total,
        [Validators.required, Validators.min(0)],
      ],
      system: [farm.sowing_system, [Validators.required]],
      vendor: [farm.seller, [Validators.required]],
      lotName: [
        farm.batchs.length > 0 ? farm.batchs[0].name : undefined,
        [Validators.required],
      ],
      lotHectare: [
        farm.batchs.length > 0 ? farm.batchs[0].hectares_number : undefined,
        [Validators.required],
      ],
      owner: [farm.property_owner, [Validators.required]],
      partner: [farm.parthner_add],
      influencer: [farm.decision_influencer],
      liable: [farm.responsible_purchasing],
      foreman: [farm.manager],
      purchasingAgent: [farm.purchasing_manager],
      paymentAgent: [farm.pay_manager],
    });
    if (farm.batchs.length > 1) {
      farm.batchs.forEach((element, index) => {
        if (index !== 0) {
          this.listLot.push({
            name: element.name,
            value: element.hectares_number,
            drone: element.dron,
            error: false,
            id: element.id,
          });
        }
      });
    }
    if (this.idLot) {
      this.drone = farm.batchs[0].dron;
      this.initialListLot.push({
        name: this.farmForm.value.lotName,
        value: this.farmForm.value.lotHectare,
        drone: farm.batchs[0].dron,
        error: false,
        id: this.idLot,
      });
      if (this.listLot.length) {
        this.listLot.forEach((element) => {
          this.initialListLot.push({
            name: element.name,
            value: element.value,
            drone: element.drone,
            error: false,
            id: element.id,
          });
        });
      }
    }
    this.disabledForm();
    this.configService.loading = false;
  }

  public edit() {
    this.mode = 'edit';
    this.title = 'Editar finca';
    this.disabledForm();
  }

  public disabledForm() {
    const keys = Object.keys(this.farmForm.value);
    keys.forEach((element) => {
      this.mode === 'view'
        ? this.farmForm.get(element).disable()
        : this.farmForm.get(element).enable();
    });
  }

  openDialogDelete(type, index?): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {message: 'Sí desmarcas el check, se borrarán los datos del punto 5 de los segmentos', subtitle: '¿Estás seguro de continuar?'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        if (type == 'drone') {          
          this.drone = !this.drone;
        }
        if (type == 'list') {
          this.listLot[index].drone = !this.listLot[index].drone;
        }
      }
    });
  }

  selectDrone(type, index?) {
    if (this.mode === 'view') {
      return;
    }
    if (type == 'drone') {
      if(!this.drone){
        this.openDialogDelete(type, index)
      }
    }
    if (type == 'list') {
      if(!this.listLot[index].drone){
        this.openDialogDelete(type, index)
      }
    }
  }

  public onSubmit() {
    this.viewErrorLots();
    this.submitted = true;
    if (!this.farmForm.valid || this.listLot.find((lot) => lot.error)) {
      return this.validationError();
    }
    this.configService.loading = true;
    let lots = [];
    lots = this.listLot
      .filter((lot) => lot.name)
      .map((lot) => {
        return {
          name: lot.name,
          hectares_number: lot.value,
          dron: lot.drone,
          id: lot.id ? lot.id : undefined,
        };
      });
    if (this.idLot) {
      lots.push({
        name: this.farmForm.value.lotName,
        hectares_number: this.farmForm.value.lotHectare,
        dron: this.drone,
        id: this.idLot,
      });
    } else {
      lots.push({
        name: this.farmForm.value.lotName,
        hectares_number: this.farmForm.value.lotHectare,
        dron: this.drone,
      });
    }
    this.initialListLot.forEach((lot) => {
      const deleteLot = lots.find((element) => element.id === lot.id);
      if (!deleteLot) {
        lots.push({
          name: lot.name,
          hectares_number: lot.value,
          id: lot.id,
          dron: lot.drone,
          delete: true,
        });
      }
    });
    const farm = {
      batchs: lots,
      business_name: this.farmForm.value.businessName,
      direction: this.farmForm.value.address,
      hectares_total: this.farmForm.value.totalHectares,
      name: this.farmForm.value.name,
      phone: this.farmForm.value.phone,
      seller: this.farmForm.value.vendor,
      sowing_system: this.farmForm.value.system,
      web_page: this.farmForm.value.web,
      property_owner: this.farmForm.value.owner,
      decision_influencer: this.farmForm.value.influencer,
      manager: this.farmForm.value.foreman,
      parthner_add: this.farmForm.value.partner,
      pay_manager: this.farmForm.value.paymentAgent,
      purchasing_manager: this.farmForm.value.purchasingAgent,
      responsible_purchasing: this.farmForm.value.liable,
      id: this.id ? parseInt(this.id, 10) : undefined,
    };
    const promise =
      this.mode === 'edit'
        ? this.farmsService.editFarm(farm)
        : this.farmsService.saveFarm(farm);

    const successMessage =
      this.mode === 'edit'
        ? 'Finca editada correctamente'
        : 'Finca creada correctamente';
    return promise
      .then((data) => {
        if (data !== null) {
          this.snackBar.open(successMessage, 'x', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          if (this.mode === 'edit') {
            this.initView();
          }
        }
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }

  public viewErrorLots() {
    this.listLot.forEach((lot) => {
      if ((lot.name || lot.value) && !(lot.name && lot.value)) {
        lot.error = true;
      } else {
        lot.error = false;
      }
    });
  }

  public goBack() {
    this.router.navigate(['/farms/list']);
  }

  get controls() {
    return this.farmForm.controls;
  }

  public validationError() {
    return this.snackBar.open('Rectifica los campos', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
  }

  public add() {
    if (this.mode === 'view') {
      return;
    }
    this.listLot.push({
      name: undefined,
      value: undefined,
      error: false,
      drone: false,
    });
  }

  public viewLot(lot?) {
    if (lot) {
      this.router.navigate(['/farms/calendar/', this.id, lot.id]);
    } else {
      this.router.navigate(['/farms/calendar/', this.id, this.idLot]);
    }
  }

  public getIdRole(value: number) {
    return this.storageService.settings.roles.find((rol) => rol.key === value);
  }

  public deleteLot(lot?) {
    if (confirm('¿Está seguro que desea eliminar este lote?')) {
      if (!lot) {
        if (this.listLot.length) {
          this.farmForm.get('lotName').setValue(this.listLot[0].name);
          this.farmForm.get('lotHectare').setValue(this.listLot[0].value);
          this.idLot = this.listLot[0].id;
          this.drone = this.listLot[0].drone;
          this.listLot = this.listLot.filter((item) => item.id !== this.idLot);
        } else {
          this.farmForm.get('lotName').setValue('');
          this.farmForm.get('lotHectare').setValue('');
          this.idLot = null;
          this.drone = false;
        }
      } else {
        if (lot.id) {
          this.listLot = this.listLot.filter((item) => item.id !== lot.id);
        } else {
          this.listLot = this.listLot.filter((item) => item.name !== lot.name);
        }
      }
    }
  }

  get vendors() {
    return this.users.filter((user) => user.rol === this.getIdRole(6).key);
  }

  get owners() {
    return this.users.filter((user) => user.rol === this.getIdRole(4).key);
  }

  get partners() {
    return this.users.filter((user) => user.rol === this.getIdRole(5).key);
  }

  get influencers() {
    return this.users.filter((user) => user.rol === this.getIdRole(7).key);
  }

  get liables() {
    return this.users.filter((user) => user.rol === this.getIdRole(3).key);
  }

  get foremen() {
    return this.users.filter((user) => user.rol === this.getIdRole(2).key);
  }

  get purchasingAgents() {
    return this.users.filter((user) => user.rol === this.getIdRole(8).key);
  }

  get paymentAgents() {
    return this.users.filter((user) => user.rol === this.getIdRole(9).key);
  }
}
