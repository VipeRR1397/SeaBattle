/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
let getElement = (id) => {
    return document.getElementById(id);
}

const shots = getElement('shots');
const misses = getElement('misses');
const kills = getElement('kills');
const enemyField = getElement('enemy_field')

///////////////////////////////// Statistics \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const play = {
    shots: 0,
    misses: 0,
    kills: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        shots.textContent = this.shots;
        misses.textContent = this.misses;
        kills.textContent = this.kills;
    }
}

///////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////clicks\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const show = {
    shots() {

    },
    misses(elem) {
        this.changeClass(elem, 'misses')
    },
    kills() {

    },
    changeClass(elem, value) {
        elem.className = value;
    }
}

const fire = (event) => {
    
    const target = event.target; 
    if (target.classList.contains('misses')) {
        return;
    };
    show.misses(target);
    play.updateData = 'shots';

    console.log(target, typeof(target));
    }; 

const init = () => {
    enemyField.addEventListener('click', fire);
};

init();


