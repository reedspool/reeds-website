export const slugsToHrefs = {
  home: "/",
  "improve-this-website": "project-improve-this-website.html",
  "projects-on-this-site": "project-track-my-projects.html",
  "about-project-logs": "topic-project-logs.html",
  "project-index": "topic-project-index.html",
  "project-add-popout": "project-add-popout.html",
  "project-write-script-and-style-tags":
    "project-write-script-and-style-tags.html",
  "project-precision-timer": "project-precision-timer.html",
  "project-add-rss": "project-add-rss.html",
  "rss-feed": "rss.xml",
  feed: "feed.html",
  "project-fizzbuzz-in-css": "project-fizzbuzz-in-css.html",
  "project-symbolic-differentiator": "project-symbolic-differentiator.html",
};
export const Link = ({ slug, children }) => {
  const href = slugsToHrefs[slug];
  if (!href) throw new Error(`No href found for slug "${slug}"`);
  return <a href={href}>{children}</a>;
};
