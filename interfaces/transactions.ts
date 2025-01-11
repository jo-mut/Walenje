export interface TransactionProps {
	timestamp?: string;
	from?: string;
	to?: string;
	value?: string;
    fiatValue?: string;
    type?: string;
	category?: string;
	balance?: string;
	logo?: string;
	txreceipt_status?: string;
}