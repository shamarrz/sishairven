# GitHub Setup Instructions

Follow these steps to set up SSH access and push the code to GitHub.

## Step 1: Generate SSH Key

Run the provided script:

```bash
chmod +x generate-ssh-key.sh
./generate-ssh-key.sh
```

Or manually:

```bash
ssh-keygen -t ed25519 -C "github-hairven" -f ~/.ssh/id_ed25519_hairven -N ""
cat ~/.ssh/id_ed25519_hairven.pub
```

## Step 2: Add SSH Key to GitHub

1. Copy the public key that was displayed (starts with `ssh-ed25519`)
2. Go to https://github.com/settings/keys
3. Click "New SSH key"
4. Title: `Hairven Repo`
5. Key type: `Authentication Key`
6. Paste the public key
7. Click "Add SSH key"

## Step 3: Configure SSH (if using manual method)

Add to `~/.ssh/config`:

```
Host github.com-hairven
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_hairven
    IdentitiesOnly yes
```

## Step 4: Initialize Git and Push

Run the initialization script:

```bash
chmod +x init-git.sh
./init-git.sh
```

Or manually:

```bash
git init
git add .
git commit -m "Initial commit: Hairven by Elyn salon website"
git branch -M main
git remote add origin git@github.com:shamarrz/hairven.git
git push -u origin main
```

## Troubleshooting

### SSH Connection Test

Test the connection:

```bash
ssh -T git@github.com-hairven
```

You should see: "Hi shamarrz! You've successfully authenticated..."

### Permission Denied

If you get permission denied:

1. Ensure the SSH key was added to GitHub
2. Check file permissions: `chmod 600 ~/.ssh/id_ed25519_hairven`
3. Check SSH config: `chmod 600 ~/.ssh/config`

### Repository Not Found

If you get "repository not found":

1. Ensure the repository exists at https://github.com/shamarrz/hairven
2. Check that you have push access
3. Verify the remote URL: `git remote -v`

