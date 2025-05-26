class StatusbarBoss extends DrawableObject {
IMAGES = [
    './img/7_statusbars/2_statusbar_endboss/blue.png',
    './img/7_statusbars/2_statusbar_endboss/green.png',
    './img/7_statusbars/2_statusbar_endboss/orange.png'
]

health = 110;

constructor(){
    super()    
    this.loadImages(this.IMAGES)
    this.setAmount()
    this.x = 280
    this.y = 20
    this.width = 200;
    this.height = 60;
}


setAmount() {
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

 resolveImageIndex() {
    if (this.health >= 70) {
        return 0; 
    } else if (this.health >= 30) {
        return 1; 
    } else {
        return 2; 
    }
}

setHealth(health) {
    this.health = health;
    this.setAmount(); 
}






}