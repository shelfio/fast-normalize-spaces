#!/bin/sh

# Text size in bytes
export TEXT_SIZE=48000000

printf "Current testing text size: %s MB\n\n" "$((TEXT_SIZE / 1024 / 1024))"

printf "normalizeSpaceX: %s MB\n" "$(node test.js normalizeSpaceX)"
printf "normalizeSpaces: %s MB\n" "$(node test.js normalizeSpaces)"
printf "normalizeSpaces1: %s MB\n" "$(node test.js normalizeSpaces1)"
printf "normalizeSpaces2: %s MB\n" "$(node test.js normalizeSpaces2)"
printf "normalizeSpaces3: %s MB\n" "$(node test.js normalizeSpaces3)"
printf "normalizeSpaces4: %s MB\n" "$(node test.js normalizeSpaces4)"
printf "normalizeSpaces5: %s MB\n" "$(node test.js normalizeSpaces5)"
printf "normalizeSpaces6: %s MB\n" "$(node test.js normalizeSpaces6)"
printf "normalizeSpaces7: %s MB\n" "$(node test.js normalizeSpaces7)"
printf "normalizeSpaces8: %s MB\n" "$(node test.js normalizeSpaces8)"
printf "normalizeSpaces9: %s MB\n" "$(node test.js normalizeSpaces9)"
printf "normalizeSpaces10: %s MB\n" "$(node test.js normalizeSpaces10)"
printf "normalizeSpaces11: %s MB\n" "$(node test.js normalizeSpaces11)"
printf "normalizeSpaces12: %s MB\n" "$(node test.js normalizeSpaces12)"
printf "normalizeSpaces13: %s MB\n" "$(node test.js normalizeSpaces13)"
printf "normalizeSpaces14: %s MB\n" "$(node test.js normalizeSpaces14)"
