const level1 = new Level(
    [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
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

        new Coin(1700, 50),
        new Coin(1750, 75),
        new Coin(1800, 100),
        new Coin(1850, 125),
    ],
    
);