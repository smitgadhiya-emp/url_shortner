-- Create URL shortener table
CREATE TABLE IF NOT EXISTS urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_url TEXT NOT NULL,
  small_url TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index on small_url for faster lookups
CREATE INDEX IF NOT EXISTS idx_urls_small_url ON urls(small_url);

-- Create index on created_at for sorting/filtering
CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at);

