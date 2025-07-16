import { useState, useEffect } from 'react';
import { fetchBookings } from '../services/bookings';

const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const data = await fetchBookings();
                setBookings(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);

    return { bookings, loading, error };
};

export default useBookings;