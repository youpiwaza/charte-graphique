# How to use

This little project consist of a simple responsive site, oriented to create a graphic chart quickly.

Live example online : [da démo](http://stockage.masamune.fr/divers/charte-graphique-example/).

Most redundant operations have been automated.

Note that everything hasn't been automated, this way the project is flexible enough.

Fell free to add your html/css or remove those from the boilerplate.

## Templating

Use classic HTML in index.html.

To add a page, use this code :

```html
<section id="unIdUnique">
    <div class="content">
        <h2>Mon titre</h2>
    </div>
</section>
```

Summary, and "next page" buttons will be added automatically.

Label in summary will be extracted from the `<h2>` tag text content.

`<section>` id attribute must be unique, else **links will break**.

If you want to add columns, use a `colonnes` classe, and add as many `<div>`s as you want.

```html
<section id="unIdUnique">
    <div class="content">
        <h2>Mon titre</h2>
        <div class="colonnes">
            <div>Left content</div>
            <div>Right content</div>
        </div>
    </div>
</section>
```

On mobile devices, contents will stack.

## Colors

In index.html, simply add more divs in the .colors `div`.

```html
<div class="colors">
    <div class="color" data-color="151132" data-declinaison="yes">Bleu nuit</div>
    <div class="color" data-color="0062c4">Bleu électrique</div>
</div>
```

Use the attribute `data-color` to set the color ; [multiple formats](https://github.com/bgrins/TinyColor#accepted-string-input) are accepted.

If you want declinaisons to your colors (brighter and darker), set the `data-declinaison` attribute to yes.

That's it. Yeph.

Note that multiples CSS classes will be *generated automatically* to add colors to the text or background :

```css
<style>
    .bg-color1 {
      background-color: #151132;
    }
    .border-color1 {
        border: 2px solid #151132;
    }
    .color1 {
        color: #151132;
    }
    .bg-color1-brighter {
      background-color: #2e2a4b;
    }
    .color1-brighter {
      color: #2e2a4b;
    }
    .bg-color1-darker {
      background-color: #05040c;
    }
    .color1-darker {
      color: #05040c;
    }
    /* And so on.. for each color */
```

## Fonts

Fonts must be downloaded manually, this ensure that it works even offline.

Steps to set custom fonts

Change font :

1. (Go to google webfont and choose a font)
2. Go to [heroku](https://google-webfonts-helper.herokuapp.com/fonts/) and re-select the same font
3. Go to the bottom of the page and download the font files
4. Copy them in the /assets/fonts/ folder
5. Copy css provided on heroku's website in the `style.css` file
6. Adapt urls (add /assets/, etc.) to match the place where you put the font files
7. Change font names in style.css (this file) ~line 70 according to your needs
8. Don't forget to adapt /assets/js/fonts.js, for improved loading
9. In the "font" section, update links towards google web fonts

Could have been atomated, but I' drather not with the download of external files.

Docs :

- [Project github](https://github.com/youpiwaza/charte-graphique)
- [Helper](https://google-webfonts-helper.herokuapp.com/fonts/roboto-condensed)
- [JS optimzed loading](https://github.com/bramstein/fontfaceobserver)
