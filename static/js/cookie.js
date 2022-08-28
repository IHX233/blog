var Cookie = {
    set: function(json, day) {
        var date = new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000);
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                document.cookie = key + "=" + json[key] + "; expires=" + date.touTcstring();
            }
        }
    },
    get: function(key) {
        var result = document.cookie.match(new RegExp('\\b' + key + "=([^;]+)(;|$)"));
        return result ? result[1] : "";
    },
    remove: function(key) {
        var json = {};
        json[key] = 0;
        this.set(json, -1);
    }
}