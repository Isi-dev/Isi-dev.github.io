


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
    { id: 40, saying: "Consider the toll on human lives:", audio: '/assets/donsThoughts/considerToll.wav', image: '' }, 
    { id: 41, saying: "the diversion of resources from education, healthcare, and infrastructure", audio: '/assets/donsThoughts/resourcesEdu.wav', image: '' }, 
    { id: 42, saying: "the destruction of property and ecosystems", audio: '/assets/donsThoughts/desEco.wav', image: '' }, 
    { id: 43, saying: "supply chain disruptions accelerating inflation rates,", audio: '/assets/donsThoughts/supTions.wav', image: '' },
    { id: 44, saying: "and the psychological scars that last for a lifetime.", audio: '/assets/donsThoughts/psyLife.wav', image: '' },

    { id: 45, saying: "A few years ago,", audio: '/assets/donsThoughts/yearsF.wav', image: '' },//44
    { id: 46, saying: "a lad who had lost both parents to war,", audio: '/assets/donsThoughts/warParent.wav', image: '' },
    { id: 47, saying: "asked me if anything can be done to prevent its reoccurrence.", audio: '/assets/donsThoughts/warPrev.wav', image: '' },
    { id: 48, saying: "I just stared at him.", audio: '/assets/donsThoughts/himStair.wav', image: '' },
    { id: 49, saying: "I could not lie, nor increase the weight of his grief.", audio: '/assets/donsThoughts/griefWei.wav', image: '' },

    { id: 50, saying: "There's been without a doubt a reduction in the frequency and duration of war,", audio: '/assets/donsThoughts/freDu.wav', image: '' },
    { id: 51, saying: "but advances in weapons technology has ballooned the death toll and destruction.", audio: '/assets/donsThoughts/deaDest.wav', image: '' },
    { id: 52, saying: "Human aggression, with its innate quest for dominance, ", audio: '/assets/donsThoughts/aggDominance.wav', image: '' },
    { id: 53, saying: "keep flaming the embers of war.", audio: '/assets/donsThoughts/embFlame.wav', image: '' },
    { id: 54, saying: "As long as there exists power hungry entities,", audio: '/assets/donsThoughts/powHungry.wav', image: '' },
    { id: 55, saying: "intolerance of ideological differences,", audio: '/assets/donsThoughts/ideoIntolerance.wav', image: '' },
    { id: 56, saying: "religious fundamentalism,", audio: '/assets/donsThoughts/relFund.wav', image: '' },
    { id: 57, saying: "historical grievances,", audio: '/assets/donsThoughts/histGrief.wav', image: '' },
    { id: 58, saying: "territorial disputes,", audio: '/assets/donsThoughts/territoryDisputes.wav', image: '' },
    { id: 59, saying: "and empire building,", audio: '/assets/donsThoughts/empBuilding.wav', image: '' },
    { id: 60, saying: "there will never be an end to war.", audio: '/assets/donsThoughts/warEnd.wav', image: '' },

    { id: 61, saying: "I generally disapprove of armed conflicts,", audio: '/assets/donsThoughts/armDisapprove.wav', image: '' },
    { id: 62, saying: "particularly wars of conquest.", audio: '/assets/donsThoughts/conqWar.wav', image: '' },
    { id: 63, saying: "But we cannot preserve our freedoms without fighting for it in a world marred by a legacy of subjugation", audio: '/assets/donsThoughts/subjugationMar.wav', image: '' },
    { id: 64, saying: "Just as self-defense is the logical response to various forms of assault,", audio: '/assets/donsThoughts/assaultForms.wav', image: '' },
    { id: 65, saying: "warfare remains the practical answer to tyranny, terrorism, and invasions.", audio: '/assets/donsThoughts/warPrac.wav', image: '' },

    { id: 66, saying: "Nonviolent strategies have been touted as an alternative.", audio: '/assets/donsThoughts/nonVio.wav', image: '' },
    { id: 67, saying: "But they have only been used to bring about social change;", audio: '/assets/donsThoughts/socChange.wav', image: '' },
    { id: 68, saying: "ending discrimination, marginalization, or segregation.", audio: '/assets/donsThoughts/discrim.wav', image: '' },
    { id: 69, saying: "I do endorse their use,", audio: '/assets/donsThoughts/endor.wav', image: '' },
    { id: 70, saying: "as long as a government hasn't turned its guns on the people.", audio: '/assets/donsThoughts/govtG.wav', image: '' },

    { id: 71, saying: "Well, my memory sometimes fails me.", audio: '/assets/donsThoughts/memFa.wav', image: '' },
    { id: 72, saying: "I now recall a research which revealed that the nonviolent campaigns in the last century,", audio: '/assets/donsThoughts/resear.wav', image: '' },
    { id: 73, saying: "were twice more successful at toppling tyrannical regimes,", audio: '/assets/donsThoughts/succTop.wav', image: '' },
    { id: 74, saying: "than violent insurgencies.", audio: '/assets/donsThoughts/vioGen.wav', image: '' },
    { id: 75, saying: "The pacifist would feel vindicated by this finding.", audio: '/assets/donsThoughts/pacVin.wav', image: '' },
    { id: 76, saying: "But except they are certain of rewards in an afterlife,", audio: '/assets/donsThoughts/wardRe.wav', image: '' },
    { id: 77, saying: "embracing their position, or that of the conscientious objector,", audio: '/assets/donsThoughts/posCons.wav', image: '' },
    { id: 78, saying: "will be the doom of a nation,", audio: '/assets/donsThoughts/naDoom.wav', image: '' },
    { id: 79, saying: "in the event of internatiional aggression.", audio: '/assets/donsThoughts/intAggs.wav', image: '' },

    { id: 80, saying: "Having worked as a mercenary since the age of 22,", audio: '/assets/donsThoughts/mercW.wav', image: '' },
    { id: 81, saying: "I have been fortunate to have escaped serious injuries,", audio: '/assets/donsThoughts/escInju.wav', image: '' },
    { id: 82, saying: "while accumulating considerable wealth.", audio: '/assets/donsThoughts/consWeal.wav', image: '' },
    { id: 83, saying: "This war marks a distinct chapter for me.", audio: '/assets/donsThoughts/disChap.wav', image: '' },
    { id: 84, saying: "I volunteered to defend a critical border access point to a country on the brink of collapse", audio: '/assets/donsThoughts/bordCol.wav', image: '' },
    { id: 85, saying: "due to military aggression from an expansionist nation.", audio: '/assets/donsThoughts/milAggEx.wav', image: '' },
    { id: 86, saying: "Ammunition is depleted, and Western support has waned.", audio: '/assets/donsThoughts/ammDep.wav', image: '' },
    { id: 87, saying: "The allies have indeed acted commendably.", audio: '/assets/donsThoughts/commAll.wav', image: '' },
    { id: 88, saying: "They have their own issues to grapple with.", audio: '/assets/donsThoughts/grapIss.wav', image: '' },

    { id: 89, saying: "The guys who defended the outposts outside these walls did a good job.", audio: '/assets/donsThoughts/outpoGuy.wav', image: '' },
    { id: 90, saying: "But it's safe to assume that they are all dead from the swam of kamikaze robots approaching me.", audio: '/assets/donsThoughts/kamikaze.wav', image: '' },
    { id: 91, saying: "With this gun, and a supply of around 10 thousand rounds, ", audio: '/assets/donsThoughts/gunRounds.wav', image: '' },
    { id: 92, saying: "I will do my best to halt the offensive.", audio: '/assets/donsThoughts/offHalt.wav', image: '' },

    //When rounds are exhausted
    { id: 93, saying: "I exhausted my rounds. ", audio: '/assets/donsThoughts/exhRounds.wav', image: '' },
    { id: 94, saying: "I could have been less wasteful.", audio: '/assets/donsThoughts/lesWaste.wav', image: '' },//93

    //Added Sound
    { id: 95, saying: "8", audio: '/assets/sounds/sm2Explosion.wav', image: '' }, //secoond robot explosion

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

