# Quick Start Guide

## 1. Generate SSH Key for GitHub

Run this command to generate the SSH key:

```bash
ssh-keygen -t ed25519 -C "github-hairven" -f ~/.ssh/id_ed25519_hairven -N ""
```

Then display the public key:

```bash
cat ~/.ssh/id_ed25519_hairven.pub
```

**Copy the entire output** (starts with `ssh-ed25519`) - you'll need to paste this into GitHub.

## 2. Add SSH Key to GitHub

1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: `Hairven Repo`
4. Key type: `Authentication Key`
5. Paste the public key you copied
6. Click "Add SSH key"

## 3. Configure SSH

Add this to `~/.ssh/config`:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh

cat >> ~/.ssh/config << 'EOF'

Host github.com-hairven
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_hairven
    IdentitiesOnly yes
EOF

chmod 600 ~/.ssh/config
```

## 4. Test SSH Connection

```bash
ssh -T git@github.com-hairven
```

You should see: "Hi shamarrz! You've successfully authenticated..."

## 5. Initialize Git and Push

```bash
cd /home/ajebo/sishairven

# Make scripts executable
chmod +x generate-ssh-key.sh setup.sh deploy.sh init-git.sh

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Hairven by Elyn salon website

- Immersive dynamic background with 5 cycling images
- Dark theme design with pink and gold accents
- Collapsible pricing sections
- Online booking form with JSON storage
- Fully responsive mobile-first design
- Docker containerization
- Caddy reverse proxy integration"

# Add remote
git remote add origin git@github.com:shamarrz/hairven.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 6. Deploy the Application

```bash
# Run setup
./setup.sh

# Deploy
./deploy.sh
```

The website will be available at `http://localhost:8080`

## Alternative: Use the Helper Scripts

If you prefer, you can use the helper scripts:

```bash
# Generate SSH key (displays public key)
./generate-ssh-key.sh

# After adding key to GitHub, initialize and push
./init-git.sh

# Setup and deploy
./setup.sh
./deploy.sh
```

