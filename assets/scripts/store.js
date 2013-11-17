var Store = function() {

    function save(canvas, name) {
        var payload = JSON.stringify(canvas.toJSON());
        console.log(payload);
        $.ajax({
            url:'/setGraph',
            dataType: "json",
            type: 'POST', 
            data: {key: name, value: payload }})
        .done(function(data){
            console.log('saved graph on server', data);
            return data;
        });
    }

    function load(canvas, key) {
        var result;
        $.ajax({
            url:'/getGraph/'+ key,
            type: 'GET',
            async: false,
            crossDomain: true
        }).done(function(data){
          console.log("My data", data);
            if(!data){
              result = undefined;
            } else {
              if(!data.value) { result =  undefined; }
              else { result = JSON.parse(data.value); }
            }
        });

        return result;
    }

    function getNames() {
        var result;
        $.ajax({
            url:'/getGraphNames',
            type: 'GET',
            async: false,
            crossDomain: true
        }).done(function(data){
              result = data;
        });
        return result;
    }


    function init() { console.log('Store initialized.'); }
    init();
    return {
        save: save,
        load: load,
        getNames: getNames
    }
}();
