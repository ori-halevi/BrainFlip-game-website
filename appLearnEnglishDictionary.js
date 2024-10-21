// This script deal with the learn English dictionary

async function getEngHebDictionary() {
    try {
        const response = await fetch('./eng-heb-dict.json');
        if (!response.ok) {
            throw new Error('Failed to fetch the dictionary');
        }
        const dictionary = await response.json(); // המרת התגובה לאובייקט JSON
        return dictionary; // החזרת המילון
    } catch (error) {
        console.error('Error fetching the dictionary:', error);
        return {}; // במקרה של שגיאה, מחזירה אובייקט ריק
    }
}



async function loadLearnEnglishDictionaryToLocalStotrage() {
    const learnEnglishDictionary = await getEngHebDictionary(); // קריאת המילון מה-JSON
    localStorage.setItem('learn-English-dictionary', JSON.stringify(learnEnglishDictionary));
}



/**
 * Retrieves a random key-value pair from the dictionary stored in localStorage,
 * removes the key-value pair from the dictionary, and updates localStorage.
 * If the dictionary is empty or does not exist, it returns null and removes the dictionary from storage.
 *
 * @returns {Object|null} - An object containing the random key and its value, or null if the dictionary is empty.
 */
function getRandomKeyAndRemoveFromStorage() {
    // Retrieve the dictionary from localStorage
    let dictionary = JSON.parse(localStorage.getItem("learn-English-dictionary"));

    // If the dictionary is empty or doesn't exist, return null
    if (!dictionary || Object.keys(dictionary).length === 0) {
        // Remove the entire dictionary from localStorage if it's empty
        localStorage.removeItem("learn-English-dictionary");
        return null;
    }

    // Get the list of keys from the dictionary
    const keys = Object.keys(dictionary);

    // Choose a random key
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    // Save the value corresponding to the selected key
    const value = dictionary[randomKey];

    // Remove the selected key and value from the object
    delete dictionary[randomKey];

    // If the dictionary is empty after the removal, remove it from localStorage
    if (Object.keys(dictionary).length === 0) {
        localStorage.removeItem("learn-English-dictionary"); // Remove from storage
    } else {
        // If items remain in the dictionary, update it in localStorage
        localStorage.setItem("learn-English-dictionary", JSON.stringify(dictionary));
    }

    // Return the selected key and value
    return { key: randomKey, value: value };
}



