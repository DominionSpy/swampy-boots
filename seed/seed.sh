#!/bin/sh
sleep 3
for file in *.json; do
  collection="panels"
  mongoimport --uri "$MONGO_URI" \
    --collection "$collection" \
    --file "$file"
done
echo "Seeding complete"
