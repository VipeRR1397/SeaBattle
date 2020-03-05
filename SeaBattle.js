/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
    let getElement = (id) => {
        return document.getElementById(id);
    }

    const record = getElement('record');
    const hits = getElement('hits');
    const shots = getElement('shots');
    const kills = getElement('kills');
    const enemyField = getElement('enemy_field');
    const again = getElement('again');
    const header = document.querySelector('.header');

    ///////////////////////////////// Statistic \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    const play = {
        record: 0,
        hits: 0,
        shots: 0,
        kills: 0,
        set updateData(data) {
            this[data] += 1;
            this.render();
        },
        render() {
            record.textContent = this[record];
            hits.textContent = this.hits;
            shots.textContent = this.shots;
            kills.textContent = this.kills;
        }
    }

///////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////ships\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    const game = {
        ships: [
            {
                location: ['00', '01', '02', '03'],
                hits: ['', '', '', '']
            },
            {
                location: ['30','40','50'],
                hits: ['', '', '']
            },
            {
                location: ['09', '19'],
                hits: ['', '']
            },
            {
                location: ['99'],
                hits: ['']
            }
        ],
    
        shipCount: 4,
    };

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

                    if(play.shots < play.record || play.record == 0) {
                        localStorage.setItem('sbRecord', play.shots);
                        play.record = play.shots;
                        play.render()
                    }
                    
                }
            }
        }
    }
    console.log(target);
}; 

const init = () => {
    enemyField.addEventListener('click', fire);
    
    again.addEventListener('click', () => {
        location.reload();
    });
};

init();
