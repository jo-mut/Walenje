import { prices as PricesStore } from '../../stores';

export async function setPrice(data: any) {
    const { USD, EUR, JMD } = data;
    PricesStore.setUSDRate(USD);
    PricesStore.setEURRate(EUR);
    PricesStore.setJMDRate(JMD);
}