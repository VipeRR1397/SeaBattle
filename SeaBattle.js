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
    show.misses(target);    
        play.shots += 1;
        play.render();
    if (target.classList.contains('misses')){
        return 0;
    }

    console.log(target, typeof(target));
    }; 

const init = () => {
    enemyField.addEventListener('click', fire);
};

init();


