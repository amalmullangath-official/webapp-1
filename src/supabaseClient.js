import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://pizgayoadzlgtozwqiki.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpemdheW9hZHpsZ3RvendxaWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNDA4MzQsImV4cCI6MjA0MTgxNjgzNH0.mRTDjaOKdDTNFJye2VBbWQrJoIpCc0RJIZ6uUy0vhuE",
);
