import { Lots } from './lots';

export interface FarmsCreate {
    business_name: string;
    direction: string;
    hectares_total: number;
    name: string;
    phone: number;
    property_owner: number;
    seller: number;
    sowing_system: number;
    web_page: string;
    batchs: Lots[];
    decision_influencer?: number;
    manager?: number;
    parthner_add?: number;
    pay_manager?: number;
    purchasing_manager?: number;
    responsible_purchasing?: number;
    id?: number;
}
