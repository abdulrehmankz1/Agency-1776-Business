import { redirect } from "next/navigation";

// Portfolio is temporarily HIDDEN (not deleted). All portfolio code + data
// stay in the repo — WorkGrid, ProjectDetail, and @/data/projects are
// untouched — this route just redirects home so /work isn't reachable, and
// every link to it has been removed (nav, footer, Hero, home page, About).
//
// To RESTORE: revert this file (and src/app/work/[slug]/page.js) to render
// <WorkGrid /> / <ProjectDetail /> again, and re-add the Portfolio links in
// Nav.js, Footer.js, Hero.js, src/app/page.js, and the About sections.
export default function WorkPage() {
  redirect("/");
}
