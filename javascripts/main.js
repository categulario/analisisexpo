console.log('starting');

PDFJS.getDocument('presentacion.pdf').then(function (pdf) {
    console.log('we have the document');
    window.PDF = pdf;

    $('#num-pages').text(pdf.numPages);

    pdf.getPage(1).then(renderPage);
});

$(function () {
    console.log('document loaded');

    $('#back').click(function () {
        console.log('go back');

        var currentPage = parseInt($('#page').text());

        if (currentPage != 1) {
            currentPage--;
            PDF.getPage(currentPage).then(renderPage);
            $('#page').text(currentPage);
        }

        return false;
    });
    $('#forw').click(function () {
        console.log('go forward');

        var currentPage = parseInt($('#page').text());

        if (currentPage < PDF.numPages) {
            currentPage++;
            PDF.getPage(currentPage).then(renderPage);
            $('#page').text(currentPage);
        }

        return false;
    });
});

function renderPage(page) {
    console.log('we have a page');

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
}
