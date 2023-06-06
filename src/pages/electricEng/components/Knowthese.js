import Knowthis from "./Knowthis";


class Knowthese {
    constructor(canvas, noOfQuestions) {
        this.number = noOfQuestions;
        this.knowthis = [];
        for (var i = 0; i < this.number; i++) {
            this.knowthis[i] = new Knowthis(i * (-canvas.height), canvas);
        }
    }
    restart() {
        for (var i = 0; i < this.number; i++) {
            this.knowthis[i].restart();
        }
    }
    setRandomOptionPosition() {
        for (var i = 0; i < this.number; i++) {
            this.knowthis[i].setRandomOptionPosition();
        }
    }
    draw(canvas, ctx) {
        for (var i = 0; i < this.number; i++) {
            this.knowthis[i].draw(canvas, ctx, 'blue', 'white');
        }
    }
    update(player, Game) {
        for (var i = 0; i < this.number; i++) {
            this.knowthis[i].update(player, Game);
        }
    }
}






export default Knowthese
