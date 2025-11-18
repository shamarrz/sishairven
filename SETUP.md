# Setup Instructions

## Quick Start

1. **Copy Images**
   ```bash
   cd /home/ajebo/sishairven
   bash copy-images.sh
   ```
   Or manually copy:
   ```bash
   cp /home/ajebo/hair.WEBP static/
   cp /home/ajebo/nails.WEBP static/
   cp /home/ajebo/skincare.WEBP static/
   cp /home/ajebo/events.WEBP static/
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build and Run with Docker**
   ```bash
   docker compose up --build
   ```

4. **Access the Website**
   Open http://localhost:8080 in your browser

## Development Mode

For development with hot reload:

```bash
npm run dev
```

Then access http://localhost:5173

## Notes

- The booking form data is stored in `/data/appointments.db` (persistent Docker volume)
- Source code is mounted as read-only in production for easy updates
- To update the website, edit files in `/home/ajebo/sishairven/src/` and restart the container

