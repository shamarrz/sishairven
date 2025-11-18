# Hairven by Elyn - Salon Website

A beautiful, immersive one-page website for Hairven by Elyn hair salon and beauty services. Features dynamic background cycling, dark theme design, collapsible pricing sections, and online booking functionality.

## Features

- 🎨 **Immersive Dynamic Background** - Cycles through 5 beautiful background images
- 🌙 **Dark Theme Design** - Elegant dark theme with pink and gold accents
- 📱 **Fully Responsive** - Mobile-first design with optimized mobile navigation
- ✨ **Collapsible Pricing** - Click service images to expand/collapse pricing tables
- 📞 **Quick Call Button** - Red call button for instant contact
- 📝 **Online Booking** - Appointment booking form with persistent storage
- 🔒 **Secure & Stealthy** - Designed for professional use with security headers

## Tech Stack

- **Frontend**: SvelteKit, TailwindCSS
- **Database**: JSON file-based storage (appointments.json)
- **Container**: Docker (Alpine-based)
- **Reverse Proxy**: Caddy with Cloudflare DNS-01 wildcard certificates

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- Cloudflare account with API token (for SSL certificates)

## Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:shamarrz/hairven.git
cd hairven
```

### 2. Copy Images

Ensure background images are in place:
```bash
# Background images should be in static/bg/
ls static/bg/
# Should show: bg1.webp, bg2.webp, bg3.webp, bg4.webp, bg5.webp
```

### 3. Run Setup Script

```bash
chmod +x setup.sh
./setup.sh
```

### 4. Deploy

```bash
chmod +x deploy.sh
./deploy.sh
```

The website will be available at `http://localhost:8080`

## Manual Setup

### Install Dependencies

```bash
npm install
```

### Build for Production

```bash
npm run build
```

### Run with Docker

```bash
docker compose up --build -d
```

### View Logs

```bash
docker compose logs -f
```

### Stop Services

```bash
docker compose down
```

## Caddy Integration

This website is designed to work behind Caddy reverse proxy with Cloudflare.

### Caddy Configuration

Add to your Caddyfile:

```
sishairven.com, *.sishairven.com {
  tls {
    dns cloudflare {env.CLOUDFLARE_API_TOKEN}
  }
  
  @sishairven host sishairven.com
  reverse_proxy @sishairven http://172.22.0.4:8080 {
    header_up Host {host}
    header_up X-Real-IP {remote}
    header_up X-Forwarded-For {remote}
    header_up X-Forwarded-Proto {scheme}
  }
}
```

**Note**: Update `172.22.0.4` with your server's internal IP address.

## Project Structure

```
sishairven/
├── src/
│   ├── routes/
│   │   ├── +page.svelte      # Main page
│   │   └── api/
│   │       └── book/         # Booking API endpoint
│   ├── lib/
│   │   └── db.ts             # Database utilities
│   ├── app.css               # Global styles
│   └── app.html              # HTML template
├── static/
│   ├── bg/                   # Background images
│   ├── hair.WEBP
│   ├── nails.WEBP
│   ├── skincare.WEBP
│   └── events.WEBP
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Environment Variables

The application uses the following environment variables:

- `DB_PATH` - Path to appointments JSON file (default: `/data/appointments.json`)
- `NODE_ENV` - Environment (production/development)
- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)

## Data Persistence

Appointment data is stored in `/data/appointments.json` as a JSON file. The data directory is mounted as a Docker volume for persistence across container restarts.

## Development

### Local Development

```bash
npm run dev
```

Access at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:
- Pink shades for feminine aesthetic
- Gold accents for elegance
- Black/gray for dark theme

### Background Images

Replace images in `static/bg/`:
- bg1.webp through bg5.webp
- Images cycle every 5 seconds
- Recommended: 1920x1080 or higher resolution

### Services & Pricing

Edit `src/routes/+page.svelte` to update:
- Service categories
- Pricing tables
- Service descriptions

## Mobile View

Mobile navigation shows only:
- Salon title (left)
- Book button (right)

All other navigation is hidden on mobile for a clean, minimal interface.

## Security Features

- Security headers (HSTS, X-Frame-Options, etc.)
- Input validation on booking form
- Secure data storage
- HTTPS via Caddy/Cloudflare

## Troubleshooting

### Port Already in Use

```bash
# Check what's using port 8080
sudo lsof -i :8080

# Or change port in docker-compose.yml
ports:
  - "8081:3000"  # Change 8080 to 8081
```

### Docker Build Fails

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker compose build --no-cache
```

### Images Not Loading

Ensure all images are in `static/` directory:
- Background images: `static/bg/bg1.webp` through `bg5.webp`
- Service images: `static/hair.WEBP`, `static/nails.WEBP`, etc.

## License

Private repository - All rights reserved.

## Contact

Hairven by Elyn
64 OWEGO ST, CORTLAND NY 13045
Phone: 607.252.6610
