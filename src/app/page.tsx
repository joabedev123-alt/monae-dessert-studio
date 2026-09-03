import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect directly to the Portuguese version as requested
  redirect("/pt");
}
