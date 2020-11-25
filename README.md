# auto-thumbnail

![auto-thumbnail demo](https://github.com/joe-gibbs/jgibbs.dev/blob/main/assets/auto-thumbnail-demo.gif?raw=true)

Auto-thumbnail generates thumbnails from your pages using headless Chrome and Smartcrop to crop towards the most interesting parts of the page.

## Usage

`node thumb.js <path> [width] [height]`

Where \<path> is either the path to a local file or a URL, [width] is the width of the output image and [height] is the height of the output image. The width and height default to 1200 and 630 respectively.