

const Car = function (type) {
    this.speed = 100;
    this.type = type;
    this.x = 0;
    this.y = 0;
}

Car.prototype.move = function (x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
}

const car = new Car('sonata');
car.move(2, 3);

console.log(Car.prototype.move);
