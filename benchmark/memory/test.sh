#!/bin/sh

# Text size in bytes
export TEXT_SIZE=48000000

printf "Current testing text size: %s MB\n\n" "$((TEXT_SIZE / 1024 / 1024))"

echo "normalizeSpaceX: $(node test.js normalizeSpaceX) MB"
echo "normalizeSpaces: $(node test.js normalizeSpaces) MB"
echo "normalizeSpaces1: $(node test.js normalizeSpaces1) MB"
echo "normalizeSpaces2: $(node test.js normalizeSpaces2) MB"
echo "normalizeSpaces3: $(node test.js normalizeSpaces3) MB"
echo "normalizeSpaces4: $(node test.js normalizeSpaces4) MB"
echo "normalizeSpaces5: $(node test.js normalizeSpaces5) MB"
echo "normalizeSpaces6: $(node test.js normalizeSpaces6) MB"
echo "normalizeSpaces7: $(node test.js normalizeSpaces7) MB"
echo "normalizeSpaces8: $(node test.js normalizeSpaces8) MB"
echo "normalizeSpaces9: $(node test.js normalizeSpaces9) MB"
echo "normalizeSpaces10: $(node test.js normalizeSpaces10) MB"
echo "normalizeSpaces11: $(node test.js normalizeSpaces11) MB"
echo "normalizeSpaces12: $(node test.js normalizeSpaces12) MB"
echo "normalizeSpaces13: $(node test.js normalizeSpaces13) MB"
echo "normalizeSpaces14: $(node test.js normalizeSpaces14) MB"
