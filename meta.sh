#!/bin/bash

URL="http://127.0.0.1:8000"

case $1 in
  add)
    curl -s -X POST $URL/api/add-target \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"$2\", \"url\": \"$3\", \"comment\": \"$4\", \"priority\": \"$5\"}" | jq
    ;;
  list)
    curl -s $URL/api/targets | jq '.data // .targets // .'
    ;;
  delete)
    curl -s -X DELETE $URL/api/targets/$2 | jq
    ;;
  help|--help|-h)
    echo "ShadowFox Meta CLI"
    echo "-------------------"
    echo "meta.sh add \"Naziv\" \"http://url\" \"komentar\" \"priority\""
    echo "meta.sh list"
    elif [ "$1" == "scan" ]; then
  echo "[+] Pokrećem skeniranje..."
  curl -s -X POST http://127.0.0.1:8000/api/run-scan \
    -H "Content-Type: application/json" \
    -d '{"targets": []}'
  echo "[+] Skeniranje završeno!"

    echo "meta.sh delete ID"
    ;;
  *)
    echo "Nepoznata komanda. Pokreni: ./meta.sh help"
    ;;
esac
