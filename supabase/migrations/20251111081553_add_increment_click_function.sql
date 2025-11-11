create or replace function increment_click_count(small_url text)
returns void as $$
begin 
    update urls set click_count = click_count + 1 
    where small_url = small_url;
    end;
$$ language plpgsql;