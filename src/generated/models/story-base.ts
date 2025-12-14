

/**
 * A story represents an activity associated with an object in the Asana system.
 */
export interface StoryBase { 
  /**
   * Globally unique identifier of the resource, as a string.
   */
  readonly gid?: string;
  /**
   * The base type of this resource.
   */
  readonly resource_type?: string;
  /**
   * The time at which this resource was created.
   */
  readonly created_at?: string;
  /**
   * The subtype of this resource. Different subtypes retain many of the same fields and behavior, but may render differently in Asana or represent resources with different semantic meaning.
   */
  readonly resource_subtype?: string;
  /**
   * The plain text of the comment to add. Cannot be used with html_text.
   */
  text?: string;
  /**
   * [Opt In](/docs/inputoutput-options). HTML formatted text for a comment. This will not include the name of the creator.
   */
  html_text?: string;
  /**
   * *Conditional*. Whether the story should be pinned on the resource.
   */
  is_pinned?: boolean;
  /**
   * The name of the sticker in this story. `null` if there is no sticker.
   */
  sticker_name?: StoryBase.StickerNameEnum;
}
export namespace StoryBase {
  export const StickerNameEnum = {
    GreenCheckmark: 'green_checkmark',
    PeopleDancing: 'people_dancing',
    DancingUnicorn: 'dancing_unicorn',
    Heart: 'heart',
    PartyPopper: 'party_popper',
    PeopleWavingFlags: 'people_waving_flags',
    SplashingNarwhal: 'splashing_narwhal',
    Trophy: 'trophy',
    YetiRidingUnicorn: 'yeti_riding_unicorn',
    CelebratingPeople: 'celebrating_people',
    DeterminedClimbers: 'determined_climbers',
    PhoenixSpreadingLove: 'phoenix_spreading_love'
  } as const;
  export type StickerNameEnum = typeof StickerNameEnum[keyof typeof StickerNameEnum];
}


