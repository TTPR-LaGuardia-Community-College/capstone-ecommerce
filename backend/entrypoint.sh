# Wait for db to be ready
until nc -z db 5432; do
  echo "Waiting for postgres..."
  sleep 2
done

# Run migrations
npm run migrate

# Start dev server
npm run dev