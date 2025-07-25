# Flags in HTML & CSS

Inspired by the 2025 Portland Pride Parade and the upcoming [HTML Day](https://html.energy/html-day/2025/index.html), I recreated popular flags in HTML & CSS. 

Details about the design of the flags fascinated me as I researched them. Since those details informed how I made my flags, I wanted to document them. My research began at the top search results, [a great blog post by a company which sells physical flags][flagsforgood] as well as the Wikipedia page on "Pride Flags"[wiki-pride-flag].

## Transgender Pride Flag

The first flag I made. At first, I named my colors "boy", "girl", and "nonbinary" after [this quote from the flag's designer, Monica Helms][trans-flag-monica-helms]:

> The stripes at the top and bottom are light blue, the traditional color for baby boys. The stripes next to them are pink, the traditional color for baby girls. The stripe in the middle is white, for those who are intersex, transitioning or consider themselves having a neutral or undefined gender.

I knew I jumped too fast to the term "nonbinary" when I read that last, complex description. So I did a tiny bit more research. I found [This Report by The Trevor Project, "Diversity of Nonbinary Youth"][diversity-nonbinary-youth], where they found that many people identify as "nonbinary" but not "transgender".

The complexity of the situation led me back to names descriptive of the colors themselves, "blue", "pink", and "white." While this felt less inspired and dramatic, it also felt more inclusive to leave the interpretation up to the reader. 

## Non-binary Flag

I chose the more specific color name "lavender" over the more generic "purple" after I learned about that word's import to LGBTQ+ history from the flag's Wikipedia page][wiki-nonbinary-flag].

Also I saw two spellings, "non-binary" and "nonbinary," both even on that wikipedia page. I chose the one without a `-` to not confuse the structural dashes in my variable names.

## Development Notes

I used some over-specified names for some things because I imagined it would be useful in some possible future where I or someone else copied and pasted many of these flags onto one page. This was not at all the case to start since I gave myself an entire page for each flag, a blank slate to play. When I decided to call colors by their simple names, e.g. "blue", I decided to over-specify the CSS names of those variables, so I wouldn't get confused about the "trans flag blue", a light blue, and the "rainbow pride flag blue"

[flagsforgood]: https://flagsforgood.com/blogs/news/comprehensive-guide-to-pride-flags "Flags For Good's blog post, Beyond the Rainbow: Your Comprehensive Guide to Pride Flags and Their Meanings"
[diversity-nonbinary-youth]: https://www.thetrevorproject.org/research-briefs/diversity-of-nonbinary-youth/ "The Trevor Project, Diversity of Nonbinary Youth"
[wiki-pride-flag]: https://en.wikipedia.org/wiki/Pride_flag "Wikipedia, Pride flag"
[trans-flag-monica-helms]: https://web.archive.org/web/20120301065716/http://www.monicahelms.com/blog/category/tg-pride-flag "Monica Helms's blog, These Colors Don't Run"

[wiki-nonbinary-flag]: https://en.wikipedia.org/wiki/Non-binary_flag "Wikipedia, Non-binary flag"
