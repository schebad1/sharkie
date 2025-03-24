const level1 = new Level(
    [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new PurpleJellyfish(1100, 350),
        new PurpleJellyfish(1225, 200),

        new Pufferfish(2500, 150),
        new PurpleJellyfish(2700, 250),
        new Pufferfish(3000, 100),
        new PurpleJellyfish(3300, 300),
        new Endboss(), 
    ],

    [
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -719),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/2.png', -719),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -719),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -719),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -719),

        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/1.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),

        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 719),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/2.png', 719),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 719),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 719),

        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 719*2),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/1.png', 719*2),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 719*2),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 719*2),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 719*2),

        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 719*3),
        new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/2.png', 719*3),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 719*3),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719*3),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 719*3),

new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 719*4),
new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/1.png', 719*4),
new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 719*4),
new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 719*4),
new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 719*4),

new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 719*5),
new BackgroundObject('img/3. Background/Legacy/Layers/1. Light/2.png', 719*5),
new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 719*5),
new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719*5),
new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 719*5),

    ],

    [
        new Coin(600, 180),
        new Coin(650, 140),
        new Coin(700, 100),
        new Coin(750, 80),
        new Coin(800, 100),
        new Coin(850, 140),
        new Coin(900, 180),

        new Coin(1300, 350),
        new Coin(1350, 350),
        new Coin(1400, 350),

        new Coin(2500, 100),
        new Coin(2600, 150),
        new Coin(2700, 200),
        new Coin(3000, 250),
        new Coin(3500, 300),
        new Coin(3800, 100),
    ],

    [
        new Poison(300, 100),
        new Poison(900, 50),
        new Poison(1200, 250),
        new Poison(1500, 100),

        new Poison(2500, 150),
        new Poison(2900, 200),
        new Poison(3300, 50),
    ],

    [
        new PoisonGround(500, 390),
        new PoisonGround(1800, 390),
        new PoisonGround(1900, 390),

        new PoisonGround(2500, 390),
        new PoisonGround(3500, 390),
    ]
);
