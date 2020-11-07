export type Role = RolAdministrador
| RolCapataz
| RolRespDecisionesDeCompra
| RolDuenoDeLaFinca
| RolSocioAdicional
| RolVendedorTASA
| RolInfluenciadorDeDecisionesDeCompra
| EncargadoDeCompras
| RolEncargadoDePagos;

export interface RolAdministrador { 'key': 1; 'role': 'Administrador'; }
export interface RolCapataz { 'key': 2; 'role': 'Capataz'; }
export interface RolRespDecisionesDeCompra { 'key': 3; 'role': 'Resp. Decisiones de Compra'; }
export interface RolDuenoDeLaFinca { 'key': 4; 'role': 'Dueño de la finca'; }
export interface RolSocioAdicional { 'key': 5; 'role': 'Socio Adicional'; }
export interface RolVendedorTASA { 'key': 6; 'role': 'Vendedor TASA'; }
export interface RolInfluenciadorDeDecisionesDeCompra { 'key': 7; 'role': 'Influenciador de Decisiones de Compra'; }
export interface EncargadoDeCompras { 'key': 8; 'role': 'Encargado de Compras'; }
export interface RolEncargadoDePagos { 'key': 9; 'role': 'Encargado de Pagos'; }
