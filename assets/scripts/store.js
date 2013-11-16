var store = function () {

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
            Renderer.drawHeatmap(data.data, data.minValue, data.maxValue);
        });
    }

    function init() { console.log('Exporter initialized.'); }
    init();
    return {
        save: save
    }
}();