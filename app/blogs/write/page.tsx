import { redirect } from "next/navigation";

export default function LegacyBlogWriterPage() {
  redirect("/blog/write");
}
