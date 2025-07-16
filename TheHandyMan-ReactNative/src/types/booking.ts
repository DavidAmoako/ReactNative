export interface Booking {
    id: string;
    userId: string;
    serviceId: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'canceled';
}

export interface BookingHistory {
    bookings: Booking[];
}

export interface CreateBookingRequest {
    userId: string;
    serviceId: string;
    date: string;
    time: string;
}

export interface UpdateBookingRequest {
    id: string;
    status: 'confirmed' | 'canceled';
}