import { supabase } from "../lib/supabase";

export const logout = async () => {
  try {
    await supabase.auth.signOut();
    window.location.href = "/";
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};
