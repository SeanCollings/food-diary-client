export interface IEmoji {
  id: string;
  name: string;
  keywords: string[];
  skins: { unified: string; native: string }[];
}

export interface IFoodEmojis {
  foods: string[];
  emojis: { [key: string]: IEmoji };
}

export const foodEmojis: IFoodEmojis = {
  foods: [
    'grapes',
    'melon',
    'watermelon',
    'tangerine',
    'lemon',
    'banana',
    'pineapple',
    'mango',
    'apple',
    'green_apple',
    'pear',
    'peach',
    'cherries',
    'strawberry',
    'kiwifruit',
    'tomato',
    'coconut',
    'avocado',
    'eggplant',
    'potato',
    'carrot',
    'corn',
    'hot_pepper',
    'cucumber',
    'leafy_green',
    'broccoli',
    'garlic',
    'onion',
    'mushroom',
    'peanuts',
    'chestnut',
    'bread',
    'croissant',
    'baguette_bread',
    'pretzel',
    'bagel',
    'pancakes',
    'waffle',
    'cheese_wedge',
    'meat_on_bone',
    'poultry_leg',
    'cut_of_meat',
    'bacon',
    'hamburger',
    'fries',
    'pizza',
    'hotdog',
    'sandwich',
    'taco',
    'burrito',
    'stuffed_flatbread',
    'falafel',
    'egg',
    'fried_egg',
    'shallow_pan_of_food',
    'stew',
    'bowl_with_spoon',
    'green_salad',
    'popcorn',
    'butter',
    'salt',
    'canned_food',
    'bento',
    'rice_cracker',
    'rice_ball',
    'rice',
    'curry',
    'ramen',
    'spaghetti',
    'sweet_potato',
    'oden',
    'sushi',
    'fried_shrimp',
    'fish_cake',
    'moon_cake',
    'dango',
    'dumpling',
    'fortune_cookie',
    'takeout_box',
    'crab',
    'lobster',
    'shrimp',
    'squid',
    'oyster',
    'icecream',
    'shaved_ice',
    'ice_cream',
    'doughnut',
    'cookie',
    'birthday',
    'cake',
    'cupcake',
    'pie',
    'chocolate_bar',
    'candy',
    'lollipop',
    'custard',
    'honey_pot',
    'baby_bottle',
    'glass_of_milk',
    'coffee',
    'tea',
    'sake',
    'champagne',
    'wine_glass',
    'cocktail',
    'tropical_drink',
    'beer',
    'beers',
    'clinking_glasses',
    'tumbler_glass',
    'cup_with_straw',
    'beverage_box',
    'mate_drink',
    'ice_cube',
    'chopsticks',
    'knife_fork_plate',
    'fork_and_knife',
    'spoon',
    'hocho',
    'amphora',
    'herb',
  ],
  emojis: {
    herb: {
      id: 'herb',
      name: 'Herb',
      keywords: ['herb', 'leaf', 'plant'],
      skins: [{ unified: '1f33f', native: '🌿' }],
    },
    grapes: {
      id: 'grapes',
      name: 'Grapes',
      keywords: ['fruit', 'food', 'wine'],
      skins: [{ unified: '1f347', native: '🍇' }],
    },
    melon: {
      id: 'melon',
      name: 'Melon',
      keywords: ['fruit', 'nature', 'food'],
      skins: [{ unified: '1f348', native: '🍈' }],
    },
    watermelon: {
      id: 'watermelon',
      name: 'Watermelon',
      keywords: ['fruit', 'food', 'picnic', 'summer'],
      skins: [{ unified: '1f349', native: '🍉' }],
    },
    tangerine: {
      id: 'tangerine',
      name: 'Tangerine',
      keywords: ['food', 'fruit', 'nature', 'orange'],
      skins: [{ unified: '1f34a', native: '🍊' }],
    },
    lemon: {
      id: 'lemon',
      name: 'Lemon',
      keywords: ['fruit', 'nature'],
      skins: [{ unified: '1f34b', native: '🍋' }],
    },
    banana: {
      id: 'banana',
      name: 'Banana',
      keywords: ['fruit', 'food', 'monkey'],
      skins: [{ unified: '1f34c', native: '🍌' }],
    },
    pineapple: {
      id: 'pineapple',
      name: 'Pineapple',
      keywords: ['fruit', 'nature', 'food'],
      skins: [{ unified: '1f34d', native: '🍍' }],
    },
    mango: {
      id: 'mango',
      name: 'Mango',
      keywords: ['fruit', 'food', 'tropical'],
      skins: [{ unified: '1f96d', native: '🥭' }],
    },
    apple: {
      id: 'apple',
      name: 'Red Apple',
      keywords: ['fruit', 'mac', 'school'],
      skins: [{ unified: '1f34e', native: '🍎' }],
    },
    green_apple: {
      id: 'green_apple',
      name: 'Green Apple',
      keywords: ['fruit', 'nature'],
      skins: [{ unified: '1f34f', native: '🍏' }],
    },
    pear: {
      id: 'pear',
      name: 'Pear',
      keywords: ['fruit', 'nature', 'food'],
      skins: [{ unified: '1f350', native: '🍐' }],
    },
    peach: {
      id: 'peach',
      name: 'Peach',
      keywords: ['fruit', 'nature', 'food'],
      skins: [{ unified: '1f351', native: '🍑' }],
    },
    cherries: {
      id: 'cherries',
      name: 'Cherries',
      keywords: ['food', 'fruit'],
      skins: [{ unified: '1f352', native: '🍒' }],
    },
    strawberry: {
      id: 'strawberry',
      name: 'Strawberry',
      keywords: ['fruit', 'food', 'nature'],
      skins: [{ unified: '1f353', native: '🍓' }],
    },
    kiwifruit: {
      id: 'kiwifruit',
      name: 'Kiwifruit',
      keywords: ['kiwi', 'fruit', 'food'],
      skins: [{ unified: '1f95d', native: '🥝' }],
    },
    tomato: {
      id: 'tomato',
      name: 'Tomato',
      keywords: ['fruit', 'vegetable', 'nature', 'food'],
      skins: [{ unified: '1f345', native: '🍅' }],
    },
    coconut: {
      id: 'coconut',
      name: 'Coconut',
      keywords: ['fruit', 'nature', 'food', 'palm'],
      skins: [{ unified: '1f965', native: '🥥' }],
    },
    avocado: {
      id: 'avocado',
      name: 'Avocado',
      keywords: ['fruit', 'food'],
      skins: [{ unified: '1f951', native: '🥑' }],
    },
    eggplant: {
      id: 'eggplant',
      name: 'Eggplant',
      keywords: ['vegetable', 'nature', 'food', 'aubergine'],
      skins: [{ unified: '1f346', native: '🍆' }],
    },
    potato: {
      id: 'potato',
      name: 'Potato',
      keywords: ['food', 'tuber', 'vegatable', 'starch'],
      skins: [{ unified: '1f954', native: '🥔' }],
    },
    carrot: {
      id: 'carrot',
      name: 'Carrot',
      keywords: ['vegetable', 'food', 'orange'],
      skins: [{ unified: '1f955', native: '🥕' }],
    },
    corn: {
      id: 'corn',
      name: 'Ear of Corn',
      keywords: ['food', 'vegetable', 'plant', 'maize'],
      skins: [{ unified: '1f33d', native: '🌽' }],
    },
    hot_pepper: {
      id: 'hot_pepper',
      name: 'Hot Pepper',
      keywords: ['food', 'spicy', 'chilli', 'chili'],
      skins: [{ unified: '1f336-fe0f', native: '🌶️' }],
    },
    cucumber: {
      id: 'cucumber',
      name: 'Cucumber',
      keywords: ['fruit', 'food', 'pickle'],
      skins: [{ unified: '1f952', native: '🥒' }],
    },
    leafy_green: {
      id: 'leafy_green',
      name: 'Leafy Green',
      keywords: [
        'food',
        'vegetable',
        'plant',
        'bok',
        'choy',
        'cabbage',
        'kale',
        'lettuce',
      ],
      skins: [{ unified: '1f96c', native: '🥬' }],
    },
    broccoli: {
      id: 'broccoli',
      name: 'Broccoli',
      keywords: ['fruit', 'food', 'vegetable'],
      skins: [{ unified: '1f966', native: '🥦' }],
    },
    garlic: {
      id: 'garlic',
      name: 'Garlic',
      keywords: ['food', 'spice', 'cook'],
      skins: [{ unified: '1f9c4', native: '🧄' }],
    },
    onion: {
      id: 'onion',
      name: 'Onion',
      keywords: ['cook', 'food', 'spice'],
      skins: [{ unified: '1f9c5', native: '🧅' }],
    },
    mushroom: {
      id: 'mushroom',
      name: 'Mushroom',
      keywords: ['plant', 'vegetable'],
      skins: [{ unified: '1f344', native: '🍄' }],
    },
    peanuts: {
      id: 'peanuts',
      name: 'Peanuts',
      keywords: ['food', 'nut'],
      skins: [{ unified: '1f95c', native: '🥜' }],
    },
    chestnut: {
      id: 'chestnut',
      name: 'Chestnut',
      keywords: ['food', 'squirrel'],
      skins: [{ unified: '1f330', native: '🌰' }],
    },
    bread: {
      id: 'bread',
      name: 'Bread',
      keywords: ['food', 'wheat', 'breakfast', 'toast'],
      skins: [{ unified: '1f35e', native: '🍞' }],
    },
    croissant: {
      id: 'croissant',
      name: 'Croissant',
      keywords: ['food', 'bread', 'french'],
      skins: [{ unified: '1f950', native: '🥐' }],
    },
    baguette_bread: {
      id: 'baguette_bread',
      name: 'Baguette Bread',
      keywords: ['food', 'french'],
      skins: [{ unified: '1f956', native: '🥖' }],
    },
    pretzel: {
      id: 'pretzel',
      name: 'Pretzel',
      keywords: ['food', 'bread', 'twisted'],
      skins: [{ unified: '1f968', native: '🥨' }],
    },
    bagel: {
      id: 'bagel',
      name: 'Bagel',
      keywords: ['food', 'bread', 'bakery', 'schmear'],
      skins: [{ unified: '1f96f', native: '🥯' }],
    },
    pancakes: {
      id: 'pancakes',
      name: 'Pancakes',
      keywords: ['food', 'breakfast', 'flapjacks', 'hotcakes'],
      skins: [{ unified: '1f95e', native: '🥞' }],
    },
    waffle: {
      id: 'waffle',
      name: 'Waffle',
      keywords: ['food', 'breakfast'],
      skins: [{ unified: '1f9c7', native: '🧇' }],
    },
    cheese_wedge: {
      id: 'cheese_wedge',
      name: 'Cheese Wedge',
      keywords: ['food', 'chadder'],
      skins: [{ unified: '1f9c0', native: '🧀' }],
    },
    meat_on_bone: {
      id: 'meat_on_bone',
      name: 'Meat on Bone',
      keywords: ['good', 'food', 'drumstick'],
      skins: [{ unified: '1f356', native: '🍖' }],
    },
    poultry_leg: {
      id: 'poultry_leg',
      name: 'Poultry Leg',
      keywords: ['food', 'meat', 'drumstick', 'bird', 'chicken', 'turkey'],
      skins: [{ unified: '1f357', native: '🍗' }],
    },
    cut_of_meat: {
      id: 'cut_of_meat',
      name: 'Cut of Meat',
      keywords: ['food', 'cow', 'chop', 'lambchop', 'porkchop'],
      skins: [{ unified: '1f969', native: '🥩' }],
    },
    bacon: {
      id: 'bacon',
      name: 'Bacon',
      keywords: ['food', 'breakfast', 'pork', 'pig', 'meat'],
      skins: [{ unified: '1f953', native: '🥓' }],
    },
    hamburger: {
      id: 'hamburger',
      name: 'Hamburger',
      keywords: [
        'meat',
        'fast',
        'food',
        'beef',
        'cheeseburger',
        'mcdonalds',
        'burger',
        'king',
      ],
      skins: [{ unified: '1f354', native: '🍔' }],
    },
    fries: {
      id: 'fries',
      name: 'French Fries',
      keywords: ['chips', 'snack', 'fast', 'food'],
      skins: [{ unified: '1f35f', native: '🍟' }],
    },
    pizza: {
      id: 'pizza',
      name: 'Pizza',
      keywords: ['food', 'party'],
      skins: [{ unified: '1f355', native: '🍕' }],
    },
    hotdog: {
      id: 'hotdog',
      name: 'Hot Dog',
      keywords: ['hotdog', 'food', 'frankfurter'],
      skins: [{ unified: '1f32d', native: '🌭' }],
    },
    sandwich: {
      id: 'sandwich',
      name: 'Sandwich',
      keywords: ['food', 'lunch', 'bread'],
      skins: [{ unified: '1f96a', native: '🥪' }],
    },
    taco: {
      id: 'taco',
      name: 'Taco',
      keywords: ['food', 'mexican'],
      skins: [{ unified: '1f32e', native: '🌮' }],
    },
    burrito: {
      id: 'burrito',
      name: 'Burrito',
      keywords: ['food', 'mexican'],
      skins: [{ unified: '1f32f', native: '🌯' }],
    },
    stuffed_flatbread: {
      id: 'stuffed_flatbread',
      name: 'Stuffed Flatbread',
      keywords: ['food', 'gyro'],
      skins: [{ unified: '1f959', native: '🥙' }],
    },
    falafel: {
      id: 'falafel',
      name: 'Falafel',
      keywords: ['food'],
      skins: [{ unified: '1f9c6', native: '🧆' }],
    },
    egg: {
      id: 'egg',
      name: 'Egg',
      keywords: ['food', 'chicken', 'breakfast'],
      skins: [{ unified: '1f95a', native: '🥚' }],
    },
    fried_egg: {
      id: 'fried_egg',
      name: 'Cooking',
      keywords: ['fried', 'egg', 'food', 'breakfast', 'kitchen'],
      skins: [{ unified: '1f373', native: '🍳' }],
    },
    shallow_pan_of_food: {
      id: 'shallow_pan_of_food',
      name: 'Shallow Pan of Food',
      keywords: ['cooking', 'casserole', 'paella'],
      skins: [{ unified: '1f958', native: '🥘' }],
    },
    stew: {
      id: 'stew',
      name: 'Pot of Food',
      keywords: ['stew', 'meat', 'soup'],
      skins: [{ unified: '1f372', native: '🍲' }],
    },
    bowl_with_spoon: {
      id: 'bowl_with_spoon',
      name: 'Bowl with Spoon',
      keywords: ['food', 'breakfast', 'cereal', 'oatmeal', 'porridge'],
      skins: [{ unified: '1f963', native: '🥣' }],
    },
    green_salad: {
      id: 'green_salad',
      name: 'Green Salad',
      keywords: ['food', 'healthy', 'lettuce'],
      skins: [{ unified: '1f957', native: '🥗' }],
    },
    popcorn: {
      id: 'popcorn',
      name: 'Popcorn',
      keywords: ['food', 'movie', 'theater', 'films', 'snack'],
      skins: [{ unified: '1f37f', native: '🍿' }],
    },
    butter: {
      id: 'butter',
      name: 'Butter',
      keywords: ['food', 'cook'],
      skins: [{ unified: '1f9c8', native: '🧈' }],
    },
    salt: {
      id: 'salt',
      name: 'Salt',
      keywords: ['condiment', 'shaker'],
      skins: [{ unified: '1f9c2', native: '🧂' }],
    },
    canned_food: {
      id: 'canned_food',
      name: 'Canned Food',
      keywords: ['soup'],
      skins: [{ unified: '1f96b', native: '🥫' }],
    },
    bento: {
      id: 'bento',
      name: 'Bento Box',
      keywords: ['food', 'japanese'],
      skins: [{ unified: '1f371', native: '🍱' }],
    },
    rice_cracker: {
      id: 'rice_cracker',
      name: 'Rice Cracker',
      keywords: ['food', 'japanese'],
      skins: [{ unified: '1f358', native: '🍘' }],
    },
    rice_ball: {
      id: 'rice_ball',
      name: 'Rice Ball',
      keywords: ['food', 'japanese'],
      skins: [{ unified: '1f359', native: '🍙' }],
    },
    rice: {
      id: 'rice',
      name: 'Cooked Rice',
      keywords: ['food', 'china', 'asian'],
      skins: [{ unified: '1f35a', native: '🍚' }],
    },
    curry: {
      id: 'curry',
      name: 'Curry Rice',
      keywords: ['food', 'spicy', 'hot', 'indian'],
      skins: [{ unified: '1f35b', native: '🍛' }],
    },
    ramen: {
      id: 'ramen',
      name: 'Steaming Bowl',
      keywords: ['ramen', 'food', 'japanese', 'noodle', 'chopsticks'],
      skins: [{ unified: '1f35c', native: '🍜' }],
    },
    spaghetti: {
      id: 'spaghetti',
      name: 'Spaghetti',
      keywords: ['food', 'italian', 'noodle'],
      skins: [{ unified: '1f35d', native: '🍝' }],
    },
    sweet_potato: {
      id: 'sweet_potato',
      name: 'Roasted Sweet Potato',
      keywords: ['food', 'nature'],
      skins: [{ unified: '1f360', native: '🍠' }],
    },
    oden: {
      id: 'oden',
      name: 'Oden',
      keywords: ['food', 'japanese'],
      skins: [{ unified: '1f362', native: '🍢' }],
    },
    sushi: {
      id: 'sushi',
      name: 'Sushi',
      keywords: ['food', 'fish', 'japanese', 'rice'],
      skins: [{ unified: '1f363', native: '🍣' }],
    },
    fried_shrimp: {
      id: 'fried_shrimp',
      name: 'Fried Shrimp',
      keywords: ['food', 'animal', 'appetizer', 'summer'],
      skins: [{ unified: '1f364', native: '🍤' }],
    },
    fish_cake: {
      id: 'fish_cake',
      name: 'Fish Cake with Swirl',
      keywords: [
        'food',
        'japan',
        'sea',
        'beach',
        'narutomaki',
        'pink',
        'kamaboko',
        'surimi',
        'ramen',
      ],
      skins: [{ unified: '1f365', native: '🍥' }],
    },
    moon_cake: {
      id: 'moon_cake',
      name: 'Moon Cake',
      keywords: ['food', 'autumn'],
      skins: [{ unified: '1f96e', native: '🥮' }],
    },
    dango: {
      id: 'dango',
      name: 'Dango',
      keywords: ['food', 'dessert', 'sweet', 'japanese', 'barbecue', 'meat'],
      skins: [{ unified: '1f361', native: '🍡' }],
    },
    dumpling: {
      id: 'dumpling',
      name: 'Dumpling',
      keywords: ['food', 'empanada', 'pierogi', 'potsticker'],
      skins: [{ unified: '1f95f', native: '🥟' }],
    },
    fortune_cookie: {
      id: 'fortune_cookie',
      name: 'Fortune Cookie',
      keywords: ['food', 'prophecy'],
      skins: [{ unified: '1f960', native: '🥠' }],
    },
    takeout_box: {
      id: 'takeout_box',
      name: 'Takeout Box',
      keywords: ['food', 'leftovers'],
      skins: [{ unified: '1f961', native: '🥡' }],
    },
    crab: {
      id: 'crab',
      name: 'Crab',
      keywords: ['animal', 'crustacean'],
      skins: [{ unified: '1f980', native: '🦀' }],
    },
    lobster: {
      id: 'lobster',
      name: 'Lobster',
      keywords: ['animal', 'nature', 'bisque', 'claws', 'seafood'],
      skins: [{ unified: '1f99e', native: '🦞' }],
    },
    shrimp: {
      id: 'shrimp',
      name: 'Shrimp',
      keywords: ['animal', 'ocean', 'nature', 'seafood'],
      skins: [{ unified: '1f990', native: '🦐' }],
    },
    squid: {
      id: 'squid',
      name: 'Squid',
      keywords: ['animal', 'nature', 'ocean', 'sea'],
      skins: [{ unified: '1f991', native: '🦑' }],
    },
    oyster: {
      id: 'oyster',
      name: 'Oyster',
      keywords: ['food'],
      skins: [{ unified: '1f9aa', native: '🦪' }],
    },
    icecream: {
      id: 'icecream',
      name: 'Soft Ice Cream',
      keywords: ['icecream', 'food', 'hot', 'dessert', 'summer'],
      skins: [{ unified: '1f366', native: '🍦' }],
    },
    shaved_ice: {
      id: 'shaved_ice',
      name: 'Shaved Ice',
      keywords: ['hot', 'dessert', 'summer'],
      skins: [{ unified: '1f367', native: '🍧' }],
    },
    ice_cream: {
      id: 'ice_cream',
      name: 'Ice Cream',
      keywords: ['food', 'hot', 'dessert'],
      skins: [{ unified: '1f368', native: '🍨' }],
    },
    doughnut: {
      id: 'doughnut',
      name: 'Doughnut',
      keywords: ['food', 'dessert', 'snack', 'sweet', 'donut'],
      skins: [{ unified: '1f369', native: '🍩' }],
    },
    cookie: {
      id: 'cookie',
      name: 'Cookie',
      keywords: ['food', 'snack', 'oreo', 'chocolate', 'sweet', 'dessert'],
      skins: [{ unified: '1f36a', native: '🍪' }],
    },
    birthday: {
      id: 'birthday',
      name: 'Birthday Cake',
      keywords: ['food', 'dessert'],
      skins: [{ unified: '1f382', native: '🎂' }],
    },
    cake: {
      id: 'cake',
      name: 'Shortcake',
      keywords: ['cake', 'food', 'dessert'],
      skins: [{ unified: '1f370', native: '🍰' }],
    },
    cupcake: {
      id: 'cupcake',
      name: 'Cupcake',
      keywords: ['food', 'dessert', 'bakery', 'sweet'],
      skins: [{ unified: '1f9c1', native: '🧁' }],
    },
    pie: {
      id: 'pie',
      name: 'Pie',
      keywords: ['food', 'dessert', 'pastry'],
      skins: [{ unified: '1f967', native: '🥧' }],
    },
    chocolate_bar: {
      id: 'chocolate_bar',
      name: 'Chocolate Bar',
      keywords: ['food', 'snack', 'dessert', 'sweet'],
      skins: [{ unified: '1f36b', native: '🍫' }],
    },
    candy: {
      id: 'candy',
      name: 'Candy',
      keywords: ['snack', 'dessert', 'sweet', 'lolly'],
      skins: [{ unified: '1f36c', native: '🍬' }],
    },
    lollipop: {
      id: 'lollipop',
      name: 'Lollipop',
      keywords: ['food', 'snack', 'candy', 'sweet'],
      skins: [{ unified: '1f36d', native: '🍭' }],
    },
    custard: {
      id: 'custard',
      name: 'Custard',
      keywords: ['dessert', 'food'],
      skins: [{ unified: '1f36e', native: '🍮' }],
    },
    honey_pot: {
      id: 'honey_pot',
      name: 'Honey Pot',
      keywords: ['bees', 'sweet', 'kitchen'],
      skins: [{ unified: '1f36f', native: '🍯' }],
    },
    baby_bottle: {
      id: 'baby_bottle',
      name: 'Baby Bottle',
      keywords: ['food', 'container', 'milk'],
      skins: [{ unified: '1f37c', native: '🍼' }],
    },
    glass_of_milk: {
      id: 'glass_of_milk',
      name: 'Glass of Milk',
      keywords: ['beverage', 'drink', 'cow'],
      skins: [{ unified: '1f95b', native: '🥛' }],
    },
    coffee: {
      id: 'coffee',
      name: 'Hot Beverage',
      keywords: ['coffee', 'caffeine', 'latte', 'espresso'],
      skins: [{ unified: '2615', native: '☕' }],
    },
    tea: {
      id: 'tea',
      name: 'Teacup Without Handle',
      keywords: ['tea', 'drink', 'bowl', 'breakfast', 'green', 'british'],
      skins: [{ unified: '1f375', native: '🍵' }],
    },
    sake: {
      id: 'sake',
      name: 'Sake',
      keywords: [
        'wine',
        'drink',
        'drunk',
        'beverage',
        'japanese',
        'alcohol',
        'booze',
      ],
      skins: [{ unified: '1f376', native: '🍶' }],
    },
    champagne: {
      id: 'champagne',
      name: 'Bottle with Popping Cork',
      keywords: ['champagne', 'drink', 'wine', 'celebration'],
      skins: [{ unified: '1f37e', native: '🍾' }],
    },
    wine_glass: {
      id: 'wine_glass',
      name: 'Wine Glass',
      keywords: ['drink', 'beverage', 'drunk', 'alcohol', 'booze'],
      skins: [{ unified: '1f377', native: '🍷' }],
    },
    cocktail: {
      id: 'cocktail',
      name: 'Cocktail Glass',
      keywords: ['drink', 'drunk', 'alcohol', 'beverage', 'booze', 'mojito'],
      skins: [{ unified: '1f378', native: '🍸' }],
    },
    tropical_drink: {
      id: 'tropical_drink',
      name: 'Tropical Drink',
      keywords: [
        'beverage',
        'cocktail',
        'summer',
        'beach',
        'alcohol',
        'booze',
        'mojito',
      ],
      skins: [{ unified: '1f379', native: '🍹' }],
    },
    beer: {
      id: 'beer',
      name: 'Beer Mug',
      keywords: [
        'relax',
        'beverage',
        'drink',
        'drunk',
        'party',
        'pub',
        'summer',
        'alcohol',
        'booze',
      ],
      skins: [{ unified: '1f37a', native: '🍺' }],
    },
    beers: {
      id: 'beers',
      name: 'Clinking Beer Mugs',
      keywords: [
        'beers',
        'relax',
        'beverage',
        'drink',
        'drunk',
        'party',
        'pub',
        'summer',
        'alcohol',
        'booze',
      ],
      skins: [{ unified: '1f37b', native: '🍻' }],
    },
    clinking_glasses: {
      id: 'clinking_glasses',
      name: 'Clinking Glasses',
      keywords: [
        'beverage',
        'drink',
        'party',
        'alcohol',
        'celebrate',
        'cheers',
        'wine',
        'champagne',
        'toast',
      ],
      skins: [{ unified: '1f942', native: '🥂' }],
    },
    tumbler_glass: {
      id: 'tumbler_glass',
      name: 'Tumbler Glass',
      keywords: [
        'drink',
        'beverage',
        'drunk',
        'alcohol',
        'liquor',
        'booze',
        'bourbon',
        'scotch',
        'whisky',
        'shot',
      ],
      skins: [{ unified: '1f943', native: '🥃' }],
    },
    cup_with_straw: {
      id: 'cup_with_straw',
      name: 'Cup with Straw',
      keywords: ['drink', 'soda'],
      skins: [{ unified: '1f964', native: '🥤' }],
    },
    beverage_box: {
      id: 'beverage_box',
      name: 'Beverage Box',
      keywords: ['drink'],
      skins: [{ unified: '1f9c3', native: '🧃' }],
    },
    mate_drink: {
      id: 'mate_drink',
      name: 'Mate',
      keywords: ['drink', 'tea', 'beverage'],
      skins: [{ unified: '1f9c9', native: '🧉' }],
    },
    ice_cube: {
      id: 'ice_cube',
      name: 'Ice',
      keywords: ['cube', 'water', 'cold'],
      skins: [{ unified: '1f9ca', native: '🧊' }],
    },
    chopsticks: {
      id: 'chopsticks',
      name: 'Chopsticks',
      keywords: ['food'],
      skins: [{ unified: '1f962', native: '🥢' }],
    },
    knife_fork_plate: {
      id: 'knife_fork_plate',
      name: 'Fork and Knife with Plate',
      keywords: ['food', 'eat', 'meal', 'lunch', 'dinner', 'restaurant'],
      skins: [{ unified: '1f37d-fe0f', native: '🍽️' }],
    },
    fork_and_knife: {
      id: 'fork_and_knife',
      name: 'Fork and Knife',
      keywords: ['cutlery', 'kitchen'],
      skins: [{ unified: '1f374', native: '🍴' }],
    },
    spoon: {
      id: 'spoon',
      name: 'Spoon',
      keywords: ['cutlery', 'kitchen', 'tableware'],
      skins: [{ unified: '1f944', native: '🥄' }],
    },
    hocho: {
      id: 'hocho',
      name: 'Hocho',
      keywords: ['knife', 'kitchen', 'blade', 'cutlery', 'weapon'],
      skins: [{ unified: '1f52a', native: '🔪' }],
    },
    amphora: {
      id: 'amphora',
      name: 'Amphora',
      keywords: [
        'amphora',
        'aquarius',
        'cooking',
        'drink',
        'jug',
        'tool',
        'weapon',
        'zodiac',
      ],
      skins: [{ unified: '1f3fa', native: '🏺' }],
    },
  },
};
