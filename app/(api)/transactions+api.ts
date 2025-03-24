import { Url } from "../constants";

const API_KEY = process.env.ETHERSCAN_API_KEY!;

export async function GET(req: Request) {
    const urlParams = new URL(req.url).searchParams;
    const address = urlParams.get('address') || "0x7f97AF011af788fbea229D2555a1f0728D97B7D8";

    const ETHERSCAN = (process.env.NODE_ENV === 'production') ?
        'https://api.etherscan.io/api?' :
        'https://sepolia.etherscan.io/api?';


    const url = new URL('https://api.etherscan.io/api?');
    url.searchParams.append('module', 'account'); 
    url.searchParams.append('action', 'txlist');
    url.searchParams.append('address', address); 
    url.searchParams.append('startblock', '0');
    url.searchParams.append('endblock', '99999999');
    url.searchParams.append('page', '1');
    url.searchParams.append('offset', '10');
    url.searchParams.append('sort', 'asc');
    url.searchParams.append('apikey', API_KEY);


    console.log(`urlParams `, urlParams);

    try {
        console.log(`Fetching transaction history for ${address}`);

        const response = await fetch(
            url,
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
        // console.log("API Response Data:", result);

        return new Response(JSON.stringify({ data: result }), { status: 200 });
    } catch (error) {
        console.error('Error in GET function:', error);  // Log the error
        return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
}
