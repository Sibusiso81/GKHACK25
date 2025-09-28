"use server";

import { createClient } from "@/app/utils/supabse/server";
import { Post } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export async function createStudentProfile({
  email,
  name,
  location,
}: {
  email: string;
  name: string;
  location: string;
}) {
  const supabase = await createClient();

  // Check if the student already exists
  const { data: existing, error: fetchError } = await supabase
    .from("student")
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
  const { data,error } = await supabase.from("student").insert({
    email,
    name,
    location,
  }).select();
console.log('Insered Row :',data,error)
  if (error) {
    console.log(error.message);
    return { error: error.message };
  }
  return { success: true };
}
export async function createFarmerProfile({
  email,
  name,
  location,
}: {
  email: string;
  name: string;
  location: string;
}) {
  const supabase = await createClient();

  // Check if the farmer already exists
  const { data: existing, error: fetchError } = await supabase
    .from("farmer")
    .select("id")
    .eq("email", email)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.log(fetchError.message);
    return { error: fetchError.message };
  }

  if (existing) {
    console.log("Farmer already exists");
    return { error: "Farmer already exists." };
  }

  // Insert new farmer with correct column name
  const {data, error } = await supabase.from("farmer").insert({
    email,
    name,
    location,
  });
  console.log('Inserted row:',data,error)

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
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/Dashboard",
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
    console.log(error.message);
    return { error: error.message };
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
    redirectTo: "/Auth/ChangePassword",
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
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.log("Error fetching session", sessionError);
    return null;
  }

  const user = session.user;
  if (!user) {
    console.error("Error: user is not authenticated");
    return null;
  }

  // Try to find a student profile
  const { data: student, error: studentError } = await supabase
    .from("student")
    .select("*")
    .eq("email", user.email)
    .single();

  if (student && !studentError) {
    return {
      type: "student",
      email: user.email,
      profile: student,
    };
  }

  // Try to find a farmer profile
  const { data: farmer, error: farmerError } = await supabase
    .from("farmer")
    .select("*")
    .eq("email", user.email)
    .single();

  if (farmer && !farmerError) {
    return {
      type: "farmer",
      email: user.email,
      profile: farmer,
    };
  }

  // If neither profile found, just return the email
  return { type: "unknown", email: user.email, profile: null };
};

export const getUserID = async () => {
  const supabase = await createClient();
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !session) {
    console.log("Error Fetching session", sessionError);
    return null;
  }
  const user = session.session?.user.email;
  const { data: student, error: studentError } = await supabase
    .from("student")
    .select("id")
    .eq("email", user)
    .single();

  if (studentError || !student) {
    console.log("Error fetching student", studentError);
    return null;
  }

  return student.id;
};
export async function getStudentPorfile() {
  const supabase = await createClient();

  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  console.log("Session data:", session);
  if (sessionError || !session?.session) {
    console.log("Error Fetching session", sessionError);
    return null;
  }

  const userEmail = session.session.user.email;
  console.log("Fetching student with email:", userEmail);

  const { data: student, error: studentError } = await supabase
    .from("student")
    .select("*")
    .eq("email", userEmail)
    .single();

  if (studentError) {
    console.log("Error getting student", studentError);
    return null;
  }

  console.log("Student profile fetched:", student);
  return student;
}

export async function uploadPost({
 productId,
 name,
 stock,
 supplierId
}: Post) {
  const userId = await getUserID();
  console.log("UserId:", userId);
  const supabase = await createClient();
  const { error: insertError } = await supabase.from("inventory").insert([
    {
      product_id: productId,
      product_name: name,
      stock_quantity: stock,
      supplier_id:userId,
    },
  ]).select();
  console.log(`uploaded:`,productId,name,stock,userId,supplierId)
  if (insertError) {
    console.log(insertError.message);
  }
  return { success: true };
}

export const uploadImages = async (files: File[]): Promise<string[] | null> => {
  const supabase = await createClient();
  const uploadedUrls: string[] = [];
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("User not logged in:", authError);
    return [];
  }
  for (const file of files) {
    // Create a unique file name to avoid overwrites
    const filePath = `${user.id}/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("postImages") // your storage bucket name
      .upload(filePath, file);

    if (error) {
      console.error("Image Upload error:", error);
    } else {
      // Generate a public URL
      const { data: publicUrlData } = supabase.storage
        .from("postImages")
        .getPublicUrl(filePath);
      console.log("image public url:", publicUrlData.publicUrl);
      console.log(publicUrlData.publicUrl);

      uploadedUrls.push(publicUrlData.publicUrl);
    }
  }

  return uploadedUrls.length > 0 ? uploadedUrls : null;
};

export const uploadDocuments = async (
  files: File[]
): Promise<string[] | null> => {
  const supabase = await createClient();
  const uploadedDocs: string[] = [];
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("User not logged in:", authError);
    return [];
  }

  for (const file of files) {
    // Create a unique file name to avoid overwrites
    const filePath = `${user.id}/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("postDocuments") // must match the bucket name exactly
      .upload(`${user.id}/${Date.now()}_${file.name}`, file);

    if (error) {
      console.error("Document Upload error:", error);
    } else {
      // Generate a public URL
      const { data: publicUrlData } = supabase.storage
        .from("postDocuments")
        .getPublicUrl(filePath);
      console.log("document public url:", publicUrlData.publicUrl);
      uploadedDocs.push(publicUrlData.publicUrl);
    }
  }

  return uploadedDocs.length > 0 ? uploadedDocs : null;
};

export async function getUserPosts() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("User not logged in:", authError);
      return [];
    }

    // Get the student record matching the user's email
    const { data: studentData, error: studentError } = await supabase
      .from("student")
      .select("*")
      .eq("email", user.email)
      .single();

    if (studentError || !studentData) {
      console.log("No student found for user");
      return [];
    }

    // Fetch posts for that student with profile data
    const { data: posts, error: postError } = await supabase
      .from("post")
      .select("*")
      .eq("student_id", studentData.id)
      .order("created_at", { ascending: false });

    if (postError) {
      console.log("Error fetching posts:", postError);
      return [];
    }

    // Transform the data to include the profile

    const transformedPosts =
      posts?.map((post) => ({
        id: post.id,
        created_at: post.created_at,
        productId: post.productId,
        description: post.description,
        image_urls: post.image_urls || [],
        document_urls: post.document_urls || [],
        student_id: post.student_id,
        profile: {
          id: studentData.id,
          created_at: studentData.created_at,
          name: studentData.name,
          email: studentData.email,
          field_of_study: studentData.field_of_study,
          year_of_study: studentData.year_of_study,
          university: studentData.university,
        },
      })) || [];

    return transformedPosts;
  } catch (error) {
    console.error("Error in getUserPosts:", error);
    return [];
  }
}

export async function getAllPosts() {
  const supabase = await createClient();

  try {
    const { data: posts, error } = await supabase
      .from("inventory")
      .select("*") // just fetch everything in post table
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return [];
    }

    return posts ?? [];
  } catch (err) {
    console.error("Error in getAllPosts:", err);
    return [];
  }
}


export async function getReviews(){
  const supabase = await createClient();
  try{
    const {error} = await supabase 
    .from('reviews')
    .select('*')
    .order('created_at',{ascending:false})

    if(error){
    console.error("Error fetching reviews:", error);
      return [];
  }
  }catch (err) {
    console.error("Error in getAllPosts:", err);
    return [];
  }
  
}
interface NewReview {
  title: string;
  content: string;
  rating: number;
}
export async function createReview(newReview: NewReview, userId : string) {
  const supabase = await createClient(); // await if your createClient is async

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          user_id: userId,       // from supabase.auth.getUser() on the client
          title: newReview.title,
          content: newReview.content,
          rating: newReview.rating,
        },
      ])
      .select(); // optional: returns inserted row(s)

    if (error) {
      console.error("Error creating review:", error);
      return null;
    }

    return data[0]; // return the created review
  } catch (err) {
    console.error("Unexpected error creating review:", err);
    return null;
  }
}









/* export async function getAllUsers() {
  const supabase = createClient();

  const { data, error } = await (await supabase).auth.admin.listUsers({
    page: 1,
    perPage: 50,
  });

  async function testUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.admin.listUsers({
    page:1,
    perPage:50,
  })
  console.log("Error:", error);
  console.log("Data:", data?.users);
}

console.log(testUsers())
  // data.users is the arrayof users
  console.log(data?.users)
  const users = data.users.map((u) => ({
    id: u.id,
    email: u.email,
    full_name: u.user_metadata?.full_name || null,
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at,
    email_confirmed_at: u.email_confirmed_at,
  }));

  return users;
}
 */

