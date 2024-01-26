


const BfThoughts = [
    //Thoughts begin
    //If player's life goes to zero
    { id: 1, saying: 'Finally!', audio: '/assets/donsThoughts/finally.wav'},
    { id: 2, saying: 'My battles are over.', audio: '/assets/donsThoughts/battles.wav'},
    { id: 3, saying: 'I am glad I lived.', audio: '/assets/donsThoughts/lived.wav'},
    { id: 4, saying: "it's time to leave.", audio: '/assets/donsThoughts/leave.wav' },

    //If there are enough invaders to take over the defended nation
    { id: 5, saying: "The nation has fallen.", audio: '/assets/donsThoughts/fallen.wav' },
    { id: 6, saying: "I wasn't good enough to stop the invasion.", audio: '/assets/donsThoughts/invasion.wav' },
    { id: 7, saying: "It's time to get out of here.", audio: '/assets/donsThoughts/out.wav' },

    //Thoughts during the battle
    { id: 8, saying: 'Now', audio: '/assets/donsThoughts/now.wav' },
    { id: 9, saying: 'this moment', audio: '/assets/donsThoughts/moment.wav' },
    { id: 10, saying: 'is all we have.', audio: '/assets/donsThoughts/all.wav' },
    { id: 11, saying: 'The universe can end us at anytime.', audio: '/assets/donsThoughts/universe.wav' },//10
    { id: 12, saying: 'Humility and Gratitude!', audio: '/assets/donsThoughts/humility.wav' },
    { id: 13, saying: 'they help us navigate with tranquility,', audio: '/assets/donsThoughts/tranquility.wav' },
    { id: 14, saying: 'the unpredictable currents of life.', audio: '/assets/donsThoughts/currents.wav' },
    { id: 15, saying: 'and open our eyes to the beauty of this thorny gift.', audio: '/assets/donsThoughts/gift.wav' },

    { id: 16, saying: "I've heard someone say", audio: '/assets/donsThoughts/said.wav' },//15
    { id: 17, saying: 'that war is ugly,', audio: '/assets/donsThoughts/ugly.wav' },
    { id: 18, saying: 'and there is nothing glamorous about it.', audio: '/assets/donsThoughts/glamorous.wav' },
    { id: 19, saying: "The conquerors of old would disagree.", audio: '/assets/donsThoughts/conquerors.wav' },
    { id: 20, saying: "Some would argue that war was the crucible", audio: '/assets/donsThoughts/crucible.wav' },
    { id: 21, saying: "that pruned the human race of the weak,", audio: '/assets/donsThoughts/weak.wav' },//20
    { id: 22, saying: "promoted models of strength, character, and resolve,", audio: '/assets/donsThoughts/resolve.wav' },
    { id: 23, saying: "and transformed the youth into worthy men.", audio: '/assets/donsThoughts/worthy.wav' },
    { id: 24, saying: "The injuries sustained were but badges of honor", audio: '/assets/donsThoughts/injuries.wav' },
    { id: 25, saying: "and the lives lost were sacrifices for the ultimate good.", audio: '/assets/donsThoughts/sacrifices.wav' },
    { id: 26, saying: "They would look with disgust at the entitled, spineless, and crying men of modern times.", audio: '/assets/donsThoughts/cryingMen.wav' },//25
    { id: 27, saying: "'Good times indeed create weak men,' they would grieve.", audio: '/assets/donsThoughts/grieve.wav' },
    { id: 28, saying: "But beneath the veneer of glory sought by the warriors of old,", audio: '/assets/donsThoughts/warriors.wav' },
    { id: 29, saying: "lingered an ugliness that stained the pages of history", audio: '/assets/donsThoughts/history.wav' },
    { id: 30, saying: "with the blood and tears of its victims:", audio: '/assets/donsThoughts/victims.wav' },
    { id: 31, saying: "fathers, mothers, children, spouses, and siblings.", audio: '/assets/donsThoughts/fathers.wav' },//30

    //Sounds
    { id: 32, saying: "1", audio: '/assets/sounds/gunShot.mp3' }, //31 Gun shot by player
    { id: 33, saying: "2", audio: '/assets/sounds/gunShotLow.mp3' }, //32 Gun shot by Opposing Humans
    { id: 34, saying: "3", audio: '/assets/sounds/bigExplosion.wav' }, //33 Explosion of big vehicles
    { id: 35, saying: "4", audio: '/assets/sounds/smExplosionLow.wav' }, //34 explosion of robots
    { id: 36, saying: "5", audio: '/assets/sounds/smallExplosion.wav' }, //35 Shattering of bullets
    { id: 37, saying: "6", audio: '/assets/sounds/rocketShoot.wav' }, //36 Rocket shots
    { id: 38, saying: "7", audio: '/assets/sounds/tankShoot.wav' }, //37 Tank shots

    { id: 39, saying: "War has taken alot away from us.", audio: '/assets/donsThoughts/alot.wav' }, //38
    { id: 40, saying: "Consider the toll on human lives:", audio: '/assets/donsThoughts/considerToll.wav' }, 
    { id: 41, saying: "the diversion of resources from education, healthcare, and infrastructure", audio: '/assets/donsThoughts/resourcesEdu.wav' }, 
    { id: 42, saying: "the destruction of property and ecosystems", audio: '/assets/donsThoughts/desEco.wav' }, 
    { id: 43, saying: "supply chain disruptions accelerating inflation rates,", audio: '/assets/donsThoughts/supTions.wav' },
    { id: 44, saying: "and the psychological scars that last for a lifetime.", audio: '/assets/donsThoughts/psyLife.wav' },

    { id: 45, saying: "A few years ago,", audio: '/assets/donsThoughts/yearsF.wav' },//44
    { id: 46, saying: "a lad who had lost both parents to war,", audio: '/assets/donsThoughts/warParent.wav' },
    { id: 47, saying: "asked me if anything can be done to prevent its reoccurrence.", audio: '/assets/donsThoughts/warPrev.wav' },
    { id: 48, saying: "I just stared at him.", audio: '/assets/donsThoughts/himStair.wav' },
    { id: 49, saying: "I could not lie, nor increase the weight of his grief.", audio: '/assets/donsThoughts/griefWei.wav' },

    { id: 50, saying: "There's been without a doubt a reduction in the frequency and duration of war,", audio: '/assets/donsThoughts/freDu.wav' },
    { id: 51, saying: "but advances in weapons technology has ballooned the death toll and destruction.", audio: '/assets/donsThoughts/deaDest.wav' },
    { id: 52, saying: "Human aggression, with its innate quest for dominance, ", audio: '/assets/donsThoughts/aggDominance.wav' },
    { id: 53, saying: "keep flaming the embers of war.", audio: '/assets/donsThoughts/embFlame.wav' },
    { id: 54, saying: "As long as there exists power hungry entities,", audio: '/assets/donsThoughts/powHungry.wav' },
    { id: 55, saying: "intolerance of ideological differences,", audio: '/assets/donsThoughts/ideoIntolerance.wav' },
    { id: 56, saying: "religious fundamentalism,", audio: '/assets/donsThoughts/relFund.wav' },
    { id: 57, saying: "historical grievances,", audio: '/assets/donsThoughts/histGrief.wav' },
    { id: 58, saying: "territorial disputes,", audio: '/assets/donsThoughts/territoryDisputes.wav' },
    { id: 59, saying: "and empire building,", audio: '/assets/donsThoughts/empBuilding.wav' },
    { id: 60, saying: "there will never be an end to war.", audio: '/assets/donsThoughts/warEnd.wav' },

    { id: 61, saying: "I generally disapprove of armed conflicts,", audio: '/assets/donsThoughts/armDisapprove.wav' },
    { id: 62, saying: "particularly wars of conquest.", audio: '/assets/donsThoughts/conqWar.wav' },
    { id: 63, saying: "But we cannot preserve our freedoms without fighting for it in a world marred by a legacy of subjugation", audio: '/assets/donsThoughts/subjugationMar.wav' },
    { id: 64, saying: "Just as self-defense is the logical response to various forms of assault,", audio: '/assets/donsThoughts/assaultForms.wav' },
    { id: 65, saying: "warfare remains the practical answer to tyranny, terrorism, and invasions.", audio: '/assets/donsThoughts/warPrac.wav' },

    { id: 66, saying: "Nonviolent strategies have been touted as an alternative.", audio: '/assets/donsThoughts/nonVio.wav' },
    { id: 67, saying: "But they have only been used to bring about social change;", audio: '/assets/donsThoughts/socChange.wav' },
    { id: 68, saying: "ending discrimination, marginalization, or segregation.", audio: '/assets/donsThoughts/discrim.wav' },
    { id: 69, saying: "I do endorse their use,", audio: '/assets/donsThoughts/endor.wav' },
    { id: 70, saying: "as long as a government hasn't turned its guns on the people.", audio: '/assets/donsThoughts/govtG.wav' },

    { id: 71, saying: "Well, my memory sometimes fails me.", audio: '/assets/donsThoughts/memFa.wav' },
    { id: 72, saying: "I now recall a research which revealed that the nonviolent campaigns in the last century,", audio: '/assets/donsThoughts/resear.wav' },
    { id: 73, saying: "were twice more successful at toppling tyrannical regimes,", audio: '/assets/donsThoughts/succTop.wav' },
    { id: 74, saying: "than violent insurgencies.", audio: '/assets/donsThoughts/vioGen.wav' },
    { id: 75, saying: "The pacifist would feel vindicated by this finding.", audio: '/assets/donsThoughts/pacVin.wav' },
    { id: 76, saying: "But except they are certain of rewards in an afterlife,", audio: '/assets/donsThoughts/wardRe.wav' },
    { id: 77, saying: "embracing their position, or that of the conscientious objector,", audio: '/assets/donsThoughts/posCons.wav' },
    { id: 78, saying: "will be the doom of a nation,", audio: '/assets/donsThoughts/naDoom.wav' },
    { id: 79, saying: "in the event of internatiional aggression.", audio: '/assets/donsThoughts/intAggs.wav' },

    { id: 80, saying: "Having worked as a mercenary since the age of 22,", audio: '/assets/donsThoughts/mercW.wav' },
    { id: 81, saying: "I have been fortunate to have escaped serious injuries,", audio: '/assets/donsThoughts/escInju.wav' },
    { id: 82, saying: "while accumulating considerable wealth.", audio: '/assets/donsThoughts/consWeal.wav' },
    { id: 83, saying: "This war marks a distinct chapter for me.", audio: '/assets/donsThoughts/disChap.wav' },
    { id: 84, saying: "I volunteered to defend a critical border access point to a country on the brink of collapse", audio: '/assets/donsThoughts/bordCol.wav' },
    { id: 85, saying: "due to military aggression from an expansionist nation.", audio: '/assets/donsThoughts/milAggEx.wav' },
    { id: 86, saying: "Ammunition is depleted, and Western support has waned.", audio: '/assets/donsThoughts/ammDep.wav' },
    { id: 87, saying: "The allies have indeed acted commendably.", audio: '/assets/donsThoughts/commAll.wav' },
    { id: 88, saying: "They have their own issues to grapple with.", audio: '/assets/donsThoughts/grapIss.wav' },

    { id: 89, saying: "The guys who defended the outposts outside these walls did a good job.", audio: '/assets/donsThoughts/outpoGuy.wav' },
    { id: 90, saying: "But it's safe to assume that they are all dead from the swam of kamikaze robots approaching me.", audio: '/assets/donsThoughts/kamikaze.wav' },
    { id: 91, saying: "With this gun, and a supply of around 10 thousand rounds, ", audio: '/assets/donsThoughts/gunRounds.wav' },
    { id: 92, saying: "I will do my best to halt the offensive.", audio: '/assets/donsThoughts/offHalt.wav' },

    //When rounds are exhausted
    { id: 93, saying: "I exhausted my rounds. ", audio: '/assets/donsThoughts/exhRounds.wav' },
    { id: 94, saying: "I could have been less wasteful.", audio: '/assets/donsThoughts/lesWaste.wav' },//93

    //Added Sound
    { id: 95, saying: "8", audio: '/assets/sounds/sm2Explosion.wav' }, //secoond robot explosion

    

];


const DB_NAME = 'borderForceDatBase';
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
            const thoughts = BfThoughts.map(({ id, saying, audio}) => ({ id, saying, audio}));
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
