// src/components/auth/MentorGate.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GateState = "checking" | "approved" | "pending" | "none" | "error";

export default function MentorGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GateState>("checking");
  const [message, setMessage] = useState<string>("");

  async function checkStatus() {
    try {
      setState("checking");

      // 1) Auth user
      const { data: auth } = await supabase.auth.getUser();
      const user = auth?.user;
      if (!user?.id) {
        setMessage("Please sign in to access the mentor dashboard.");
        setState("none");
        return;
      }

      // 2) Profile (for verified flag)
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("id, verified")
        .eq("id", user.id)
        .maybeSingle();
      if (profErr) throw profErr;

      // 3) Mentor row (for application_status)
      const { data: mentor, error: mentorErr } = await supabase
        .from("mentors")
        .select("application_status")
        .eq("user_id", user.id)
        .maybeSingle();
      if (mentorErr) throw mentorErr;

      if (!mentor) {
        // No application yet
        setMessage("You haven’t started a mentor application yet.");
        setState("none");
        return;
      }

      const approved = mentor.application_status === "approved" && profile?.verified === true;
      if (approved) {
        setState("approved");
      } else {
        setMessage("Your mentor application is pending admin approval.");
        setState("pending");
      }
    } catch (e: any) {
      setMessage(e?.message ?? "Something went wrong while checking your status.");
      setState("error");
    }
  }

  useEffect(() => {
    checkStatus();
  }, []);

  if (state === "approved") return <>{children}</>;

  // Friendly holding state
  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Mentor Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {state === "checking" && <p className="text-muted-foreground">Checking your mentor status…</p>}
          {state !== "checking" && <p className="text-muted-foreground">{message}</p>}

          <div className="flex gap-2 pt-2">
            {state === "none" && (
              <Button asChild>
                <a href="/become-mentor">Apply to become a mentor</a>
              </Button>
            )}
            <Button variant="outline" onClick={checkStatus}>Refresh status</Button>
            <Button variant="ghost" asChild>
              <a href="/">Go home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
