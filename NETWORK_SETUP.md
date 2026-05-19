# Network Sharing Setup Guide

This guide explains how to make your Ecran application accessible across your local network (LAN).

## Prerequisites

- Application running with Docker Compose: `docker-compose up`
- Machines on the same network (WiFi or Ethernet)
- Your machine's local IP address

## Step 1: Find Your Machine's Local IP Address

### macOS
```bash
ipconfig getifaddr en0
```
Example output: `192.168.1.100`

### Linux
```bash
hostname -I
```
Example output: `192.168.1.100 10.0.0.5`

### Windows
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter (typically `192.168.x.x` or `10.x.x.x`)

## Step 2: Configure Environment Variables

Copy `.env.example` to `.env` (if you haven't already):
```bash
cp .env.example .env
```

Edit `.env` and update the IP address entries:
```env
# Replace 192.168.1.100 with YOUR machine's actual IP address
STRAPI_PUBLIC_URL=http://192.168.1.100:1337
NUXT_PUBLIC_STRAPI_URL=http://192.168.1.100:1337
```

## Step 3: Start the Application

```bash
docker-compose up
```

## Step 4: Access from Other Machines

From any other machine on your network:

### Frontend (Nuxt App)
```
http://192.168.1.100:3005
```

### Backend API (Strapi)
```
http://192.168.1.100:1337
```

### Backend Admin Panel
```
http://192.168.1.100:1337/admin
```

## Network Architecture

```
┌─────────────────────────────────────────────────────┐
│           Your Local Network                         │
│ (192.168.1.x / 10.x.x.x)                           │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  Your Machine (Server)                      │  │
│  │  IP: 192.168.1.100 (replace with your IP)  │  │
│  │                                             │  │
│  │  ┌──────────────┐  ┌──────────────────────┐│  │
│  │  │   Frontend   │  │   Backend (Strapi)   ││  │
│  │  │ Port: 3005   │  │   Port: 1337         ││  │
│  │  │ 0.0.0.0:3005 │  │   0.0.0.0:1337       ││  │
│  │  └──────────────┘  └──────────────────────┘│  │
│  │                                             │  │
│  │  ┌──────────────────────────────────────┐  │  │
│  │  │   Database (PostgreSQL)              │  │  │
│  │  │   Port: 5432 (internal only)         │  │  │
│  │  └──────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Other Device │  │ Other Device │  ...       │
│  │ Access:      │  │ Access:      │            │
│  │ 192.168.1.100│  │ 192.168.1.100│            │
│  │:3005 & :1337 │  │:3005 & :1337 │            │
│  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────────┘
```

## Port Forwarding

If you want to access the application **outside your local network** (over the internet), you'll need to:

1. Set up port forwarding on your router:
   - Forward ports `3005` and `1337` to your machine's local IP
   - Configuration varies by router model; consult your router's manual

2. Use your public IP or domain name instead:
   ```env
   STRAPI_PUBLIC_URL=http://your-public-ip:1337
   NUXT_PUBLIC_STRAPI_URL=http://your-public-ip:1337
   ```

3. **Security considerations**:
   - Change all default passwords (database, admin)
   - Use HTTPS (requires SSL certificate)
   - Consider using a service like ngrok for temporary external access
   - Never expose to the internet without proper authentication

## Troubleshooting

### "Cannot reach server from other machines"

1. **Verify IP address**: Double-check your machine's IP matches what you used in `.env`
2. **Check firewall**: Ensure ports 3005 and 1337 are not blocked
   - macOS: System Settings → Network → Firewall
   - Linux: `sudo ufw allow 3005 && sudo ufw allow 1337`
   - Windows: Windows Defender Firewall → Allow an app through firewall
3. **Verify containers are running**: `docker-compose ps`
4. **Check logs**: `docker-compose logs strapi` and `docker-compose logs frontend`

### "Connection refused"

1. Restart services: `docker-compose restart`
2. Rebuild images: `docker-compose down && docker-compose up --build`
3. Check if ports are in use: `lsof -i :3005` and `lsof -i :1337`

### "Frontend loads but can't reach API"

1. Verify `NUXT_PUBLIC_STRAPI_URL` is set correctly in `.env`
2. Check browser console for CORS errors (likely frontend to backend communication)
3. Ensure the backend is running: `curl http://192.168.1.100:1337/admin`

## Development vs Production

### Development (Current Setup)
- All services accessible on network
- Hot reload enabled
- No HTTPS

### Production Considerations
- Use HTTPS with SSL certificates
- Implement authentication
- Use proper DNS/domain names instead of IPs
- Set strong passwords
- Use environment-specific configurations
- Consider using reverse proxy (nginx, traefik)

## Environment Variables Quick Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `STRAPI_PUBLIC_URL` | Backend's external URL (for API responses) | `http://192.168.1.100:1337` |
| `NUXT_PUBLIC_STRAPI_URL` | Frontend's API endpoint (browser-visible) | `http://192.168.1.100:1337` |
| `STRAPI_URL` | Backend URL from frontend container (internal) | `http://strapi:1337` |
| `HOST` | Bind to all interfaces | `0.0.0.0` |
| `PORT` | Service port | `3000` / `1337` |

## Next Steps

1. ✅ Configure `.env` with your machine's IP
2. ✅ Start Docker Compose
3. ✅ Access from other machines
4. 📝 Set up authentication for shared access
5. 🔒 Consider HTTPS for remote access
6. 🚀 Deploy to proper hosting if needed
