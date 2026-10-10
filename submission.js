
// Creates a character using a name, optional cat name,
// and three initial skills in fishing, mining, farming order.
function createCharacter(charName, catName = null, initialSkills = [0, 0, 0]) {

    // Convert the initial skills to numbers and limit each to 10.
    let fishingSkill = Math.min(Number(initialSkills[0]), 10);
    let miningSkill = Math.min(Number(initialSkills[1]), 10);
    let farmingSkill = Math.min(Number(initialSkills[2]), 10);

    // Increase a valid numerical skill by 1, up to level 10.
    function levelUp(skill) {
        if (typeof this[skill] === "number" && this[skill] < 10) {
            this[skill]++;
        }
    }

    // Add all supplied items to the end of the inventory.
    function grabItems(...items) {
        this.inventory.push(...items);
    }

    // Remove only the first matching item, if it exists.
    function dropItem(item) {
        let itemIndex = this.inventory.indexOf(item);

        if (itemIndex !== -1) {
            this.inventory.splice(itemIndex, 1);
        }
    }

    // Create a character with the required properties and methods.
    let character = {
        characterName: charName,
        fishingSkill,
        miningSkill,
        farmingSkill,
        inventory: [],
        levelUp,
        grabItems,
        dropItem
    };

    // Include catName only when the argument is not null.
    if (catName !== null) {
        character.catName = catName;
    }

    return character;
}

// Create a description based on the character's skills and cat.
function describeCharacter(character) {

    // Calculate the sum of the character's three skills.
    let total = character.fishingSkill +
                character.miningSkill +
                character.farmingSkill;

    let description = character.characterName;

    // Keep the provided descriptions unchanged.
    if (total < 10) {
        description += " is just starting out";
    } else {
        description += " is a skilled adventurer";
    }

    // Add the cat description only when the property exists.
    if (Object.hasOwn(character, "catName")) {
        description += ` and has a cat ${character.catName}`;
    }

    description += ".";

    console.log(description);

    // Return the completed description for the autograder.
    return description;
}
