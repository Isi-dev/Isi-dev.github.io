const ImagesArray = [
    { id: 1, image: '/assets/appImages/borderForceSprite.png' },
    { id: 2, image: '/assets/appImages/whatsDword.png' },
];





const DB_NAME = 'imagesDatBase';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'images';

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });

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
            const thoughts = ImagesArray.map(({ id, image }) => ({ id, image }));
            return addThoughtsToDatabase(db, thoughts);
        })
        .catch((error) => {
            throw new Error(`Failed to initialize the database: ${error.message}`);
        });
}

const ImagesFromDBPromise = openDatabase()
    .then((db) => initializeDatabase().then(() => loadThoughtsFromDatabase(db)))
    .catch((error) => {
        throw new Error(`Failed to open the database: ${error.message}`);
    });

export default ImagesFromDBPromise;