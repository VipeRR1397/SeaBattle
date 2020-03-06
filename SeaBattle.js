/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
    let getElement = (id) => {
        return document.getElementById(id);
    }

    const hits = getElement('hits');
    const shots = getElement('shots');
    const kills = getElement('kills');
    const enemyField = getElement('enemy_field');
    const again = getElement('again');
    const header = document.querySelector('.header');

///////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////ships\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

            const game = {
                ships: [],
                shipCount: 0,
                optionShip: {
                    count: [1, 2, 3, 4],
                    size: [4, 3, 2, 1],
                },
                collision: [],
                generateShip() {
                    for (let i = 0; i < this.optionShip.count.length; i++) {              
                        for (let j = 0; j < this.optionShip.count[i]; j++) {
                            const size = this.optionShip.size[i];
                            const ship = this.generateOptionsShip(size);
                            this.ships.push(ship);
                            this.shipCount++;
                        }
                    }
                },
                generateOptionsShip(shipSize) {
                    const ship = {
                        hits: [],
                        location: [],
                    };
                    const direction = Math.random() < 0.5;
                    let x, y;
                    if (direction) { // по горизонтали
                        x = Math.floor(Math.random() * 10);
                        y = Math.floor(Math.random() * (10 - shipSize));
                    } else { //по вертикали   
                        x = Math.floor(Math.random() * (10 - shipSize));
                        y = Math.floor(Math.random() * 10);
                    }

                    for(let i = 0; i < shipSize; i++) {
                        if (direction) { // по горизонтали
                            ship.location.push(x + '' + (y + i));
                        } else { // по вертикали
                            ship.location.push ((x + i) + '' + y);
                        }
                        ship.hits.push('');
                    }
                    if(this.checkCollision(ship.location)) {
                        return this.generateOptionsShip(shipSize);
                    }

                    this.addCollision(ship.location);

                    return ship;
                },
                checkCollision(location) {
                    for(const coord of location) {
                        if (this.collision.includes(coord)) {
                            return true;
                        }
                    }
                },
                addCollision(location) {
                    for (let i = 0; i < location.length; i++) {
                        const startCoordX = location[i][0] - 1;

                        for (let j = startCoordX; j < startCoordX + 3; j++){
                            const startCoordY = location[i][1] - 1;

                            for (let z = startCoordY; z < startCoordY + 3; z++) {
                                if (j >= 0 && j < 10 && z >= 0 && z < 10){
                                const coord = j + '' + z;
                                if (!this.collision.includes(coord)){
                                    this.collision.push(coord);
                            }     
                        }
                    }
                }
            }
        }
    };

    ///////////////////////////////// Statistic \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    const play = {
        hits: 0,
        shots: 0,
        kills: 0,
        set updateData(data) {
            this[data] += 1;
            this.render();
        },
        render() {
            hits.textContent = this.hits;
            shots.textContent = this.shots;
            kills.textContent = this.kills;
        }
    }

///////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////clicks\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        const show = {
            hits(elem) {
                this.changeClass(elem, 'hits')
            },
            shots(elem) {
                this.changeClass(elem, 'shots')
            },
            kills(elem) {
                this.changeClass(elem, 'kills')
            },
            changeClass(elem, value) {
                elem.className = value;
            }
        }

        const fire = (event) => {
            
            const target = event.target; 
            if (target.classList.length !== 0 || target.tagName !== 'TD' || game.shipCount <= 0) {
                return;
            };
            show.shots(target);
            play.updateData = 'shots';

            for( let i = 0; i < game.ships.length; i++) {
                const ship = game.ships[i];
                const index = ship.location.indexOf(target.id); 
                if ( index >= 0) {
                    show.hits(target);
                    play.updateData = 'hits';
                    ship.hits[index] = 'x';
                    const dead = ship.hits.indexOf('');
                    if (dead < 0) {
                        play.updateData = 'kills';
                        for(const id of ship.location) {
                            show.kills(document.getElementById(id))
                        }

                    game.shipCount -= 1;
                    
                    if(game.shipCount < 1) {
                        header.textContent = 'You won!';
                        header.style.color = 'green';
                    
                }
            }
        }
    }
    console.log(target);
}; 

const init = () => {
    enemyField.addEventListener('click', fire);
    play.render();
    game.generateShip();
    again.addEventListener('click', () => {
        location.reload();
    });

    console.log(game);
};

init();
