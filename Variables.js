//////////////////////////////////////////////////
/////////          Variables            //////////
//////////////////////////////////////////////////


var playerArr = [[[[[]]]]];         // An array of all the playable characters in the game
var enemyArr = [[[[[]]]]];          // An array of all enemies in game
var turretArr = [[]];               // An array of all the turrets in the game
var bulletArr = [[]];               // An array of all the bullets in the game
var barrierArr = [[]];              // An array of all the barriers in the game
var jacketArr = [[]];               // An array of all the jackets in the game
var deviceArr = [[]];               // An array of all the devices
var spellArr = [[]];                // An array of all the spells in the game
var spellDescArr =[[]];             // A one to one array to the spellArr, containing all the descriptions, name, the unlock cost/ auto unlock, and the spell icon.
var aiArr = [[]];                   // An array containing the various AI patterns, inculding firing patterns, healing patterns, barrier usage, bomb usage, etc.
var stageLayoutArr = [[[]]];        // An array containing the various layout of the various levels.
var movementPatternArr = [[]];      // An array of all the types of different movement patterns, is called by the stageLayoutArr and is attached to an enemy.
var buttonArr = [];                 // An array of all the buttons in the game.
var stageDescArr = [];              // An array of all the descriptions in the stage

var mousedown = 0;                  // Is the mouse held down? 0 for no and 1 for yes
var mousePos = 0;                   // Stores the current location of the mouse on the screen in the X and Y direction
var mousePosX = 0;                  // Stores the current location of the mouse on the screen in the X direction
var mousePosY = 0;                  // Stores the current location of the mouse on the screen in the Y direction
var pause = 0;                      // Is the game paused? 0 for paused, 1 for running
var gameStart = 0;                  // Tells the game what screen it is on.  0 for loading screen, 10 for main menu, 99 for an active game screen, 98 for a pause menu.

var stageTimer = 0;                 // Timer for the wait time between stages
var blockTimer = 0;                 // Timer for the enemies inside the blocks
var screenTimer = 0;                // Timer for how long a screen must wait before switching
var chapterNumber = 0;              // The variable that stors the chapter number
var stageNumber = 0;                // The variable that stores the stage number
var blockNumber = 0;                // The variable that stores the number of the block in the stage
var screenNumber = [0];             // An array that the game which screen it is on. 0 for Main Menu, 10 for play screen
var difficulty = 0;                 // The difficulty level of the current game

var currentStageLayoutArr = [];     // An array that contains the layout of the current stage to prevent manupulation of stored data
var pBullets = [];                  // An array of all the player bullets on screen
var eBullets = [];                  // An array of all the enemy bullets on screen
var triBullets = [];                // An array of all the bullets that belong to neither and hurts both
var pSpecial = [];                  // An array of all the player's special bullets, like black holes, Bullet destoryers, Beams, etc
var eSpecial = [];                  // An array of all the enemies' special bullets, like black holes, Bullet destoryers, Beams, etc
var triSpecial = [];                // An array of all the special bullets belonging to neither, like black holes, Bullet destoryers, Beams, etc
var bEnemyOnScreenArr = [];         // Array of block enemies on screen
var bEnemyBarrierArr = [];          // Array of the barriers that the Block Enemies have spawned, one to one correspondence
var fEnemyOnScreenArr = [];         // Array of free enemies on screen
var fEnemyBarrierArr = [];          // Array of the barriers that the Block Enemies have spawned, one to one correspondence
var bETurretsOnScreenArr = [];      // Array of enemy turrets on screen
var pTurretsOnScreenArr = [];       // Array of player turrets on screen
var currentButtonArr = [];          // Array of the current buttons on screen
var currentUIArr = [];              // Array of the current UI elements other than Buttons
var avaliableCharArr = [];          // Array of the currently avaliable characters
var avaliableDeviceArr = [];        // Array of the currently avaliable devices, the devices currently avaliable to the character will be listed first, then devices that need to be unlock, and lastly devices that are not avaliable to the character
var avaliableJacketArr = [];        // Array of the currently avaliable devices, the jackets currently avaliable to the character will be listed first, then jackets that need to be unlock, and lastly jackets that are not avaliable to the character
var avaliableSpellArr = [];         // A two dimensional array of avaliable spells.  First array is spells avaliable to everyone. Second array is spells avaliable only to the character. Third array is spells avaliable only to the device. Fourth array is spells avaliable to only the Jacket
var galleryArr = [];                // Array of the current images used to display characters and items
var horizontalButtonArr = [];       // Array of the scrollable horizontal buttons

var currentPlayerArr = [];          // An array containing every detail about the current player
var currentLevel = [0,0,0,0,0,0,0]; // bullet level, special 1 level, special 2 level, bomb level, number of bombs, speed level, acceleration level
var loadedSpells = [];
var loadedBarriers = [];


////////// test variables///////////

var coord = new PointText(new Point(10, 690));
coord.fillColor = 'black';
coord.content = 'Pause';
avaliableCharArr = [0,1,2,3,4,5,6,7,8,9,10,11]


//////////////////////////////////////////////////
/////////            Arrays             //////////
//////////////////////////////////////////////////


//////////////////Barrier List////////////////////

barrierArr[0] = function(){
    this.path = new Path.Rectangle({        /// Must be in function to work properly
        size: [25,5],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'pink'
    })
    this.posX = -500;                       /// Stores the X position of the Barrier
    this.posY = -500;                       /// Stores the Y position of the Barrier
    this.angle = 0;                         /// Stores the current angle of the Barrier
    this.recastTimer = 0;                   /// Stores the amount of time has past since the barrier broke
    this.recastDelay = 3;                   /// Time required to recast barrier in seconds
    this.maxHealth = 1000;                  /// Max Health for the Barrier when generated
    this.currentHealth = 0;                 /// Stores the current health of the Barrier
    this.bDegrag = -5;                      /// Barrier degragation. Positive number means the barrier is slowly weakening over time (most barriers are). 0 means the barrier only weakens from damage. Negative number means it is regenerating.
    this.dmgLeak = 0;                       /// Percent of damage that leaks through.  Can be greater than 100 for barriers that increases damage like gravity loops.
    this.inflictDmg = 0;                    /// Amount of damage done to the opposing character when touching the barrier. Generally zero unless for very strong minions or bosses. And even then it is generally zero
    this.manaCost = 400;                    /// Mana required to bring up the barrier
    this.healthCost = 0;                    /// Health required to bring up the barrier, will ignore jacket health
    this.offsetY = 25;                      /// Barrier offset in the y direction relavtive to the character. If it is 0 then it is a radial barrier with a certain radius and certain angle width.
    this.dimX = 0;                          /// x width of the barrier or the angle of the barrier
    this.dimY = 0;                          /// y depth of the barrier or the radius of the barrier
    this.initDeg = 0;                       /// inital angle of the barrier with zero dead ahead and 90 being dead right and -90 being dead left and 180 being dead back.
    this.tracking = 0;                      /// Is the barrier tracking? 0 is non tracking. 1 tracks the player. 2 tracks the area with the most bullets. 3 tracks the area with the most damage potential.
    this.manaAbs = 0;                       /// Mana asborbing barrier accepts any interger with 0 being default, 100 means it generates 1 Mana for every 1 damage recieved by the barrier. -100 means it destroys 1 Mana for every damage recieved like a normal mana sheild. -100 to 0 is very common. 1 to 25 is for rarer enemies. 26 to 50 for late game enemies or early bosses.  Anything above is reserved normally for End game bosses or trick enemies.
    this.reflect = 0;                       /// Reflective barrier accepts 0 and 1.  Value of 1, Player bullets are reflected towards the player. Value of 0 is normal.  This type of barrier is generally tracks the player if it is small.
    this.reflectStrength = 0;               /// Reflected bullet strength accepts all postive intergers.  50 means the players bullets are reflected at half strength. 100 means the players bullets are reflected at full strength
    this.reflectSpeed = 0;                  /// Reflected bullet speed accepts all psotive intergers. 50 means the bullets move at half the speed they orginally moved at. 100 means they move full speed.  25 to 50 is normal. Generally reflected bullets move slower to compensate for the acceleration the bullets recieved and to make sure they can hit the player. Also used with Gravity warped bullets.
    this.gravity = 0;                       /// Gravity warping accepts -180 to 360 with 0 being default and means that it is off.  Postive intergers make it a Gravity Loop that attempts to fling bullets within the barrier towards the player. The barrier is always assumed to be spherical even when there is an offset. The postive value is the max number of degrees that the bullet can rotate around the character before it has to exit the gravity loop.  A value of 360 means that the bullet will make one rotation around the character before shooting it towards the player.  Negative numbers means the bullets fly away from the character at that angle.
    this.hacking = -2;                      /// Hacking can be used with either Reflective barriers or Gravity warping and accepts any non negative interger. A value of -2 means hacking is off, a value of -1 means that the bullets are not guided but will turn around and face the player, a value of 0 means the hijacked bullets are not guided and will continue on their previous trajectory. A value of 60 means that it turns 1 degree per frame or about 60 degrees per second.
},


//////////////////Jacket List////////////////////

// This is only for players.
jacketArr[0] = function(){
    this.buttonName = 'Flair'
    this.Name = 'Flair Fire'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        radius: 10,
        position: (-500,-500),              /// Make sure position is off screen to initalize
        fillColor: 'purple'
    })
    this.posX = -500;                       /// Stores the X position of the Jacket
    this.posY = -500;                       /// Stores the Y position of the Jacket
    this.maxHealth = 1000;                  /// Max Health of the Jacket
    this.currentHealth = 1000;              /// Stores the current health of the Jacket
    this.recastTimer = 0;                   /// Stores the amount of time has past since the barrier broke
    this.recastDelay = 240;                 /// Time required to recast the Jacket, -1 for a one time jacket and any postive number being the number of frames required to bring the jacket back up. 60 would mean that it takes 1 second to bring up again.
    this.manaCost = 3000;                   /// Mana required to recast the Jacket
    this.healthCost = 0;                    /// Base health required to recast the Jacket.
    this.manaAbs = 0;                       /// Mana asborbing jacket accepts any interger with 0 being default, 100 means it generates 1 Mana for every 1 damage recieved by the Jacket, this is normal.  This also dictacts how much mana you recieve from grazing.
    this.weight = 100;                      /// "Weight" of the jacket the higher the number more of a burden it is to the user. The malus of a heavier jacket and the bonus of a lighter jacket is dependent on each character.
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.physicalRes = 0;                   /// Physical Resistance from 0 to 100%
    this.magicalRes = 0;                    /// Magical Resistance from 0 to 100%
    this.piercingRes = 0;                   /// Piercing Resistance from 0 to 100%
    this.manaSapRes = 0;                    /// Mana Sap Resistance from 0 to 100%
    this.curseRes = 0;                      /// Curse Resistance from 0 to 100%
    this.silenceRes = 0;                    /// Silence Resistance from 0 to 100%
    this.entangleRes = 0;                   /// Entangle Resistance from 0 to 100%
    this.upgrade = 0;                       /// 0 for not upgradeable, positive interger to signify the number of indexes it is ahead and negative interger for number of indexes behind
    this.inherentSpells = []                /// Spells that are inherent to the jacket
},

jacketArr[1] = function(){
    this.buttonName = 'Moose'
    this.Name = 'Hiya'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        radius: 10,
        position: (-500,-500),              /// Make sure position is off screen to initalize
        fillColor: 'purple'
    })
    this.posX = -500;                       /// Stores the X position of the Jacket
    this.posY = -500;                       /// Stores the Y position of the Jacket
    this.maxHealth = 1000;                  /// Max Health of the Jacket
    this.currentHealth = 1000;              /// Stores the current health of the Jacket
    this.recastTimer = 0;                   /// Stores the amount of time has past since the barrier broke
    this.recastDelay = 240;                 /// Time required to recast the Jacket, -1 for a one time jacket and any postive number being the number of frames required to bring the jacket back up. 60 would mean that it takes 1 second to bring up again.
    this.manaCost = 3000;                   /// Mana required to recast the Jacket
    this.healthCost = 0;                    /// Base health required to recast the Jacket.
    this.manaAbs = 0;                       /// Mana asborbing jacket accepts any interger with 0 being default, 100 means it generates 1 Mana for every 1 damage recieved by the Jacket, this is normal.  This also dictacts how much mana you recieve from grazing.
    this.weight = 100;                      /// "Weight" of the jacket the higher the number more of a burden it is to the user. The malus of a heavier jacket and the bonus of a lighter jacket is dependent on each character.
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.physicalRes = 0;                   /// Physical Resistance from 0 to 100%
    this.magicalRes = 0;                    /// Magical Resistance from 0 to 100%
    this.piercingRes = 0;                   /// Piercing Resistance from 0 to 100%
    this.manaSapRes = 0;                    /// Mana Sap Resistance from 0 to 100%
    this.curseRes = 0;                      /// Curse Resistance from 0 to 100%
    this.silenceRes = 0;                    /// Silence Resistance from 0 to 100%
    this.entangleRes = 0;                   /// Entangle Resistance from 0 to 100%
    this.upgrade = 0;                       /// 0 for not upgradeable, positive interger to signify the number of indexes it is ahead and negative interger for number of indexes behind
    this.inherentSpells = []                /// Spells that are inherent to the jacket
},
jacketArr[0] = function(){
    this.buttonName = 'Flair'
    this.Name = 'Flair Fire'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        radius: 10,
        position: (-500,-500),              /// Make sure position is off screen to initalize
        fillColor: 'purple'
    })
    this.posX = -500;                       /// Stores the X position of the Jacket
    this.posY = -500;                       /// Stores the Y position of the Jacket
    this.maxHealth = 1000;                  /// Max Health of the Jacket
    this.currentHealth = 1000;              /// Stores the current health of the Jacket
    this.recastTimer = 0;                   /// Stores the amount of time has past since the barrier broke
    this.recastDelay = 240;                 /// Time required to recast the Jacket, -1 for a one time jacket and any postive number being the number of frames required to bring the jacket back up. 60 would mean that it takes 1 second to bring up again.
    this.manaCost = 3000;                   /// Mana required to recast the Jacket
    this.healthCost = 0;                    /// Base health required to recast the Jacket.
    this.manaAbs = 0;                       /// Mana asborbing jacket accepts any interger with 0 being default, 100 means it generates 1 Mana for every 1 damage recieved by the Jacket, this is normal.  This also dictacts how much mana you recieve from grazing.
    this.weight = 100;                      /// "Weight" of the jacket the higher the number more of a burden it is to the user. The malus of a heavier jacket and the bonus of a lighter jacket is dependent on each character.
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.physicalRes = 0;                   /// Physical Resistance from 0 to 100%
    this.magicalRes = 0;                    /// Magical Resistance from 0 to 100%
    this.piercingRes = 0;                   /// Piercing Resistance from 0 to 100%
    this.manaSapRes = 0;                    /// Mana Sap Resistance from 0 to 100%
    this.curseRes = 0;                      /// Curse Resistance from 0 to 100%
    this.silenceRes = 0;                    /// Silence Resistance from 0 to 100%
    this.entangleRes = 0;                   /// Entangle Resistance from 0 to 100%
    this.upgrade = 0;                       /// 0 for not upgradeable, positive interger to signify the number of indexes it is ahead and negative interger for number of indexes behind
    this.inherentSpells = []                /// Spells that are inherent to the jacket
},


/////////////////Device List////////////////////

// This is only for players.
deviceArr[0] = function(){
    this.buttonName = 'MP-12zA'
    this.Name = 'MP-12zA "Last Flamer"'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'grey'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[1] = function(){
    this.buttonName = 'KA92-2'
    this.Name = 'KA92-2 "Hella"'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [15,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'black'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[2] = function(){
    this.buttonName = 'KA92-2'
    this.Name = 'Mels 3'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,55],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'grey'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[3] = function(){
    this.buttonName = 'KA92-2'
    this.Name = 'Hkw 4'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'green'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[4] = function(){
    this.buttonName = 'KA92-2'
    this.Name = 'Msz 5'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'white'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[5] = function(){
    this.buttonName = 'KA92-2'
    this.Name = '6'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'yellow'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[6] = function(){
    this.buttonName = 'KA92-2'
    this.Name = '7'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'grey'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[7] = function(){
    this.buttonName = 'KA92-2'
    this.Name = '8'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [35,25],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'pink'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[8] = function(){
    this.buttonName = 'Nsdsal-2'
    this.Name = '9'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [35,25],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'grey'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[9] = function(){
    this.buttonName = 'Lld92'
    this.Name = '10'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [35,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'red'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[10] = function(){
    this.buttonName = "NNJk'jdskds"
    this.Name = '11'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [30,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'orange'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[11] = function(){
    this.buttonName = 'NJ "dsfdsa"'
    this.Name = '12'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [35,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'yellow'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[12] = function(){
    this.buttonName = 'NJKndd-sjd'
    this.Name = '13'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [35,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'green'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[13] = function(){
    this.buttonName = 'NJKnasd'
    this.Name = '14'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [35,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'purple'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[14] = function(){
    this.buttonName = 'NJkasdf'
    this.Name = '15'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [35,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'pink'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[15] = function(){
    this.buttonName = 'NJs-sdfa'
    this.Name = '16'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'yellow'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[16] = function(){
    this.buttonName = 'NJKdfadjf'
    this.Name = '17'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'black'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[17] = function(){
    this.buttonName = 'NJKsda'
    this.Name = '18'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'red'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[18] = function(){
    this.buttonName = 'NJKjfads'
    this.Name = '19'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'orange'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[19] = function(){
    this.buttonName = 'NJKnfds'
    this.Name = '20'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'purple'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[20] = function(){
    this.buttonName = 'Njknads'
    this.Name = '21'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'pink'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[21] = function(){
    this.buttonName = 'NJKsdnkjaf'
    this.Name = '22'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [12,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'green'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[22] = function(){
    this.buttonName = 'Jkjsnd'
    this.Name = '23'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [12,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'grey'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[23] = function(){
    this.buttonName = 'KA92-2'
    this.Name = '24'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [20,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'yellow'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[24] = function(){
    this.buttonName = 'KA92-2'
    this.Name = '25'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [20,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'blue'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[25] = function(){
    this.buttonName = 'Ndsnafdksf'
    this.Name = '26'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [25,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'grey'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[26] = function(){
    this.buttonName = 'JKsdafd'
    this.Name = '27'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [5,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'yellow'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},


deviceArr[27] = function(){
    this.buttonName = 'NBjsfjasdf'
    this.Name = '28'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [5,35],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'pink'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[28] = function(){
    this.buttonName = 'POOKdpskod'
    this.Name = '29'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [15,55],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'green'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[29] = function(){
    this.buttonName = 'JKJuhads'
    this.Name = '30'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [10,25],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'purple'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[30] = function(){
    this.buttonName = 'hdsfnmxv'
    this.Name = '31'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [65,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'grey'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},

deviceArr[31] = function(){
    this.buttonName = 'KA92-2sdfds'
    this.Name = '32'
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [65,65],
        position: (-500,-500),              ///Make sure position is off screen
        fillColor: 'Pink'
    })
    this.posX = -500;                       /// Stores the X position of the Device
    this.posY = -500;                       /// Stores the Y position of the Device
    this.manaMult = 10;                     /// Max mana multiplier
    this.manaAdd = 2000;
    this.manaUseMult = 2;                   /// Mana usage multiplier
    this.manaUseAdd = 1;                    /// Mana usage addition or malus positive is malus negative is bonus
    this.healthUseMult = 0;                 /// Health usage multiplier
    this.healthUseAdd = 0;                  /// Health usage addition or malus positive is malus negative is bonus
    this.manaRegenMult = 10;                /// Mana regen multiplier
    this.manaRegendAdd = 10;                /// Mana regen add
    this.physMult = 40;                     /// Physical damage multiplier in percentage.
    this.physAdd = 10;                      /// Physical damage addition or malus.
    this.magicMult = 45;                    /// Magical damage multiplier in percentage.
    this.magicAdd = 5;                      /// Magical damage addition or malus.
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.piercingMult = 0;                  /// Piercing chance multiplier in percentage.
    this.piercingAdd = 0;                   /// Base pierce chance addition or malus.
    this.manaSapMult = 0;                   /// Mana Sap multiplier in percentage.
    this.manaSapAdd = 0;                    /// Mana Sap addition or malus.
    this.curseMult = 0;                     /// Curse multiplier in percentage.
    this.curseAdd = 0;                      /// Curse addition or malus.
    this.silenceMult = 0;                   /// Silence multiplier in percentage.
    this.silenceAdd = 0;                    /// Silence addition or malus.
    this.entangleMult = 0;                  /// Entangle multiplier in percentage.
    this.entangleAdd = 0;                   /// Entangle addition or malus.
    this.weight = 20;                       /// Weight of the device, generally 1/5 the weight of the jacket
    this.radiusMult = 10;                   /// Hit radius bonus or malus in percentage
    this.deviceOffsetY = -10;               /// Y offset of Device from player
    this.spellOffsetY = -45;                /// Y offset of spell spawn point
    this.inherentSpells = []                /// Spells that are inherent to the Device
},


///////////////////Spell List////////////////////

// Only for the player
spellArr[0] = [
    0,                                      /// Accepts an index of a turret
    0,                                      /// Relative X position
    20,                                     /// Relative Y position
    0,                                      /// Relative angle. 0 is dead ahead, 90 is dead right, -90 is dead left, 180 is dead back.
    0,                                      /// The angle the spell fires at.  Overrides the turret's inital angle
    0,                                      /// 0 for Relative to the device and 1 for Relative to the body
    0,10,20,0,0,0,
    0,-10,20,0,0,0,
    0,20,20,0,0,0,
    0,-20,20,5,0,0,
]

///////////////Spell Descriptions////////////////

spellDescArr[0] = [
    "Basic Spell",
    "This is a basic spell that shoots five bullets at once.",
    0,                                      /// Unlock cost
    0,                                      /// Auto unlock, this describes the chapter it is unlocked. -1 for not auto unlocking and is avaliable to purchase from the start. If the cost is zero, it is automatically given to the player, otherwise the player needs to buy it for each character
    0,                                      /// Auto unlock, this describes the level that it is unlocked.
    -1                                      /// Unique spell, -2 for a unique spell that no one else can use, -1 for an unique spell that cannot be used until it auto unlocks. 0 for a spell anyone can use and buy
]


//////////////////Turret List////////////////////

turretArr[0] = function(){                  /// A Prototypical turret array
    this.path = new Path.Circle({           /// Image of a turret
        radius: 0,
        position: (-500,-500),              /// Make sure position is off screen to initalize
        fillColor: 'pink'
    })
    this.offsetX = 0;                       /// X offset of the turret, set by the owner
    this.offsetY = 0;                       /// Y offset of the turret, set by the owner
    this.posX = 0;                          /// X position of the turret
    this.posY = 0;                          /// Y position of the turret
    this.fpr = 5;                           /// Frames per round. the number of frames that pass before firing again. Runs at 60 FPS
    this.timer = 0;                         /// Counts the number of frames has passed
    this.turretType = 0;                    /// Type of turret, accepts 0, 1, 2, 3.
    this.initDeg = 0;                       /// Intital direction that the turret is pointing. 0 is dead ahead. 90 is dead right. -90 is dead left. 180 is dead back.
    this.angle = 0;                         /// Current angle of the turret
    this.trackSpeed = 0;                    /// Turret tracking in degrees per second, where 60 means 60 degree of turn per second. Zero for non tracking. Generally this is zero if the turret is a sweeping type of turret.
    this.inaccuracy = 0;                    /// Turret inaccuracy accepts 0-360. This denotes the number of degrees this turret will randomly shoot bullets. 90 means a turret will shoot randomly in a cone 90 deg wide with the center aligned with at the 45 degree mark
    this.sweeping = -999;                   /// Sweeping accepts either -999, 999, or -100 to 100. -999 means it is off. 0 to 100 means that it will be a sweeping type of turret that accepts both sweeping limits with the inital starting point being a percentage of the sweeping limits.  50 means it starts where the turret is facing.  998 means that it is a turret that continuiously turns in a clockwise direction and 999 means that it is a turret that continuiously turns in a counter clockwise direction.
    this.sweepStart = 0;                    /// Starting limit accepts any intergers. This is the angle relative to the turret's current facing.  A number that is postive is to the right and a negative number means to the left.  If the number is bigger than the ending limit, then it will start moving right first and the other way means that it starts moving left first. This is ignored if the turret is continuiously turning turret and the starting limit becomes the starting location to start rotating and will only accept (-180 to 180).
    this.sweepEnd = 0;                      /// Ending limit accepts any intergers and is ignored if the turret is continuiously turning.  The delta degrees between the the starting and ending limit can be greater than 360, meaning that it will make at least one complete revolution before sweeping back.
    this.bulletInd = 0;                     /// Index of the bullet in the bulletArr
    this.dmgMult = 1;                       /// Damage multiplier.  This is mainly is for trick enemies that will fire the same bullet that is far stronger than expected.
    this.turretTimer = 0;                   /// The delay that the turret needs to wait before shooting in number of frames
}


//////////////////Bullet List////////////////////

bulletArr[0] = function(){
    this.path = new Path.Circle({           /// Image of a bullet
        radius: 5,
        position: (-500,-500),              /// Make sure position is off screen to initalize
        fillColor: 'pink'
    })
    this.posX = 0;                          /// X position of the bullet
    this.posY = 0;                          /// Y position of the bullet
    this.sizeX = 10;                        /// X size of the bullet
    this.sizeY = 10;                        /// Y size of the bullet
    this.physDmg = 5;                       /// Physical damage the bullet inflicts
    this.magicDmg = 0;                      /// Magical damage the bullet inflicts
    this.manaSap = 0;                       /// Percentage of damage that is return as mana
    this.curseTime = 0;                     /// Time they are cursed in seconds
    this.curseDmg = 0;                      /// Amount of damage done per second
    this.silenceTime = 0;                   /// Amount of time the opponent is slienced
    this.silenceStr = 0;                    /// How strong the slience is
    this.entangleTime = 0;                  /// How long the entanglement will last
    this.entangleStr = 0;                   /// How much of speed the opponent loses in percentage
    this.piercing = 0;                      /// Percent chance it pierces a Jacket and/or Barrier
    this.bulletWidth = 5;                   /// Width of the bullet hit box
    this.bulletLength = 5;                  /// Length of the bullet hit box
    this.initSpeed = 3;                     /// Intial speed of the bullet @ pixels per frame @ 125 fps
    this.currentVector = 0;                 /// Stores the current speed of the bullet as a vector
    this.maxSpeed = 15;                     /// Max speed of the bullet @ pixels per frame @ 125 fps
    this.accel = 1;                         /// Acceleration of the bullet in pixels per frame per frame @ 125 fps
    this.manaCost = 1;                      /// Amount of mana required to fire one bullet accepts any nonzero postive number larger than 0.1.
    this.healthCost = 0;                    /// Amount of health required to fire one bullet accepts any non-negative number
    this.timeOut = 50;                      /// How long before the bullet timeout
    this.timer = 0;                         /// How long the bullet has been alive
    this.turnRate = 0;                      /// Degrees of turn per second for Bullet, where 60 means 60 degree of turn per second to the right and -60 means 60 degree of turn to the left, unless it is homing or is sinusoidal. For homing, it is the max amount of degrees turn it can turn per second.  For sinusoidal it is the amplitude of the function in pixels.
    this.homing = 0;                        /// Is the bullet homing, accepts 0 or 1
    this.sine = 0;                          /// Sinusoidal. Is ignored if the bullet is homing. Must be 0 or larger.  0 means it is off and any postive interger is the period of a cycle in 2pi * pixels
    this.damageDelta = 0;                   /// Amount of damage it either gains or loses per frame.  Most bullets are negative number. Can be fractional.  Should be less than abs(±1).
    this.explodingBullet = 0;               /// Exploding bullet accepts any non negative interger. 0 means it is off and the program ignores the following arrays. A postive interger denotes the number of times the bullet will loop through the following objects and explode when finished looping.  Multiple nested objects are here to create different patterns and the such.
}

bulletArr[200] = function(){
    this.path = new Path.Rectangle({
        size: [10,40],
        position: (-500,-500),
        fillColor: 'grey'
    });
    this.posX = 0;
    this.posY = 0;
    this.sizeX = 10;
    this.sizeY = 40;
    this.physDmg = 50;
    this.magicDmg = 50;
    this.manaSap = 0;
    this.curseTime = 0;
    this.curseDmg = 0;
    this.silenceTime = 0;
    this.silenceStr = 0;
    this.entangleTime = 0;
    this.entangleStr = 0;
    this.piercing = 0;
    this.bulletWidth = 10;
    this.bulletLength = 40;
    this.initSpeed = 4;
    this.currentVector = 4;
    this.maxSpeed = 5;
    this.accel = 0.1;
    this.manaCost = 10;
    this.timeOut = 50;
    this.timer = 0;
    this.turnRate = 0;
    this.homing = 0;
    this.sine = 0;
    this.damageDelta = 0;
    this.explodingBullet = 0;
}

// bullets exploding with timer and multi exploding bullets
// animations by placing the thing that you want to animate into a further nested array, groupping them together
// movement of enemy is dictated by drawing lines with two points, then having a wait, then drawing another line and waiting more, if it is closed you can tell it how many times to move around that closed loop, or until something happens


//////////////////Player List////////////////////

//Player Character 1
playerArr[0] = function(){
    this.buttonName = 'Mehla'
    this.Name = "Mehla Hsahfs"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 25,
        position: (-500, -500),
        fillColor: 'black'
    })
    this.radius = 10;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [0,1,2,3,4,5,6,7,12,23,30];       /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [0];             /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [0,1];               /// An array containing the max possible chapters that the character can access
    this.currentChapters = [0,1];           /// An array containing the the current chapter that the character can access
    this.maxStages = [                      /// A two dimensional array containing the max possible stages that character can access
        [0,1,2],
        [0,1,2],
    ];
    this.currentStages = [                  /// A two dimensional array containing the currentStages stages that character can access
        [0,1,2],
        [0,1,2],
    ];
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},


//Player Character 2
playerArr[1] = function(){
    this.buttonName = 'Ashtel'
    this.Name = "Ashtel Hsdjas"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 30,
        position: (-500, -500),
        fillColor: 'Purple'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [0,1,2,3,4,5,6,7,12,15,23,25];
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [3];             /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 3
playerArr[2] = function(){
    this.buttonName = 'Dsdshtel'
    this.Name = "Dsdshtel Jskadka"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 30,
        position: (-500, -500),
        fillColor: 'Pink'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [2,3,4,6,7,12,15,16,23,25,28];
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [4];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 4
playerArr[3] = function(){
    this.buttonName = 'Hanzx'
    this.Name = "Hanzx Uudsj"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 20,
        position: (-500, -500),
        fillColor: 'Yellow'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [5,6,7,12,15,17,20,23,25,26,27,28];
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [13];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 5
playerArr[4] = function(){
    this.buttonName = 'Ashtel'
    this.Name = "Ashtel Jshad"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 30,
        position: (-500, -500),
        fillColor: 'Blue'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [7,13,15,17,20,23,25,26,27,28];                   /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [13];            /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 6
playerArr[5] = function(){
    this.buttonName = 'Yshdel'
    this.Name = "Yshdel Hasdz"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 30,
        position: (-500, -500),
        fillColor: 'Grey'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [7,10,12,13,15,16,19,22,25,26,27,28];                   /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [10];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 7
playerArr[6] = function(){
    this.buttonName = "el'Tan7"
    this.Name = "el'Tan7 Hasmzs"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 15,
        position: (-500, -500),
        fillColor: 'Purple'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [12,13,14,15,16,18,19,22,25,26,27,28];                   /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [14];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 8
playerArr[7] = function(){
    this.buttonName = 'Ashtel'
    this.Name = "Ashtel Hsasd"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 20,
        position: (-500, -500),
        fillColor: 'Orange'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [12,13,14,15,16,18,19,22,25,26,27,28];                   /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [14];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 9
playerArr[8] = function(){
    this.buttonName = 'Lsdasl'
    this.Name = "Lsdasl Sslf"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 35,
        position: (-500, -500),
        fillColor: 'Pink'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [14,15,16,18,19,20,21,22,25,26,27,28];                   /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [16];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 10
playerArr[9] = function(){
    this.buttonName = "Teld'sa"
    this.Name = "Teld'sa Hsad10a"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 25,
        position: (-500, -500),
        fillColor: 'yellow'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [18,19,20,21,22,23,24,25,26,27,28];                   /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [20];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 11
playerArr[10] = function(){
    this.buttonName = 'Xshtel'
    this.Name = "Xshtel BSaad"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 30,
        position: (-500, -500),
        fillColor: 'grey'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [21,22,23,24,25,26,27,28,29];                   /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [23];              /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},

//Player Character 12
playerArr[11] = function(){
    this.buttonName = 'Vssdad'
    this.Name = "Vssdad SfelJK"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Circle({
        position: view.center,
        radius: 20,
        position: (-500, -500),
        fillColor: 'green'
    })
    this.radius = 14;                       /// Hit radius of player
    this.posX = 0;                          /// Position of player in x coordinates
    this.posY = 0;                          /// Position of player in y coordinates
    this.startHealth = 100;                 /// Starting health
    this.maxHealth = 100;                   /// Max health
    this.currentHealth = 100;               /// Current health of the player
    this.startMana = 10;                    /// Starting Mana
    this.maxMana = 10;                      /// Max Mana
    this.currentMana = 10;                  /// Current mana of the player
    this.startManaRegen = 5;                /// Starting Mana Regen Per Second
    this.manaRegen = 5;                     /// Mana Regen Per Second
    this.healthRegen = 2;                   /// Health Regen Per Second
    this.baseMaxSpeed = 10;                 /// The base max speed of the character
    this.maxSpeed = 10;                     /// Speed of the character, the higher it is the faster the character
    this.baseAccel = 10                     /// The base acceleration of the character
    this.accel = 10;                        /// Acceleration of the character, the lower it is the better the Acceleration
    this.maxWeight = 120;                   /// Carry weight of the character
    this.currentWeight = 0;                 /// Weight of the current load out
    this.speedMult = 0.75;                  /// Speed bonus or malus from either underweight or overweight multiplier
    this.accelMult = 0.75;                  /// Acceleration bonus or malus from either underweight or overweight multiplier
    this.deviceInd = 0;                     /// Index of starting Device
    this.jacketInd = 0;                     /// Index of starting Jacket
    this.spellInd = [0];                    /// Indecies of starting Spell
    this.barriersInd = [0];                 /// Indecies of starting Barriers
    this.deviceOffsetX = -25;               /// X offset of Device from player
    this.highestStage = [0,0];              /// An array that contains the highest stage completed by the character
    this.maxSpells = [];                    /// An array containing max possible spells
    this.currentSpells = [];                /// An array containing the current spells
    this.startingSpells = [];               /// An array containing the starting spells
    this.maxDevices = [26,27,28,29,31];     /// An array containing max possible devices
    this.currentDevices = [];               /// An array containing the current devices
    this.startingDevices = [31];            /// An array containing the starting devices
    this.maxJackets = [];                   /// An array containing max possible jackets
    this.currentJackets = [];               /// An array containing the current jackets
    this.startingJackets = [];              /// An array containing the starting jackets
    this.maxChapters = [];                  /// An array containing the max possible chapters that the character can access
    this.currentChapters = [];              /// An array containing the the current chapter that the character can access
    this.maxStages = [];                    /// A two dimensional array containing the max possible stages that character can access
    this.currentStages = [];                /// A two dimensional array containing the current stages that character can access
    this.Index = 0;                         /// Leave this zero, the program will fill this in.
},


//////////////////Enemy List////////////////////

/////enemyArr is setup such that the first dimension denotes the enemy, the second dimension denotes the stage of the enemy for multi form enemies.  The first array stores the first form, the second array stores the second form and so on.  further dimensions will be described in line

//First enemy
enemyArr[0][0] = function(){
    this.Name = "Training Cubes"
    this.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec orci tellus. Curabitur bibendum et lacus a sollicitudin. Duis accumsan imperdiet justo, quis porta leo euismod eu. Nam a consequat purus. Ut quam tortor, sodales congue porttitor nec, consequat sit amet sapien. Aliquam sit amet vulputate purus. Nunc rhoncus sollicitudin malesuada. In eu tellus a felis venenatis lacinia a eu lacus."
    this.path = new Path.Rectangle({
        size: [40,40],
        position: (-500,-500),
        fillColor: 'red'
    });
    this.posX = 0;                          /// Position of enemy in X coordinates
    this.posY = 0;                          /// Position of enemy in Y coordinates
    this.sizeX = 40;                        /// Size of the enemy in X direction
    this.sizeY = 40;                        /// Size of the enemy in Y direction
    this.maxMana = 500;                     /// Max Mana
    this.currentMana = 500;                 /// Current Mana
    this.manaRegen = 20;                    /// Amount of Mana regen per second
    this.manaRegenDelay = 0;                /// Delay in Mana regen in seconds
    this.manaOverflow = 0;                  /// Mana Overflow.  Is excess mana wiped out when changing stages due to damage?
    this.maxHealth = 50;                    /// Max Health
    this.currentHealth = 50;                /// Current Health
    this.healthRegen = 2;                   /// Amount of Health regen per second, can be negative for special stages.
    this.healthRegenDelay = 2;              /// Delay in Health regen in seconds
    this.regrowth = -1;                     /// Regrowth accepts from -1 to 100. -1 means it does not have regrowth and can not revert to a previous stage. 0 to 100 means it has regrowth and will revert to the previous stage with that number % of health.  This is ignored in the first stage.
    this.barrierJacket = 0;                 /// Barrier Jacket accepts 0 or 1 and means whether or not this form can be periced to damage the next stage.  Is ignored for single form enemies.
    this.physicalRes = 0;                   /// Physical Resistance from 0 to 100%
    this.magicalRes = 0;                    /// Magical Resistance from 0 to 100%
    this.piercingRes = 0;                   /// Piercing Resistance from 0 to 100%
    this.manaSapRes = 0;                    /// Mana Sap Resistance from 0 to 100%
    this.curseRes = 0;                      /// Curse Resistance from 0 to 100%
    this.silenceRes = 0;                    /// Silence Resistance from 0 to 100%
    this.entangleRes = 0;                   /// Entangle Resistance from 0 to 100%
    this.maxSpeed = 2.3;                    /// Max movement speed in 1 pixels per frame
    this.accel = 0.1;                       /// Max Acceleration in 1 pixels per frame per frame
    this.currentTurnRate = 0;               /// Current turning rate
    this.finalAngle = 0;                    ///
    this.turnRate = 30;                     /// Turning rate in degrees per second
    this.rotateRate = 50;                   /// Rotate in place speed in degrees per second, generally a bit higher than turning rate
    this.homing = 0;                        /// Homing accepts 0 or 1.  Does not start homing until the the last movement on the movement pattern has ended.
    this.sucidial = -1;                     /// Sucidial means that it will die when it hits gets hit and will fire a damaging explosion. -1 for not sucidial and non-negative numbers for the index of the bullet it fires.
    5;                                      /// Damage per frame from collision
    this.meleeAttack = [                    /// Object that stores the bullets that spawn during a melee attack
        200, 0, 0                           /// Stores the index to a bullet, X position, Y position
    ];
    this.turret = [                         /// An array concerning Turrets.
       [
           -10,                             /// Minimium difficulty level that this turret will show up. -10 means that there is no minimium difficulty level that it won't show up. -2 is Baby mode, -1 is easy mode, 0 is normal mode, 1 is hard mode, 2 is very hard, 3 is mythic, 4 is godlike
           10,                              /// Maximium difficulty level that this turret will show up. 10 means that there is no Maximium difficulty level that it won't show up.
           0,                               /// X position of turret relative to enemy.
           25,                               /// Y position of turret relative to enemy.
           0,                               /// Index of turret
           0,                               /// Inital relative angle of the turret
       ]                                    /// Repeat for other turrets
   ];
    this.barrierInd = []                    /// An array concerning Barriers. There can be many barriers per enemies.  Probabaly only bosses and mini boss have multiple Barriers.  List the barriers that enemy can use at this stage inside the array, along with barrier health multiplier, and barrier strength multiplier. Example: barrierArr[0], 100, 100 means this enemy has the _________ Barrier with 100% of barrier health, and has 100% of the barrier's strength characteristic.  Repeat for other barriers.
    this.defaultAI = 0;                     /// This stores the defaultAI
    this.movementPat = 0;                   /// This stores the Movement Pattern
    this.timer = 0;                         /// How many frames the enemy has been moving
    this.currentVector = 0;                 /// Stores the vector that the enemy is moving at
    this.turretTimer = 240;                 /// How many frames it must wait before firing
}


/////////////////////Enemy Ai List/////////////////////

// The following array contains the AI pattern that the enemies take.
aiArr[0] = [                                /// AI for basic enemies
    1,                                      /// How many movement legs it must wait before firing
    0,                                      /// How many seconds after reaching the necessary movement legs it must wait before firing
    -1,                                     /// Is a barrier up when spawned? -1 is no, otherwise it is a non negative interger that dictacts what barrier it has up
    20,                                     /// percentage of health
];


//////////////////Stage Layout List////////////////////

stageLayoutArr[0][0] = [
    [                                       /// Array that stores repeating enemies that don't hold formations.  Is attached to the next block
    ],
    0,                                      /// The number of seconds that must pass before the next block appears
    [
        0,                                  /// The array index of the enemy that is being called
        1,                                  /// The array index of the movement Pattern that the enemy should take
        0,                                  /// The array index of the AI pattern that the enemy should take
        75,                                 /// X axis that the enemy enters at
        -300,                               /// Y asis that the enemy enters at
        2,                                  /// The number of seconds that must pass before it shows up relative to the previous enemy
        0, 1, 0, 175, -300, 0,
        0, 1, 0, 275, -300, 0,
        0, 1, 0, 375, -300, 0,
        0, 1, 0, 625, -300, 0,
        0, 1, 0, 725, -300, 0,
        0, 1, 0, 825, -300, 0,
        0, 1, 0, 925, -300, 0,
        0, 1, 0, 125, -400, 0,
        0, 1, 0, 225, -400, 0,
        0, 1, 0, 325, -400, 0,
        0, 1, 0, 425, -400, 0,
        0, 1, 0, 575, -400, 0,
        0, 1, 0, 675, -400, 0,
        0, 1, 0, 775, -400, 0,
        0, 1, 0, 875, -400, 0
    ]
]

////////////////Stage Descriptions//////////////////

stageDescArr[0] = [
    [                                       /// First array contains the chapter name
        'Chapter 1',                        /// Button name for the chapter
        'Training'                          /// Chapter title
    ],
    [                                       /// The following arrays contain the actual descriptions of each stage
        'Level 1-1',                      /// Button name for the stage
        'Introduction',                     /// Stage title, it is appended to the chapter title and the next part is a description of the stage
        'This is a very basic training to get you used to your Device and Jacket'
    ],
    [
        'Level 1-2',
        'I get More spells?',
        'You are given more spells to try out'
    ],
    [
        'Level 1-3',
        'Enemies Get Cool Spells Too?',
        'You are given more spells to try out'
    ]
]

stageDescArr[1] = [
    [                                       /// First array contains the chapter name
        'Chapter 2',                        /// Button name for the chapter
        'First Sortie'                      /// Chapter title
    ],
    [
        'Level 2-1',
        'Introduction',
        'This is a very basic training to get you used to your Device and Jacket'
    ],
    [
        'Level 2-2',
        'I get More spells?',
        'You are given more spells to try out'
    ],
    [
        'Level 2-3',
        'Enemies Get Cool Spells Too?',
        'You are given more spells to try out'
    ]
]

/////////////Enemy Movement Pattern List///////////////

movementPatternArr[0] = [                   /// The first pattern is known at the turret pattern, where the enemy goes straight down at a constant speed. The implied orgin is 0,0 and any path drawing will be starting from there.
    0,                                      /// On rails accepts 0 or 1, 0 means that the enemy is not on rails and will stop following the pattern when out of mana.
    0,                                      /// X coordinates of the first point that the enemy needs to travel to
    1100,                                   /// Y coordinates of the first point that the enemy needs to travel to
    0                                       /// Time that the enemy needs to wait there before moving to the next point. -1 for a turn point, the enemy will not slow down.  Also it will ignore the length of the vector.
]
movementPatternArr[1] = [                   /// Standard move down and hold formation moves down 500 pixels.
    0, 0, 500, 3
]
