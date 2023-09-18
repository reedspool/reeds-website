import { Page } from "@nakedjsx/core/page";

export const CommonNakedJSXPage = async ({ outputFileName, Body }) => {
  Page.Create("en");
  Page.AppendHead(<title>Reed's Website</title>);
  Page.AppendHead(
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  );
  Page.AppendHead(
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  );
  Page.AppendHead(
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  );
  Page.AppendHead(
    <link
      href="https://fonts.googleapis.com/css2?family=Jost&family=Karla&display=swap"
      rel="stylesheet"
    />
  );
  Page.AppendHead(<link rel="stylesheet" href="./build.css" />);

  Page.AppendBody(<Body />);

  Page.Render(outputFileName);
};
