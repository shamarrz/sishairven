/**
 * Input Validation Utilities
 * 
 * Provides validation functions for API inputs, form data,
 * and user-submitted content to prevent injection attacks.
 * 
 * @module lib/security/validation
 * @author Hairven Dev Team
 * @since 2026-02-10
 */

import { error } from '@sveltejs/kit';

// Validation result type
export interface ValidationResult<T> {
	success: boolean;
	data?: T;
	errors?: string[];
}

// Email validation regex (RFC 5322 compliant)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Phone validation (international format)
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

// ASIN validation (Amazon product ID)
const ASIN_REGEX = /^[A-Z0-9]{10}$/;

// URL validation
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

// Country code validation (ISO 3166-1 alpha-2)
const COUNTRY_CODE_REGEX = /^[A-Z]{2}$/;

// Language code validation
const LANGUAGE_CODE_REGEX = /^[a-z]{2}(-[A-Z]{2})?$/;

/**
 * Validate email address
 */
export function validateEmail(email: unknown): ValidationResult<string> {
	if (typeof email !== 'string') {
		return { success: false, errors: ['Email must be a string'] };
	}
	
	const trimmed = email.trim().toLowerCase();
	
	if (trimmed.length === 0) {
		return { success: false, errors: ['Email is required'] };
	}
	
	if (trimmed.length > 254) {
		return { success: false, errors: ['Email too long'] };
	}
	
	if (!EMAIL_REGEX.test(trimmed)) {
		return { success: false, errors: ['Invalid email format'] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Validate phone number
 */
export function validatePhone(phone: unknown): ValidationResult<string> {
	if (typeof phone !== 'string') {
		return { success: false, errors: ['Phone must be a string'] };
	}
	
	const trimmed = phone.trim();
	
	if (trimmed.length === 0) {
		return { success: false, errors: ['Phone is required'] };
	}
	
	if (trimmed.length > 20) {
		return { success: false, errors: ['Phone number too long'] };
	}
	
	// Remove common formatting characters for validation
	const digitsOnly = trimmed.replace(/[\s\-\.\(\)+]/g, '');
	if (digitsOnly.length < 7 || digitsOnly.length > 15) {
		return { success: false, errors: ['Phone number must be 7-15 digits'] };
	}
	
	if (!PHONE_REGEX.test(trimmed)) {
		return { success: false, errors: ['Invalid phone format'] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Validate name (first/last name)
 */
export function validateName(name: unknown, fieldName: string = 'Name'): ValidationResult<string> {
	if (typeof name !== 'string') {
		return { success: false, errors: [`${fieldName} must be a string`] };
	}
	
	const trimmed = name.trim();
	
	if (trimmed.length === 0) {
		return { success: false, errors: [`${fieldName} is required`] };
	}
	
	if (trimmed.length < 2) {
		return { success: false, errors: [`${fieldName} too short`] };
	}
	
	if (trimmed.length > 100) {
		return { success: false, errors: [`${fieldName} too long (max 100 chars)`] };
	}
	
	// Check for suspicious characters (potential injection)
	const suspiciousPattern = /[<>{}\[\]$]|javascript:|data:|vbscript:/i;
	if (suspiciousPattern.test(trimmed)) {
		return { success: false, errors: [`${fieldName} contains invalid characters`] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Validate message/text content
 */
export function validateMessage(message: unknown, maxLength: number = 2000): ValidationResult<string> {
	if (typeof message !== 'string') {
		return { success: false, errors: ['Message must be a string'] };
	}
	
	const trimmed = message.trim();
	
	if (trimmed.length === 0) {
		return { success: true, data: '' }; // Empty is ok for optional messages
	}
	
	if (trimmed.length > maxLength) {
		return { success: false, errors: [`Message too long (max ${maxLength} chars)`] };
	}
	
	// Check for script injection
	const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	if (scriptPattern.test(trimmed)) {
		return { success: false, errors: ['Message contains invalid content'] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Validate Amazon ASIN
 */
export function validateASIN(asin: unknown): ValidationResult<string> {
	if (typeof asin !== 'string') {
		return { success: false, errors: ['ASIN must be a string'] };
	}
	
	const trimmed = asin.trim().toUpperCase();
	
	if (trimmed.length === 0) {
		return { success: false, errors: ['ASIN is required'] };
	}
	
	if (!ASIN_REGEX.test(trimmed)) {
		return { success: false, errors: ['Invalid ASIN format (10 alphanumeric characters)'] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Validate URL
 */
export function validateURL(url: unknown, allowedProtocols: string[] = ['http:', 'https:']): ValidationResult<string> {
	if (typeof url !== 'string') {
		return { success: false, errors: ['URL must be a string'] };
	}
	
	const trimmed = url.trim();
	
	if (trimmed.length === 0) {
		return { success: false, errors: ['URL is required'] };
	}
	
	if (trimmed.length > 2048) {
		return { success: false, errors: ['URL too long'] };
	}
	
	try {
		const parsed = new URL(trimmed);
		
		if (!allowedProtocols.includes(parsed.protocol)) {
			return { success: false, errors: [`URL must use ${allowedProtocols.join(' or ')}`] };
		}
		
		// Check for localhost/private IPs in production
		if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname.startsWith('192.168.') || parsed.hostname.startsWith('10.')) {
			return { success: false, errors: ['URL cannot point to internal addresses'] };
		}
		
		return { success: true, data: trimmed };
	} catch {
		return { success: false, errors: ['Invalid URL format'] };
	}
}

/**
 * Validate country code
 */
export function validateCountryCode(code: unknown): ValidationResult<string> {
	if (typeof code !== 'string') {
		return { success: false, errors: ['Country code must be a string'] };
	}
	
	const trimmed = code.trim().toUpperCase();
	
	if (trimmed.length === 0) {
		return { success: false, errors: ['Country code is required'] };
	}
	
	if (!COUNTRY_CODE_REGEX.test(trimmed)) {
		return { success: false, errors: ['Invalid country code (2 uppercase letters)'] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Validate language code
 */
export function validateLanguageCode(code: unknown): ValidationResult<string> {
	if (typeof code !== 'string') {
		return { success: false, errors: ['Language code must be a string'] };
	}
	
	const trimmed = code.trim().toLowerCase();
	
	if (trimmed.length === 0) {
		return { success: false, errors: ['Language code is required'] };
	}
	
	if (!LANGUAGE_CODE_REGEX.test(trimmed)) {
		return { success: false, errors: ['Invalid language code format'] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Validate date string
 */
export function validateDate(dateStr: unknown, allowFuture: boolean = true): ValidationResult<string> {
	if (typeof dateStr !== 'string') {
		return { success: false, errors: ['Date must be a string'] };
	}
	
	const trimmed = dateStr.trim();
	
	if (trimmed.length === 0) {
		return { success: false, errors: ['Date is required'] };
	}
	
	const date = new Date(trimmed);
	
	if (isNaN(date.getTime())) {
		return { success: false, errors: ['Invalid date format'] };
	}
	
	if (!allowFuture && date > new Date()) {
		return { success: false, errors: ['Date cannot be in the future'] };
	}
	
	// Check date is reasonable (not too far in past or future)
	const now = new Date();
	const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
	const oneYearFromNow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
	
	if (date < oneYearAgo || date > oneYearFromNow) {
		return { success: false, errors: ['Date out of reasonable range'] };
	}
	
	return { success: true, data: trimmed };
}

/**
 * Sanitize HTML content (basic)
 * Removes script tags and dangerous attributes
 */
export function sanitizeHTML(input: string): string {
	return input
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
		.replace(/on\w+\s*=/gi, '')
		.replace(/javascript:/gi, '')
		.replace(/data:text\/html/gi, '');
}

/**
 * Validate and throw SvelteKit error if invalid
 */
export function validateOrThrow<T>(
	result: ValidationResult<T>,
	status: number = 400
): T {
	if (!result.success) {
		throw error(status, { message: result.errors?.join(', ') || 'Validation failed' });
	}
	return result.data!;
}

/**
 * Validate appointment booking data
 */
export function validateBookingData(data: unknown): ValidationResult<{
	name: string;
	phone: string;
	email: string;
	service: string;
	date: string;
	message?: string;
}> {
	if (!data || typeof data !== 'object') {
		return { success: false, errors: ['Invalid request data'] };
	}
	
	const d = data as Record<string, unknown>;
	const errors: string[] = [];
	
	// Validate required fields
	const nameResult = validateName(d.name, 'Name');
	if (!nameResult.success) errors.push(...(nameResult.errors || []));
	
	const phoneResult = validatePhone(d.phone);
	if (!phoneResult.success) errors.push(...(phoneResult.errors || []));
	
	const emailResult = validateEmail(d.email);
	if (!emailResult.success) errors.push(...(emailResult.errors || []));
	
	const dateResult = validateDate(d.date, true);
	if (!dateResult.success) errors.push(...(dateResult.errors || []));
	
	// Validate service
	if (typeof d.service !== 'string' || d.service.trim().length === 0) {
		errors.push('Service is required');
	}
	
	// Validate optional message
	const messageResult = validateMessage(d.message || '');
	
	if (errors.length > 0) {
		return { success: false, errors };
	}
	
	return {
		success: true,
		data: {
			name: nameResult.data!,
			phone: phoneResult.data!,
			email: emailResult.data!,
			service: String(d.service).trim(),
			date: dateResult.data!,
			message: messageResult.data || undefined,
		}
	};
}
