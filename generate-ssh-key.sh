#!/bin/bash
# Generate SSH key for GitHub

echo "Generating SSH key for GitHub..."
ssh-keygen -t ed25519 -C "github-hairven" -f ~/.ssh/id_ed25519_hairven -N ""

echo ""
echo "=========================================="
echo "SSH Public Key (copy this to GitHub):"
echo "=========================================="
cat ~/.ssh/id_ed25519_hairven.pub
echo ""
echo "=========================================="
echo ""
echo "Add this key to GitHub:"
echo "1. Go to https://github.com/settings/keys"
echo "2. Click 'New SSH key'"
echo "3. Paste the key above"
echo "4. Title it 'Hairven Repo'"
echo ""

# Configure SSH for GitHub
mkdir -p ~/.ssh
chmod 700 ~/.ssh

if ! grep -q "github.com-hairven" ~/.ssh/config 2>/dev/null; then
    cat >> ~/.ssh/config << 'EOF'

Host github.com-hairven
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_hairven
    IdentitiesOnly yes
EOF
    chmod 600 ~/.ssh/config
    echo "SSH config updated!"
fi

