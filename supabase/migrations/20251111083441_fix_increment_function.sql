create or replace function increment_click_count(small_url text)
returns void as $$
begin
  update urls
  set click_count = coalesce(click_count, 0) + 1
  where urls.small_url = increment_click_count.small_url;
end;
$$ language plpgsql;
