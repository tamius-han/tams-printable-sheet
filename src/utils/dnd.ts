import { Abilities, Attributes, Item } from './5etypes';

/**
 * Gets ability modifier for a given character
 * @param abilities system.abilities
 * @param ability ability code (str, dex, con, int, wis, cha)
 * @returns
 */
export function getMod(abilities: Abilities, ability: string): number {
  return +(Math.floor((+(abilities as any)[ability].value - 10) / 2) + ((abilities as any)[ability].bonuses.check ?? 0));
};

/**
 * Gets ability modifier with proficincy
 * @param abilities
 * @param ability
 * @param attributes
 * @returns
 */
export function getProfMod(abilities: Abilities, ability: string, attributes: Attributes) {
  return +getMod(abilities, ability) + attributes.prof;
}

/**
 * Converts period code to period name
 * @param x e.g. lr
 * @returns e.g. 'long rest'
 */
export function getPeriodFromCode(x: string) {
  if (x === 'sr') {
    return 'short rest';
  }
  if (x === 'lr') {
    return 'long rest';
  }
  return '?'
}
export function getPeriod(x: Item) {
  return getPeriodFromCode(x.system.uses.per);
}

/**
 * Returns x if x is a number, converts x into corresponding ability or attribute if x is not a number
 * @param x number, @prof, etc.
 * @param abilities
 * @param attributes
 * @returns
 */
export function getValue(x: number | string, abilities: Abilities, attributes: Attributes) {
  if (! isNaN(+x)) {
    return x;
  }
  if (x === '@prof') {
    return +attributes.prof;
  }

  alert('dnd::getValue() — no binding for value of ' + x);
  return 0;
}

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

export function getCarry(abilities: Abilities) {
  return abilities.str.value * 15;
}

export function mapLanguages(languages: string[]) {
  return languages.map((language: string) => {
    switch (language) {
      case 'cant':
        return 'thieves\' cant';
      default:
        return language;
    }
  });
}

/**
 * Returns armor proficiencies. Not all strings have been mapped.
 * @param proficiencies
 * @returns
 */
export function mapArmorProficiencies(proficiencies: string[]) {
  return proficiencies.map((prof: string) => {
    switch (prof) {
      case 'lgt':
        return 'light';
      case 'med':
        return 'medium';
      case 'shl':
        return 'shield';
      case 'hvy':
        return 'heavy';
      default:
        return prof;
    }
  });
}

/**
 * Returns weapon proficiencies. Not all strings have been mapped.
 * @param proficiencies
 * @returns
 */
export function mapWeaponProficiencies(proficiencies: string[]) {
  return proficiencies.map((prof: string) => {
    switch (prof) {
      case 'sim':
        return 'simple';
      case 'mar':
        return 'martial';
      case 'handcrossbow':
        return 'hand crossbow';
      default:
        return prof;
    }
  });
}


/**
 * Returns tool proficiencies. Not all strings have been mapped.
 * @param proficiencies
 * @returns
 */
export function mapToolProficiencies(proficiencies: string[]) {
  return proficiencies.map((prof: string) => {
    switch (prof) {
      case 'thief':
        return 'thieves\' tools';
      default:
        return `${prof}'s tools`;
    }
  });
}
