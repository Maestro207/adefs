'use client'

import Sample from "./Sample";
import { model } from "./models"
import { supabase } from "./client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { SessionProvider } from "./providers";

export default function Home() {


  return(
    <>Maintenance</>
  );
}
