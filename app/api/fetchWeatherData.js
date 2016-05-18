export default {
    getWSdata(url) {

        return new Promise(
            function (resolve, reject) {

                var req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (req.status >= 200 && req.status < 400) {
                        if(this.readyState == 4) 
                            resolve(this.response);
                        
                    } else if (req.status === 0) {
                        // do nothing as this was "just a timeout"
                    } else {
                        reject(new Error(this.statusText));
                    }
                }

                req.onerror = function () {
                    reject(new Error('XHR Error: ' + this.statusText));
                };
                req.open('GET', url, true);
                req.send();

            });

    }

}