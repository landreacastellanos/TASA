import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../shared/models/role';
import { RoleService } from '../../../../shared/services/role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _roleService: RoleService
  ) {}

  ngOnInit(): void {}

  save(event) {
    console.log(event);
    const randNum = Math.floor(Math.random() * 1000);
    return this._userService.create({
      age: randNum,
      email: `juanse_${randNum}@yopmail.com`,
      last_name: `dussan_${randNum}`,
      name: `juanse_${randNum}`,
      password: `juanse_${randNum}@yopmail.com`,
      phone: randNum,
      profesion: `profesion_${randNum}`,
      role_id: 6,
    });
  }

  get roles(): Promise<Role[]> {
    return this._roleService.allRolesPromise;
  }
}
