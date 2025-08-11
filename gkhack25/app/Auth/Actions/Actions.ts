"use server";

import { createClient } from "@/app/utils/supabse/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";
export async function createStudentProfile({
  email,
  name,
  field_of_study,
  year_of_study,
  university,
}: {
  email: string;
  name: string;
  field_of_study: string;
  year_of_study: string;
  university: string;
}) {
  const supabase = await createClient();

  // Check if the student already exists
  const { data: existing, error: fetchError } = await supabase
    .from("Students")
    .select("id")
    .eq("email", email)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116: No rows found
    console.log(fetchError.message);
    return { error: fetchError.message };
  }

  if (existing) {
    // User already exists, do not create again
    console.log("Student already exists");
    return { error: "Student already exists." };
  }

  // Insert new student
  const { error } = await supabase.from("Students").insert({
    email,
    name,
    field_of_study,
    year_of_study,
    university,
  });

  if (error) {
    console.log(error.message);
    return { error: error.message };
  }
  return { success: true };
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.log(error.message);
    return { error: error.message };
  }
 
  revalidatePath("/", "layout");
  redirect("/Dashboard");
}
export async function signInWithOAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/Auth/Callback", // or wherever you want to redirect after login
    },
  });
  if (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
    // Handle error, e.g., show a toast notification
    redirect("/Auth/Error");
    return;
  }
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signup(data: FormData) {
  console.log("signup called");
  const supabase = await createClient();
  const info = {
    email: data.get("email") as string,
    password: data.get("password") as string,
  };
  console.log(data);
  if (!info.email || !info.password) {
    console.log("Email and password are required");
  }
  const { error } = await supabase.auth.signUp(info);

  if (error) {
    console.log(error);
    redirect("/Auth/Error");
    return;
  }
  revalidatePath("/", "layout");
  redirect("/");
}
export default async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/Auth/Error");
    return;
  }
  revalidatePath("/", "layout");
  redirect("/");
}
export async function resetPassword(formData: FormData) {
  const data = formData.get("email") as string;
  if (!data) {
    console.log("Email is required");
    redirect("/Auth/Error");
    return;
  }
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(data, {
    redirectTo: "https://task-manager-zeta-green.vercel.app/ChangePassword",
  });
}

export async function changePassword(formData: FormData) {
  const data = formData.get("password") as string;
  if (!data) {
    console.log("Passowrd is required");
    redirect("/Auth/Error");
    return;
  }
  const supabase = await createClient();
  await supabase.auth.updateUser({ password: data });
  redirect("/Auth/Login");
}
export const getUser = async () => {
  const supabase = await createClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.log("Error fetching session", sessionError);
    return null;
  }

  const user = session.user;
  if (!user) {
    console.error("Error: user is not authenticated");
    return null;
  }

  // Return the user object or just the email
  return { email: user.email };
};