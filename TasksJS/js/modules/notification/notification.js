
class Notification{

    constructor(){
        this.notification_block = document.querySelector('.alert-info');
        this.hide = this.hide.bind(this);
    }

    event(){
        this.notification_block.addEventListener('click', this.hide)
    }

    show(text){
        this.notification_block.innerHTML = text;
        this.notification_block.classList.add('show');

        setTimeout( this.hide, 5000 );
    }

    hide(){
        this.notification_block.classList.remove('show');
    }

}

let notification = new Notification();
notification.event();