var Component = function () {

    var publicBecauseInReturn;

    function init() {
        console.log('Hello from component.');
    }

    init();
    return {
        //publicVar: publicBecauseInReturn
    }
}();
