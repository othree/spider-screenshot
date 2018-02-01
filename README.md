# Spider Screenshot

Web spider and take screenshot for input URL. Only spider the same domain, under the same pathname.

Based on Google's [puppeteer](https://github.com/GoogleChrome/puppeteer).

## Help

```
  Usage: spider-screenshot [options]


  Options:

    -V, --version                       output the version number
    -u, --url <url>                     Start URL
    -o, --output <path>                 Output path (default: ./screenshots)
    -w, --width <width>                 Window width (default: 960)
    -h, --height <height>               Window height (default: 1200)
    -s, --device-scale-factor <factor>  Like device pixel ratio in CSS (default: 1.5)
    -u, --user-agent <agent>            User agent string
    -s, --seperator <sep>               Used to replace / in path when save screeshota (default: -)
    -b, --black-list <file>             Black list file, pathname in lines
    -v, --verbose                       Print status
    -d, --debug                         Debug mode
    -h, --help                          output usage information
```
