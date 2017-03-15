$.get('/blocks', appendToList);

function appendToList(blocks) {
    let list = [];
    for (let block of blocks) {
        let content = `<a href='/blocks/${block}'>${block}</a>`;
        content = content.concat(`&nbsp;<a href='#' data-block='${block}' data-toggle='tooltip' data-placement='right' title='Delete block'><i class='glyphicon glyphicon-remove'></i></a>`)
        list.push($('<li>', { html: content }));
    }
    $('#block-list').append(list);

    //to enable bootstrap's tooltips    
    $('[data-toggle="tooltip"]').tooltip();
}

$('form').submit(function (e) {
    e.preventDefault();

    let form = $(this);
    let blockData = form.serialize();

    $.ajax({
        type: 'POST',
        url: '/blocks',
        data: blockData
    }).done(function (blockName) {
        appendToList([ blockName ]);
        form.trigger('reset');
        form.find('input')[ 0 ].focus();
    });
});

$('#block-list').on('click', 'a[data-block]', function (event) {
    if (!confirm('Are you sure?')) {
        return false;
    }
    let target = $(this);
    $.ajax({
        type: 'DELETE',
        url: '/blocks/' + target.data('block')
    }).done(function () {
        target.parents('li').remove(); 
    });
});
