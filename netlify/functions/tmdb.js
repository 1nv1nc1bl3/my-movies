const TMDB_BASE = 'https://api.themoviedb.org/3';

export const handler = async (event) => {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
            return { statusCode: 500, body: 'Missing TMDB_API_KEY' };
        }

        const url = new URL(event.rawUrl);
        const path = url.searchParams.get('path'); // e.g. /search/movie
        if (!path || !path.startsWith('/')) {
            return { statusCode: 400, body: 'Missing/invalid path' };
        }

        // build forward URL (only TMDB)
        const forward = new URL(TMDB_BASE + path);

        // copy all query params except "path"
        url.searchParams.forEach((v, k) => {
            if (k !== 'path') forward.searchParams.set(k, v);
        });

        // attach api_key server-side
        forward.searchParams.set('api_key', apiKey);

        const res = await fetch(forward.toString());
        const text = await res.text();

        return {
            statusCode: res.status,
            headers: {
                'content-type':
                    res.headers.get('content-type') || 'application/json',
                'cache-control': 'public, max-age=60',
            },
            body: text,
        };
    } catch (e) {
        return { statusCode: 500, body: e?.message || 'Function error' };
    }
};
