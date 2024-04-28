import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DronesService } from '../drones.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public hidePassword = true;
  public hideRepeadPassword = true;
  public droneFg: FormGroup;
  public submitted = false;
  id: string;
  mode: 'edit' | undefined;
  title = 'Crear usuario';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private droneService: DronesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.droneFg = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        state: ['Activo', [Validators.required]],
        reason: ['', [Validators.maxLength(100)]],
      }
    );

    this.droneFg.get('state').valueChanges.subscribe((value) => {
      const reasonControl = this.droneFg.get('reason');
      if (value === 'Inactivo') {
        reasonControl.setValidators([Validators.required, Validators.maxLength(100)]);
      } else {
        reasonControl.clearValidators();
        reasonControl.setValue('');
      }
      reasonControl.updateValueAndValidity();
    });

    this.mode = this.route.snapshot.data.mode;
    if (this.mode === 'edit') {
      this.initEdit();
    }
  }

  async initEdit() {
    this.title = 'Editar dron';
    this.id = this.route.snapshot.paramMap.get('id');
    const drone = await this.droneService.getDronesById(this.id);
    this.droneFg.get('name').setValue(drone.name);
    this.droneFg.get('state').setValue(drone.state? 'Activo' : 'Inactivo');
    this.droneFg.get('reason').setValue(drone.reason);
  }

  onSubmit() {
    this.submitted = true;
    if (!this.droneFg.valid) {
      return this.validationError();
    }

    const {
      ...droneCreate
    } = this.droneFg.value;

    const droneSerialized = {
      ...droneCreate,
      state: droneCreate.state == 'Activo'? true : false,
      reason: droneCreate.reason ?? ''
    };

    const promise =
      this.mode === 'edit'
        ? this.droneService.edit(droneSerialized, this.id)
        : this.droneService.create(droneSerialized);

    const successMessage =
      this.mode === 'edit' ? 'Dron editado' : 'Dron creado';

    return promise.then((data) => {
      if (data === null) {
        return null;
      }
      this.snackBar.open(successMessage, 'x', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
      this.goBack();
    });
  }

  validationError() {
    return this.snackBar.open('Rectifica los campos', 'x', {
      duration: 2000,
      panelClass: ['snackbar-warn'],
    });
  }

  goBack() {
    this.router.navigate(['/drones/']);
  }

  get sponsorImg() {
    return;
  }

  get sponsorText() {
    switch (this.mode) {
      case 'edit':
        return 'No nos hemos ido de su finca, seguimos monitoreando la productividad de su lote';

      default:
        return 'Nuestro negocio es incrementar la ganancia de nuestros clientes';
    }
  }

  get controls() {
    return this.droneFg.controls;
  }
}
