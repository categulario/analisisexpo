console.log('starting');

PDFJS.getDocument('presentacion.pdf').then(function (pdf) {
    console.log('we have the document');

    pdf.getPage(1).then(function (page) {
        console.log('we have the first page');

        var scale     = 1.5;
        var viewport  = page.getViewport(scale);

        var canvas    = document.getElementById('presentacion');
        var context   = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width  = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
    });
});
