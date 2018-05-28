new Vue({
    el: "#app",
    data: {
        gameStart: false,
        playerHealth: 100,
        monsterHealth: 100,
        specialAttacks: 3,
        specialAttackInfo: "SPECIAL ATTACK",
        playerHit: 0,
        monsterHit: 0,
        playerHeal: 0,
        gameLog: []
    },

    methods: {
        updateLog(playerHit, monsterHit, hitOrHeal) {
            this.gameLog.unshift({
                playerLog: `Player ${hitOrHeal} with ${playerHit}`,
                monsterLog: `Monster attacked player with ${monsterHit}`
            });
            
        },
        calculateDamage(min, max) {
           return Math.floor(Math.random() * max) + min;
        },

        checkHealth(hitOrHeal) {
            /*If the player healed himself, then we need to update the gameLog to say so */
            hitOrHeal == "healed self" ? this.updateLog(this.playerHeal, this.monsterHit, hitOrHeal) : this.updateLog(this.playerHit, this.monsterHit, hitOrHeal);
            if(this.playerHealth <= 0) {
                this.gameLog.unshift({
                    playerLog: `Player died`,
                    monsterLog: `Monster Wins!`
                });
                if(confirm("You lost! New Game?")) {
                    this.reset();
                    this.gameStart = true;
                } else {
                    this.reset();
                }
                return true;
                
            } else {
                if (this.monsterHealth <= 0) {
                    this.gameLog.unshift({
                        playerLog: `Player Wins!`,
                        monsterLog: `Monster slain!`
                    });
                    if(confirm("You won! New Game?")) {
                        this.reset();
                        this.gameStart = true;
                    } else {
                        this.reset();
                    }
                    return true;
                }
            } 
            return false;
            
        },

        monsterAttack(hitOrHeal) {
            this.monsterHit = this.calculateDamage(1, 15);
            this.playerHealth -= this.monsterHit;
            this.checkHealth(hitOrHeal);
        },

        attack(playerMove) {
            // if(this.checkHealth()) {
            //     return;
            // }
            //The click on Attack sends the mouse event as the argument
            //Therefore, we need to check wheter the argument is not an object
            //In order to assign its value to this.playerHit
            //This is done so that we can use attack inside of specialAttack
            typeof(playerMove) !== "object" ? this.playerHit = playerMove : this.playerHit = this.calculateDamage(1, 10);
            this.monsterHealth -= this.playerHit;
            this.monsterAttack("attacked monster");
        },

        specialAttack() {
            if (this.specialAttacks <= 0) {
                this.specialAttackInfo = "OUT OF SPECIAL ATTACK";
                this.specialAttacks = 0;
            } else {
                this.specialAttacks--;
                this.playerHit = this.calculateDamage(8, 12);
                this.attack(this.playerHit);
            }
        },

        heal() {
            this.playerHeal = this.calculateDamage(5, 10)
            /*If we add the healing to the playerhealth and it's more than 100,
              We set it back to 100*/
            if((this.playerHealth + this.playerHeal) >= 100) {
                this.playerHealth = 100;
            } else {
                //Otherwise, we let the player heal himsel
                this.playerHealth += this.playerHeal;
            }
                this.monsterAttack("healed self");
        },

        reset() {
            this.gameStart = false;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.specialAttacks = 3;
            this.specialAttackInfo = "SPECIAL ATTACK";
            this.playerHit = 0;
            this.monsterHit = 0;
            this.gameLog = [];
        },

        resetGameLog() {
            this.gameLog = [];
        }
    },


});