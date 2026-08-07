import { redirect } from "next/navigation";

// Portfolio is hidden — see src/app/work/page.js. Individual project pages
// redirect home too. The project data (@/data/projects) and ProjectDetail
// section are preserved; restore by reverting this file.
export default function ProjectDetailPage() {
  redirect("/");
}
