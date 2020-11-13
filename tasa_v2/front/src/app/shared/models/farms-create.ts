import { Lots } from './lots';

export interface FarmsCreate {
    business_name: string;
    decision_influence: number;
    direction: string;
    hectares_total: number;
    manager: number;
    name: string;
    parthner_add: number;
    pay_manager: number;
    phone: number;
    property_owner: number;
    purchasing_manager: number;
    responsible_purchasing: number;
    seller: number;
    sowing_system: number;
    web_page: string;
    batchs: Lots[];
    id?: number;
}
