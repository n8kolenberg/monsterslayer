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

        checkHealth(hitOrHeal) {
            /*If the player healed himself, then we need to update the gameLog to say so */
            hitOrHeal == "healed self" ? this.updateLog(this.playerHeal, this.monsterHit, hitOrHeal) : this.updateLog(this.playerHit, this.monsterHit, hitOrHeal);
            if(this.playerHealth <= 0) {
                this.gameLog.unshift({
                    playerLog: `Player died`,
                    monsterLog: `Monster Wins!`
                });
                this.reset();
            }
            if(this.monsterHealth <= 0) {
                console.log("Player wins");
                this.gameLog.unshift({
                    playerLog: `Player Wins!`,
                    monsterLog: `Monster slain!`
                });
                this.reset();
            }
        },

        monsterAttack(hitOrHeal) {
            this.monsterHit = (Math.floor(Math.random() * 15) + 1);
            this.playerHealth = this.playerHealth - this.monsterHit;
            this.checkHealth(hitOrHeal);
        },

        attack(playerMove) {
            //The click on Attack sends the mouse event as the argument
            //Therefore, we need to check wheter the argument is not an object
            //In order to assign its value to this.playerHit
            //This is done so that we can use attack inside of specialAttack
            typeof(playerMove) !== "object" ? this.playerHit = playerMove : this.playerHit = (Math.floor(Math.random() * 10) + 1);
            this.monsterHealth = this.monsterHealth - this.playerHit;
            this.monsterAttack("attacked monster");
        },

        specialAttack() {
            if (this.specialAttacks <= 0) {
                this.specialAttackInfo = "OUT OF SPECIAL ATTACK";
                this.specialAttacks = 0;
            } else {
                this.specialAttacks--;
                this.playerHit = (Math.floor(Math.random() * 10) + 8);
                this.attack(this.playerHit);
            }
        },

        heal() {
            this.playerHeal = (Math.floor(Math.random() * 10) + 5);
            /*If we add the healing to the playerhealth and it's more than 100,
              We set it back to 100*/
            if((this.playerHealth + this.playerHeal) >= 100) {
                this.playerHealth = 100;
            } else {
                //Otherwise, we let the player heal himsel
                this.playerHealth = this.playerHealth + this.playerHeal;
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
        },

        resetGameLog() {
            this.gameLog = [];
        }
    },


});