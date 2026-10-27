#!/usr/bin/env bash
set -euo pipefail

API="https://git.mutualzz.com/api/v1/repos/mutualzz/mutualzz"
AUTH="Authorization: token ${OFFICIAL_TOKEN}"
TAG="$1"; TITLE="$2"; NOTES="$3"; shift 3

ID=$(curl -s -H "$AUTH" "$API/releases/tags/$TAG" | jq -r '.id // empty')

if [[ -z "$ID" ]]; then
  ID=$(curl -sf -X POST "$API/releases" -H "$AUTH" -H "Content-Type: application/json" \
    -d "$(jq -n --arg t "$TAG" --arg n "$TITLE" --arg c "$GITHUB_SHA" --rawfile b "$NOTES" \
      '{tag_name: $t, name: $n, target_commitish: $c, body: $b}')" | jq -r .id)
  echo "Created release $TAG (id $ID)"
else
  echo "Release $TAG exists (id $ID), adding files"
fi

for f in "$@"; do
  [[ -f "$f" ]] || { echo "skip missing $f"; continue; }
  curl -sf -X POST "$API/releases/$ID/assets?name=$(basename "$f")" \
    -H "$AUTH" -F "attachment=@$f" >/dev/null \
    && echo "uploaded $(basename "$f")" \
    || echo "::warning::upload failed: $(basename "$f") (over 100MB?)"
done
