import { dirname } from 'path';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';

const dbPath = process.env.DB_PATH || '/data/appointments.json';
const dbDir = dirname(dbPath);

// Ensure directory exists
try {
	mkdirSync(dbDir, { recursive: true });
} catch (err) {
	// Directory might already exist
}

// Initialize database file if it doesn't exist
if (!existsSync(dbPath)) {
	writeFileSync(dbPath, JSON.stringify([]), 'utf-8');
}

export interface Appointment {
	id: string;
	name: string;
	phone: string;
	email: string;
	service: string;
	date: string;
	message?: string;
	createdAt: string;
}

export function saveAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
			const fullAppointment: Appointment = {
				...appointment,
				id,
				createdAt: new Date().toISOString()
			};

			// Read existing appointments
			let appointments: Appointment[] = [];
			if (existsSync(dbPath)) {
				const data = readFileSync(dbPath, 'utf-8');
				try {
					appointments = JSON.parse(data);
				} catch (e) {
					appointments = [];
				}
			}

			// Add new appointment
			appointments.push(fullAppointment);

			// Write back to file
			writeFileSync(dbPath, JSON.stringify(appointments, null, 2), 'utf-8');
			resolve(id);
		} catch (err) {
			reject(err);
		}
	});
}

export function getAllAppointments(): Promise<Appointment[]> {
	return new Promise((resolve, reject) => {
		try {
			let appointments: Appointment[] = [];
			
			if (existsSync(dbPath)) {
				const data = readFileSync(dbPath, 'utf-8');
				try {
					appointments = JSON.parse(data);
				} catch (e) {
					appointments = [];
				}
			}
			
			// Sort by createdAt descending
			appointments.sort((a, b) => 
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
			
			resolve(appointments);
		} catch (err) {
			reject(err);
		}
	});
}

