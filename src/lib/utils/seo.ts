import { env } from '$env/dynamic/public';

export const siteConfig = {
	name: env.PUBLIC_SITE_NAME || 'Hairven by Elyn',
	url: env.PUBLIC_SITE_URL || 'https://sishairven.com',
	description: 'Premium hair salon and beauty services in Cortland, NY. Expert styling, coloring, nails, and skincare.',
	address: {
		street: '64 Owego St',
		city: 'Cortland',
		state: 'NY',
		zip: '13045',
		country: 'US'
	},
	phone: '607-252-6610',
	email: 'info@sishairven.com',
	social: {
		facebook: 'https://facebook.com/hairvenbyelyn',
		instagram: 'https://instagram.com/hairvenbyelyn'
	}
};

export function generateMetaTags(options: {
	title?: string;
	description?: string;
	image?: string;
	path?: string;
	type?: 'website' | 'article';
	published?: string;
	modified?: string;
	author?: string;
} = {}) {
	const title = options.title 
		? `${options.title} | ${siteConfig.name}` 
		: siteConfig.name;
		
	const description = options.description || siteConfig.description;
	const url = `${siteConfig.url}${options.path || ''}`;
	const image = options.image || `${siteConfig.url}/og-image.jpg`;
	
	return {
		title,
		description,
		canonical: url,
		og: {
			title,
			description,
			url,
			image,
			type: options.type || 'website',
			siteName: siteConfig.name,
			...(options.published && { publishedTime: options.published }),
			...(options.modified && { modifiedTime: options.modified })
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			image
		}
	};
}

export function generateLocalBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'BeautySalon',
		name: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		telephone: siteConfig.phone,
		email: siteConfig.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: siteConfig.address.street,
			addressLocality: siteConfig.address.city,
			addressRegion: siteConfig.address.state,
			postalCode: siteConfig.address.zip,
			addressCountry: siteConfig.address.country
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 42.6012,
			longitude: -76.1805
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday'],
				opens: '09:00',
				closes: '18:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Tuesday', 'Wednesday', 'Friday'],
				opens: '08:30',
				closes: '19:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Thursday'],
				opens: '08:30',
				closes: '20:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Saturday'],
				opens: '08:30',
				closes: '18:00'
			}
		],
		priceRange: '$$$',
		image: `${siteConfig.url}/og-image.jpg`,
		sameAs: [
			siteConfig.social.facebook,
			siteConfig.social.instagram
		]
	};
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: `${siteConfig.url}${item.path}`
		}))
	};
}
