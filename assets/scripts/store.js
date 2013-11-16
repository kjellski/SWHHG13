var Store = function() {

    function save(canvas) {
        var payload = canvas.toJSON();
        console.log(payload);
        $.ajax({
            url:'/setGraph',
            dataType: "json",
            type: 'POST', 
            data: payload })
        .done(function(data){
            console.log('saved graph on server', data);
            return data;
        });
    }

    function load(canvas) {
        var result;
        $.ajax({
            url:'/getGraph',
            type: 'GET',
            async: false,
            crossDomain: true
        }).done(function(data){
            result = data.graph;
            console.log('result: ', result);
            canvas.loadFromJSON(result, canvas.renderAll.bind(canvas), function(o, object) {
                fabric.log(o, object);
            });
        });
        return result;
    }

    function init() { console.log('Store initialized.'); }
    init();
    return {
        save: save,
        load: load
    }
}();