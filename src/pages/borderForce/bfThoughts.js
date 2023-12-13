


const BfThoughts = [
    //Thoughts begin
    //If player's life goes to zero
    { id: 1, saying: 'Finally!', audio: '/assets/donsThoughts/finally.wav', image: '/assets/appImages/borderForceSprite.png' },
    { id: 2, saying: 'My battles are over.', audio: '/assets/donsThoughts/battles.wav', image: '/assets/appImages/whatsDword.png' },
    { id: 3, saying: 'I am glad I lived.', audio: '/assets/donsThoughts/lived.wav', image: '' },
    { id: 4, saying: "it's time to leave.", audio: '/assets/donsThoughts/leave.wav', image: '' },

    //If there are enough invaders to take over the defended nation
    { id: 5, saying: "The nation has fallen.", audio: '/assets/donsThoughts/fallen.wav', image: '' },
    { id: 6, saying: "I wasn't good enough to stop the invasion.", audio: '/assets/donsThoughts/invasion.wav', image: '' },
    { id: 7, saying: "It's time to get out of here.", audio: '/assets/donsThoughts/out.wav', image: '' },

    //Thoughts during the battle
    { id: 8, saying: 'Now', audio: '/assets/donsThoughts/now.wav', image: '' },
    { id: 9, saying: 'this moment', audio: '/assets/donsThoughts/moment.wav', image: '' },
    { id: 10, saying: 'is all we have.', audio: '/assets/donsThoughts/all.wav', image: '' },
    { id: 11, saying: 'The universe can end us at anytime.', audio: '/assets/donsThoughts/universe.wav', image: '' },//10
    { id: 12, saying: 'Humility and Gratitude!', audio: '/assets/donsThoughts/humility.wav', image: '' },
    { id: 13, saying: 'they help us navigate with tranquility,', audio: '/assets/donsThoughts/tranquility.wav', image: '' },
    { id: 14, saying: 'the unpredictable currents of life.', audio: '/assets/donsThoughts/currents.wav', image: '' },
    { id: 15, saying: 'and open our eyes to the beauty of this thorny gift.', audio: '/assets/donsThoughts/gift.wav', image: '' },

    { id: 16, saying: "I've heard someone say", audio: '/assets/donsThoughts/said.wav', image: '' },//15
    { id: 17, saying: 'that war is ugly,', audio: '/assets/donsThoughts/ugly.wav', image: '' },
    { id: 18, saying: 'and there is nothing glamorous about it.', audio: '/assets/donsThoughts/glamorous.wav', image: '' },
    { id: 19, saying: "The conquerors of old would disagree.", audio: '/assets/donsThoughts/conquerors.wav', image: '' },
    { id: 20, saying: "Some would argue that war was the crucible", audio: '/assets/donsThoughts/crucible.wav', image: '' },
    { id: 21, saying: "that pruned the human race of the weak,", audio: '/assets/donsThoughts/weak.wav', image: '' },//20
    { id: 22, saying: "promoted models of strength, character, and resolve,", audio: '/assets/donsThoughts/resolve.wav', image: '' },
    { id: 23, saying: "and transformed the youth into worthy men.", audio: '/assets/donsThoughts/worthy.wav', image: '' },
    { id: 24, saying: "The injuries sustained were but badges of honor", audio: '/assets/donsThoughts/injuries.wav', image: '' },
    { id: 25, saying: "and the lives lost were sacrifices for the ultimate good.", audio: '/assets/donsThoughts/sacrifices.wav', image: '' },
    { id: 26, saying: "They would look with disgust at the entitled, spineless, and crying men of modern times.", audio: '/assets/donsThoughts/cryingMen.wav', image: '' },//25
    { id: 27, saying: "'Good times indeed create weak men,' they would grieve.", audio: '/assets/donsThoughts/grieve.wav', image: '' },
    { id: 28, saying: "But beneath the veneer of glory sought by the warriors of old,", audio: '/assets/donsThoughts/warriors.wav', image: '' },
    { id: 29, saying: "lingered an ugliness that stained the pages of history", audio: '/assets/donsThoughts/history.wav', image: '' },
    { id: 30, saying: "with the blood and tears of its victims:", audio: '/assets/donsThoughts/victims.wav', image: '' },
    { id: 31, saying: "fathers, mothers, children, spouses, and siblings.", audio: '/assets/donsThoughts/fathers.wav', image: '' },//30

    //Sounds
    { id: 32, saying: "1", audio: '/assets/sounds/gunShot.mp3', image: '' }, //31 Gun shot by player
    { id: 33, saying: "2", audio: '/assets/sounds/gunShotLow.mp3', image: '' }, //32 Gun shot by Opposing Humans
    { id: 34, saying: "3", audio: '/assets/sounds/bigExplosion.wav', image: '' }, //33 Explosion of big vehicles
    { id: 35, saying: "4", audio: '/assets/sounds/smExplosionLow.wav', image: '' }, //34 explosion of robots
    { id: 36, saying: "5", audio: '/assets/sounds/smallExplosion.wav', image: '' }, //35 Shattering of bullets
    { id: 37, saying: "6", audio: '/assets/sounds/rocketShoot.wav', image: '' }, //36 Rocket shots
    { id: 38, saying: "7", audio: '/assets/sounds/tankShoot.wav', image: '' }, //37 Tank shots

    { id: 39, saying: "War has taken alot away from us.", audio: '/assets/donsThoughts/alot.wav', image: '' }, //38

];


const DB_NAME = 'borderForceDB';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'thoughts';

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });

            // Explicitly define indexes if needed
            // const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
            // objectStore.createIndex('saying', 'saying', { unique: false });
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(new Error(`Failed to open the database: ${event.target.error}`));
        };
    });
}

// Function to add thoughts to the database and return a promise
function addThoughtsToDatabase(db, thoughts) {
    return Promise.all(thoughts.map(async (thought) => {
        try {
            // Fetch audio and image data as array buffers
            const audioArrayBuffer = await fetch(thought.audio).then(response => response.arrayBuffer());
            // const audioDataURL = await fetch(thought.audio).then(response => response.blob()).then(blob => URL.createObjectURL(blob));
            const imageArrayBuffer = await fetch(thought.image).then(response => response.arrayBuffer());

            // Start a read-write transaction on the thoughts object store
            const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
            const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

            // Check if a thought with the same id already exists
            const getRequest = objectStore.get(thought.id);

            getRequest.onsuccess = (event) => {
                const existingThought = event.target.result;

                if (!existingThought) {
                    // Add the thought to the object store
                    const request = objectStore.add({
                        id: thought.id,
                        saying: thought.saying,
                        // audio: audioDataURL,  // Store audio as data URL
                        audio: audioArrayBuffer,
                        image: imageArrayBuffer,
                    });

                    // Return a promise for the completion of this add operation
                    return new Promise((resolve, reject) => {
                        // Event handler for successful addition
                        request.onsuccess = () => resolve();

                        // Event handler for addition error
                        request.onerror = (event) => reject(new Error(`Failed to add thought to the database: ${event.target.error}`));
                    });
                } else {
                    return Promise.resolve(); // Resolve immediately since the thought already "exists"
                }
            };

            getRequest.onerror = (event) => {
                console.error(`Error checking for existing thought: ${event.target.error}`);
                return Promise.reject(event.target.error);
            };
        } catch (error) {
            // If fetching or storing data fails, reject the promise
            return Promise.reject(error);
        }
    }));
}

function loadThoughtsFromDatabase(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
        const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            const thoughts = event.target.result;

            const thoughtsWithImages = thoughts.map((thought) => {
                const audioBlob = new Blob([thought.audio]);
                thought.audioURL = URL.createObjectURL(audioBlob);
                const imageBlob = new Blob([thought.image], { type: 'image/*' }); // Adjust type based on your image format
                thought.imageURL = URL.createObjectURL(imageBlob);
                return thought;
            });

            resolve(thoughtsWithImages);
        };

        request.onerror = (event) => {
            reject(new Error(`Failed to load thoughts from the database: ${event.target.error}`));
        };
    });
}

function initializeDatabase() {
    return openDatabase()
        .then((db) => {
            const thoughts = BfThoughts.map(({ id, saying, audio, image }) => ({ id, saying, audio, image }));
            return addThoughtsToDatabase(db, thoughts);
        })
        .catch((error) => {
            throw new Error(`Failed to initialize the database: ${error.message}`);
        });
}

const BfThoughtsFromDBPromise = openDatabase()
    .then((db) => initializeDatabase().then(() => loadThoughtsFromDatabase(db)))
    .catch((error) => {
        throw new Error(`Failed to open the database: ${error.message}`);
    });

export default BfThoughtsFromDBPromise;

