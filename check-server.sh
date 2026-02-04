#!/bin/bash

echo "=== Server Diagnostics ==="
echo ""

echo "1. Checking Node processes..."
ps aux | grep -E "(node|npm|vite)" | grep -v grep || echo "No Node processes found"
echo ""

echo "2. Checking listening ports..."
sudo ss -tlnp | grep -E "(3681|4173|3000|80)" || echo "No relevant ports listening"
echo ""

echo "3. Checking Docker containers..."
docker ps | grep portfolio || echo "No portfolio container running"
echo ""

echo "4. Checking firewall (ufw)..."
sudo ufw status | grep -E "(3681|4173|80)" || echo "No relevant firewall rules"
echo ""

echo "5. Testing localhost connectivity..."
curl -s -o /dev/null -w "Port 3681: %{http_code}\n" http://localhost:3681 || echo "Port 3681: Connection refused"
curl -s -o /dev/null -w "Port 4173: %{http_code}\n" http://localhost:4173 || echo "Port 4173: Connection refused"
curl -s -o /dev/null -w "Port 80: %{http_code}\n" http://localhost:80 || echo "Port 80: Connection refused"
echo ""

echo "=== IP Addresses ==="
ip addr show | grep "inet " | awk '{print $2}' | cut -d/ -f1
echo ""

echo "=== Recommendations ==="
if ! pgrep -f "vite" > /dev/null; then
  echo "❌ Vite dev server is NOT running"
  echo "   Start with: npm run dev"
else
  echo "✅ Vite dev server is running"
fi
