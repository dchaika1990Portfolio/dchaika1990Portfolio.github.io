

class Http{

    constructor(){
        this.config = null;
    }

    send(config){

        let xhr = new XMLHttpRequest();
        xhr.timeout = 10000;

        xhr.open(config.method, config.url); //метод запроса, url, async, user, password

        xhr.setRequestHeader('Content-Type','application/json');

        xhr.send(config.data);
        console.log(config);

        xhr.addEventListener('load', () =>{
            if (xhr.status === 200){
                config.success(xhr.responseText)
            } else if(xhr.status === 404){
                config.error(xhr.responseText);
            }
        });

        xhr.addEventListener('timeout', () =>{
            console.log('error connect');
        })

    }

}

let http = new Http();