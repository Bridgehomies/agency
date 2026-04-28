import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import SubmissionsPanel from "@/components/SubmissionsPanel";

export const metadata: Metadata = {
  title: "Guest Submissions | Admin",
  robots: { index: false, follow: false },
};

export default function SubmissionsPage() {
  return (
    <>
      <Navbar />
      <SubmissionsPanel />
    </>
  );
}