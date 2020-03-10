/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
let getElementById = (id) => {
    return document.getElementById(id);
}

const hits = getElementById('hits');
const shots = getElementById('shots');
const kills = getElementById('kills');
const enemyField = getElementById('enemy_field');
const userField = getElementById('user_field');
const again = getElementById('again');
const userShipClass = document.querySelector('.u_ship')
const header = document.querySelector('.header');
const main = getElementById('main')

///////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////ships\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const game = {
    enemyShips: [],
    enemyShipCount: 0,
    enemyOptionShip: {
        count: [1, 2, 3, 4],
        size: [4, 3, 2, 1],
    },
    userShips: [],
    userShipCount: 0,
    userOptionShip: {
        userCount: [1, 2, 3, 4],
        userSize: [4, 3, 2, 1],
    },
    collision: [],
    userCollision: [],
    generateField(size=10) {
        for (let line = 0; line < size; line++) {
            const tr = document.createElement('TR');
            enemyField.append(tr);
            for (let column = 0; column < size; column++) {
                let td = document.createElement('TD');
                td.setAttribute('id', `${line}${column}`)
                tr.append(td);
                
            }
        }
    },
    genereateUserField(size=10){
        for (let uline = 0; uline < size; uline++){
            const utr = document.createElement('TR');
            userField.append(utr);
            for (let ucolumn = 0; ucolumn < size; ucolumn++) {
                let utd = document.createElement('TD');
                utd.setAttribute('id', `${uline}${ucolumn}u`)
                utr.append(utd);
            }
        }
    },
    generateShip() {
        for (let i = 0; i < this.enemyOptionShip.count.length; i++) {
            for (let j = 0; j < this.enemyOptionShip.count[i]; j++) {
                const size = this.enemyOptionShip.size[i];
                const enemyShip = this.generateOptionsShip(size);
                this.enemyShips.push(enemyShip);
                this.enemyShipCount++;
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

        for (let i = 0; i < shipSize; i++) {
            if (direction) { // по горизонтали
                ship.location.push(x + '' + (y + i));
            } else { // по вертикали
                ship.location.push((x + i) + '' + y);
            }
            ship.hits.push('');
        }
        if (this.checkCollision(ship.location)) {
            return this.generateOptionsShip(shipSize);
        }

        this.addCollision(ship.location);

        return ship;
    },
    checkCollision(location) {
        for (const coord of location) {
            if (this.collision.includes(coord)) {
                return true;
            }
        }
    },
    addCollision(location) { // 
        for (let i = 0; i < location.length; i++) {
            const startCoordX = location[i][0] - 1;

            for (let j = startCoordX; j < startCoordX + 3; j++) {
                const startCoordY = location[i][1] - 1;

                for (let z = startCoordY; z < startCoordY + 3; z++) {
                    if (j >= 0 && j < 10 && z >= 0 && z < 10) {
                        const coord = j + '' + z;
                        if (!this.collision.includes(coord)) {
                            this.collision.push(coord);
                        }
                    }
                }
            }
        }
    },
    generateUserShip() {
        for (let i = 0; i < this.userOptionShip.userCount.length; i++) {
            for (let j = 0; j < this.userOptionShip.userCount[i]; j++) {
                const userSize = this.userOptionShip.userSize[i];
                const userShip = this.generateUserOptionsShip(userSize);
                this.userShips.push(userShip);
                this.userShipCount++;
            }
        }
    },
    generateUserOptionsShip(userShipSize) {
        const userShip = {
            userHits: [],
            userLocation: [],
        };
        const userDirection = Math.random() < 0.5;
        let n, m;
        if (userDirection) { // по горизонтали
            n = Math.floor(Math.random() * 10);
            m = Math.floor(Math.random() * (10 - userShipSize));
        } else { //по вертикали   
            n = Math.floor(Math.random() * (10 - userShipSize));
            m = Math.floor(Math.random() * 10);
        }

        for (let i = 0; i < userShipSize; i++) {
            if (userDirection) { // по горизонтали
                userShip.userLocation.push(n + '' + (m + i) + 'u');
            } else { // по вертикали
                userShip.userLocation.push((n + i) + '' + m + 'u');
            }
            userShip.userHits.push('');
        }
        if (this.checkUserCollision(userShip.userLocation)) {
            return this.generateUserOptionsShip(userShipSize);
        }

        this.addUserCollision(userShip.userLocation);

        return userShip;
    },
    checkUserCollision(userLocation) {
        for (const userCoord of userLocation) {
            if (this.userCollision.includes(userCoord)) {
                return true;
            }
        }
    },
    addUserCollision(userLocation) { // 
        for (let k = 0; k < userLocation.length; k++) {
            const userStartCoordX = userLocation[k][0] - 1;

            for (let l = userStartCoordX; l < userStartCoordX + 3; l++) {
                const userStartCoordY = userLocation[k][1] - 1;

                for (let f = userStartCoordY; f < userStartCoordY + 3; f++) {
                    if (l >= 0 && l < 10 && f >= 0 && f < 10) {
                        const userCoord = l + '' + f;
                        if (!this.userCollision.includes(userCoord)) {
                            this.userCollision.push(userCoord);
                        }
                    }
                }
            }
        }
    },
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
////////////////////////////////visual\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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

///////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////clicks\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const fire = (event) => {

    const target = event.target;
    if (target.classList.length !== 0 || target.tagName !== 'TD' || game.enemyShipCount <= 0) {
        return;
    };
    show.shots(target);
    play.updateData = 'shots';

    for (let i = 0; i < game.enemyShips.length; i++) {
        const ship = game.enemyShips[i];
        const index = ship.location.indexOf(target.id);
        if (index >= 0) {
            show.hits(target);
            play.updateData = 'hits';
            ship.hits[index] = 'x';
            const dead = ship.hits.indexOf('');
            if (dead < 0) {
                play.updateData = 'kills';
                for (const id of ship.location) {
                    show.kills(document.getElementById(id))
                }

                game.enemyShipCount -= 1;

                if (game.enemyShipCount < 1) {
                    header.textContent = 'You won!';
                    header.style.color = 'green';
                }
            }
        }
    }
    console.log(target);
};

const userFire = (event) => {

    const target = event.target;
    if (target.classList.length !== 0 || target.tagName !== 'TD' || game.enemyUserCount <= 0) {
        return;
    };
    show.shots(target);
    play.updateData = 'shots';

    for (let i = 0; i < game.userShips.length; i++) {
        const ship = game.userShips[i];
        const index = ship.userLocation.indexOf(target.id);
        if (index >= 0) {
            show.hits(target);
            play.updateData = 'hits';
            userShip.hits[index] = '';
            const dead = userShip.hits.indexOf('');
            if (dead < 0) {
                play.updateData = 'kills';
                for (const id of userShip.location) {
                    show.kills(document.getElementById(id))
                }

                game.enemyShipCount -= 1;

                if (game.enemyShipCount < 1) {
                    header.textContent = 'You won!';
                    header.style.color = 'green';
                }
            }
        }
    }
    console.log(target);
};

///////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////prog starting\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const init = () => {
    enemyField.addEventListener('click', fire);
    userField.addEventListener('click', userFire);
    play.render();
    game.genereateUserField();
    game.generateField()
    game.generateShip();
    game.generateUserShip();
    again.addEventListener('click', () => {
        location.reload();
    });
    console.log(game.enemyShips)
    console.log('ys', game.userShips)
    console.log(Array.isArray('userShip'))
};

init();

