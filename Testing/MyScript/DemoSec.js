document.addEventListener("contextmenu", function (e) {
                e.preventDefault();
            }, false);

window.onload = function () {
        noBack();
    }

    function noBack() {
        window.history.forward();
    }

    document.onkeydown = function (e) {        
        if (e.keyCode >= 112 && e.keyCode <= 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    }

    window.onpageshow = function (e) {
        if (e.persisted) noBack();
    }
    

    function PopUpOpen(popUrl, w, h) {

        var width = w;

        var height = h;




        var left = (screen.width - width) / 2;

        var top = (screen.height - height) / 2;


        if (w == 0) {
            width = screen.width;
            height = screen.height;
            left = 0;
            top = 0;
        }
        else {
            width = w;
            height = h;
            left = (screen.width - width) / 2;
            top = (screen.height - height) / 2;
        }

        var params = 'width=' + width + ', height=' + height;

        params += ', top=' + top + ', left=' + left;

        params += ', directories=no';

        params += ', fullscreen=no';

        params += ', addressbar = no';

        params += ', location=no';

        params += ', menubar=no';

        params += ', resizable=no';

        params += ', scrollbars=yes';

        params += ', titlebar = no';

        params += ', status=no';

        params += ', toolbar=no';

        var openWindow = window.open(popUrl, PopgenerateUUID(), params);

        openWindow.focus();
    }


    function PopgenerateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }