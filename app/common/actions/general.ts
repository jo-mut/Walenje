import Snackbar from 'react-native-snackbar';
import { Recents as RecentsService, Wallets as WalletsService } from '../../services';
import * as store from '../../stores';

export async function notify(title: string, duration: any, snackbar=Snackbar) {
    switch (duration) {

        case 'long':
            duration = snackbar.LENGTH_LONG;
            break;

        case 'indefinite':
            duration = snackbar.LENGTH_INDEFINITE;
            break;

        case 'short':
        default:
            duration = snackbar.LENGTH_SHORT;
            break;
    }
    
    snackbar.show({ title, duration });
}

export async function eraseAllData() {
    await cleanStorage();
    cleanStores();
}

function cleanStorage() {
    return [
        RecentsService.deleteRecentAddress(),
        WalletsService.deleteWalletPKs()
    ];
}

function cleanStores() {
    store.prices.reset();
    store.recents.reset();
    store.wallet.reset();
    store.wallets.reset();
    store.tokens.reset();
}