import { LogoSVG, LogoSVGSymbol } from "../components/LogoSVGSymbol.jsx";
import { Link } from "../components/Link.jsx";
export const GenericPageBody = ({ children }) => (
  <>
    <LogoSVGSymbol />
    {/*
                Wrap the header and the header AND main content in a growing
                container so that A) the sticky header never scrolls off the
                page (See https://stackoverflow.com/a/47352847) and B) the footer
                always remains squarely on the bottom of the page whether the
                content is shorter than the screen size or way longer. Depends on
                html and body having `height: 100%;` and body being flex-column.
              */}
    <div class="flex-grow">
      <header class="sticky">
        <div class=" flex flex-row gap-4 items-center font-flashy">
          <LogoSVG />
          <Link slug="home">Reed's Website</Link>
        </div>
      </header>
      <main class="cpnt-blog-article">{children}</main>
    </div>
    <footer>
      <Link slug="home">Home</Link>
    </footer>
  </>
);
