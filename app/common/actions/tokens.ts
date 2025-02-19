import { Token as TokenService } from "@/app/services";
import { TokenStore } from "@/app/stores/tokens";

export async function loadTokens(store=TokenStore, service=TokenService) {
    const tokens = await service.loadTokens()
   
}

export async function saveToken(token, store=TokenStore, service=TokenService) {
    store.addToken(token);
    await service.saveTokens(store.list);
}