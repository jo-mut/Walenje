import { Url } from "../constants";

const API_KEY = process.env.COIN_STATS_KEY;

export async function GET(req: Request) {
    const now = Math.floor(Date.now() / 1000);
    const urlParams = new URL(req.url).searchParams;
    const coinId = urlParams.get('coinId') || "ethereum";
    const currency = urlParams.get('currency') || "USD";


    try {
        
        const response = await fetch(
            // 'https://openapiv1.coinstats.app/coins/ethereum?currency=USD',
            `https://openapiv1.coinstats.app/coins/${coinId}?currency=${currency}`,
            {
                headers: {
                    accept: 'application/json',
                    'X-API-KEY': API_KEY!,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log("details api response ", result )
        return new Response(JSON.stringify({ data: result }), { status: 200 });
    } catch (error) {
        console.error('Error in GET function:', error);  // Log the error
        return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
}
