"use server" 

import { createClient } from "@/app/utils/supabse/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.log(error.message)
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  redirect("/Dashboard");
}
export async function signInWithOAuth(){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: 'http://localhost:3000/Auth/Callback', // or wherever you want to redirect after login
    },
});
  if (error) {
    console.log(error);
    toast.error(`Error: ${error.message}`);
    // Handle error, e.g., show a toast notification
    redirect("/Auth/Error");
    return;
  }if (data.url) {
  redirect(data.url) // use the redirect API for your server framework
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
