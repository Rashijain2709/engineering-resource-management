import { useEffect, useState } from 'react';
import axios from '../lib/axios';

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(url)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err?.response?.data?.message || err.message || 'Error fetching data');
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}
