import { Lots } from './lots';

export interface FarmsCreate {
    business_name: string;
    hectares_total: number;
    name: string;
    property_owner: number;
    seller: number;
    sowing_system: number;
    batchs: Lots[];
    direction?: string;
    phone?: number;
    web_page?: string;
    decision_influencer?: number;
    manager?: number;
    parthner_add?: number;
    pay_manager?: number;
    purchasing_manager?: number;
    responsible_purchasing?: number;
    id?: number;
}
