import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FarmsService } from '../farms.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('myForm', { static: false }) myForm: NgForm;

  public farmForm: FormGroup;
  public submitted = false;
  public listLot = [];
  public users = [];
  public systems = [];

  constructor(
    public configService: ConfigurationService,
    private fb: FormBuilder,
    private router: Router,
    private farmsService: FarmsService,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) { }

  ngOnInit(): Promise<void> {
    this.configService.initialPage = false;
    this.configService.loading = true;
    this.farmForm = this.fb.group(
      {
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
      }
    );
    this.configService.loading = false;
    return this.farmsService.getUsers().then(infoUsers => {
      this.users = infoUsers[0];
      return this.farmsService.getSystems().then(infoSystems => {
        this.systems = infoSystems[0];
      });
    });
  }

  public onSubmit() {
    this.viewErrorLots();
    this.submitted = true;
    if (!this.farmForm.valid || this.listLot.find(lot => lot.error)) {
      return this.validationError();
    }
    let lots = [];
    lots = this.listLot.filter(lot => lot.name).map(lot => {
      return {
        name: lot.name,
        hectares_number: lot.value
      };
    });
    lots.push({ name: this.farmForm.value.lotName, hectares_number: this.farmForm.value.lotHectare });

    return this.farmsService.saveFarm({
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
      manager: this.farmForm.value.foreman ? this.farmForm.value.foreman : undefined,
      parthner_add: this.farmForm.value.partner,
      pay_manager: this.farmForm.value.paymentAgent,
      purchasing_manager: this.farmForm.value.purchasingAgent,
      responsible_purchasing: this.farmForm.value.liable,
    }).then((data) => {
      if (data !== null) {
        return this.snackBar.open('Finca creada correctamente', 'x', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
    });
  }

  public viewErrorLots() {
    this.listLot.forEach(lot => {
      if ((lot.name || lot.value) && !(lot.name && lot.value)) {
        lot.error = true;
      } else {
        lot.error = false;
      }
    });
  }

  public goBack() {
    this.router.navigate(['/users/']);
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
    setTimeout(() => {
      if (this.myForm?.errors) {
        this.myForm.resetForm();
      }
    }, 2000);

    this.listLot.push({ name: undefined, value: undefined, error: false });
  }

  public getIdRole(value: string) {
    return this.storageService.settings.roles.find(rol => rol.role === value);
  }

  get vendors() {
    return this.users.filter(user => user.rol === this.getIdRole('Vendedor TASA').key);
  }

  get owners() {
    return this.users.filter(user => user.rol === this.getIdRole('Dueño de la finca').key);
  }

  get partners() {
    return this.users.filter(user => user.rol === this.getIdRole('Socio Adicional').key);
  }

  get influencers() {
    return this.users.filter(user => user.rol === this.getIdRole('Influenciador de Decisiones de Compra').key);
  }

  get liables() {
    return this.users.filter(user => user.rol === this.getIdRole('Resp. Decisiones de Compra').key);
  }

  get foremen() {
    return this.users.filter(user => user.rol === this.getIdRole('Capataz').key);
  }

  get purchasingAgents() {
    return this.users.filter(user => user.rol === this.getIdRole('Encargado de Compras').key);
  }

  get paymentAgents() {
    return this.users.filter(user => user.rol === this.getIdRole('Encargado de Pagos').key);
  }

}
