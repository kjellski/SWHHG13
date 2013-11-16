var Store = function () {

    function save(canvas) {
        $.ajax({
            url:'/setGraph',
            dataType: "json",
            type: 'POST', 
            data: { canvas.toJSON() } })
        .done(function(data){
            console.log('saved graph on server', data);
            return data;
        });
    }

    function load(canvas) {
        $.ajax({
            url:'/getGraph',
            type: 'GET',
            crossDomain: true
        }).done(function(data){
            console.log(data);
        });
    }

    function init() { console.log('Store initialized.'); }
    init();
    return {
        save: save
    }
}();