export async function tmdbFetch(path, params = {}, options = {}) {
    const qs = new URLSearchParams({ path, ...params });
    const res = await fetch(`/.netlify/functions/tmdb?${qs.toString()}`, {
        signal: options.signal,
    });

    if (!res.ok) {
        throw new Error(`TMDB proxy failed (${res.status})`);
    }

    return res.json();
}
