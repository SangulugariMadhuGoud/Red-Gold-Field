
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, phone, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'phone', NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;
