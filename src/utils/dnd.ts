import { Item } from './5etypes';

/**
 * Gets ability modifier for a given character
 * @param abilities system.abilities
 * @param ability ability code (str, dex, con, int, wis, cha)
 * @returns
 */
export function getMod(abilities: any, ability: string): number {
  return +(Math.floor((+abilities[ability].value - 10) / 2) + (abilities[ability].bonuses.check ?? 0));
};

/**
 * Gets saving throw modifier for a given character. If character is proficient with saving throws,
 * proficiency will be added to the ability. If not, it will be omitted.
 * @param abilities system.abilities
 * @param ability ability code (str, dex, con, int, wis, cha)
 * @param proficiency proficiency modifier
 * @returns
 */
export function getSave(abilities: any, ability: string, proficiency: number): number {
  return +(getMod(abilities, ability) + (abilities[ability].proficient * proficiency) + (abilities[ability].bonuses.save ?? 0));
}

export function getSkillModifier(abilities: any, skills: any, skill: string, proficiency: number, signed?: boolean) {
  const bonus = +(proficiency * skills[skill].value) +(getMod(abilities, skills[skill].ability));

  if (signed && bonus >= 0) {
    return `+${bonus}`;
  }
  return bonus;
}

export function getSigned(input: any) {
  if (input >= 0) {
    return `+${input}`;
  }
  return input;
}


/**
 * Gets character class and their level in said class. Subclass info NOT included.
 * @param items
 * @returns
 */
export function getCharacterClasses(items: Item[]): {classId: string, levels: number}[] {
  return items.filter((x: any) => x.type === 'class').map((x: any) => ({classId: x.system.identifier, levels: x.system.levels}));
}
