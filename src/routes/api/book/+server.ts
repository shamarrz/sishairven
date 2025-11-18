import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { saveAppointment } from '$lib/db';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		
		const { name, phone, email, service, date, message } = data;
		
		// Basic validation
		if (!name || !phone || !email || !service || !date) {
			return json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}
		
		// Save to database
		const id = await saveAppointment({
			name,
			phone,
			email,
			service,
			date,
			message: message || ''
		});
		
		return json({
			success: true,
			id,
			message: 'Appointment request submitted successfully!'
		});
	} catch (error) {
		console.error('Error saving appointment:', error);
		return json(
			{ error: 'Failed to save appointment' },
			{ status: 500 }
		);
	}
};

