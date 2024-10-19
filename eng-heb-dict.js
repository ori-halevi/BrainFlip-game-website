async function getDictionary() {
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




async function loadEngHebDictToLocalStotrage() {
    const dictionary = await getDictionary(); // קריאת המילון מה-JSON
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
}










// פונקציה לשליפת מפתח וערך אקראיים והסרתם מהמילון
function getRandomKeyAndRemoveFromStorage(storageKey) {
    // שליפת המילון מ-localStorage
    let dictionary = JSON.parse(localStorage.getItem(storageKey));
    
    // אם המילון ריק או לא קיים, החזר null
    if (!dictionary || Object.keys(dictionary).length === 0) {
        // הסרת המילון כולו מ-localStorage אם הוא ריק
        localStorage.removeItem(storageKey);
        return null;
    }

    // קבלת רשימת המפתחות של המילון
    const keys = Object.keys(dictionary);
    
    // בחירת מפתח אקראי
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    // שמירת הערך המתאים למפתח שנבחר
    const value = dictionary[randomKey];

    // הסרת המפתח והערך מהאובייקט
    delete dictionary[randomKey];

    // אם המילון ריק לאחר ההסרה, הסר אותו מ-localStorage
    if (Object.keys(dictionary).length === 0) {
        localStorage.removeItem(storageKey); // הסרה מהאחסון
    } else {
        // אם נותרו פריטים במילון, עדכן אותו מחדש ב-localStorage
        localStorage.setItem(storageKey, JSON.stringify(dictionary));
    }

    // החזרת המפתח והערך שנבחרו
    return { key: randomKey, value: value };
}


