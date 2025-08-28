# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Custom Home Server Setup

This app is running on my custom proxmox home server and I am using ngrok to port foward it to the internet. Here are the steps how I made it work (not perfect but it works!):

### What I did to make it work

1. **Setup the proxmox server** - I have a custom proxmox homelab server where I run this app in a LXC container

2. **Install ngrok and get account** - First I download ngrok and create account to get auth token
   ```bash
   # Download ngrok 
   curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
   echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
   sudo apt update && sudo apt install ngrok
   
   # Add auth token (replace with your token)
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

### Current Status
- ✅ App runs on port 5173
- ✅ ngrok forwards domain to local port 5173  
- ✅ Both services start automatically on system boot
- ✅ Auto-restart if services crash

