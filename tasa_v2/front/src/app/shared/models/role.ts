export type Role = RolAdministrador
| RolCapataz
| RolRespDecisionesDeCompra
| RolDuenoDeLaFinca
| RolSocioAdicional
| RolVendedorTASA
| RolInfluenciadorDeDecisionesDeCompra
| EncargadoDeCompras
| RolEncargadoDePagos
| { key: number, role: string };

export class RoleGeneric {  readonly key: number;  readonly role: string; }
export class RolAdministrador extends RoleGeneric {  readonly key = 1;  readonly role: 'Administrador'; }
export class RolCapataz extends RoleGeneric {  readonly key = 2;  readonly role: 'Capataz'; }
export class RolRespDecisionesDeCompra extends RoleGeneric {  readonly key = 3;  readonly role: 'Resp. Decisiones de Compra'; }
export class RolDuenoDeLaFinca extends RoleGeneric {  readonly key = 4;  readonly role: 'Dueño de la finca'; }
export class RolSocioAdicional extends RoleGeneric {  readonly key = 5;  readonly role: 'Socio Adicional'; }
export class RolVendedorTASA extends RoleGeneric {  readonly key = 6;  readonly role: 'Vendedor TASA'; }
export class RolInfluenciadorDeDecisionesDeCompra extends RoleGeneric {  readonly key = 7;  readonly role: 'Influenciador de Decisiones de Compra'; }
export class EncargadoDeCompras extends RoleGeneric {  readonly key = 8;  readonly role: 'Encargado de Compras'; }
export class RolEncargadoDePagos extends RoleGeneric {  readonly key = 9;  readonly role: 'Encargado de Pagos'; }
