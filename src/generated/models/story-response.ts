import { SectionCompact } from './section-compact';
import { EnumOption } from './enum-option';
import { ReactionSummaryItemCompact } from './reaction-summary-item-compact';
import { TaskCompact } from './task-compact';
import { Preview } from './preview';
import { TagCompact } from './tag-compact';
import { UserCompact } from './user-compact';
import { StoryResponseAllOfTarget } from './story-response-all-of-target';
import { Like } from './like';
import { ProjectCompact } from './project-compact';
import { StoryResponseDates } from './story-response-dates';
import { StoryCompact } from './story-compact';
import { CustomFieldCompact } from './custom-field-compact';


export interface StoryResponse { 
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
  sticker_name?: StoryResponse.StickerNameEnum;
  created_by?: UserCompact;
  readonly type?: StoryResponse.TypeEnum;
  /**
   * *Conditional*. Whether the text of the story can be edited after creation.
   */
  readonly is_editable?: boolean;
  /**
   * *Conditional*. Whether the text of the story has been edited after creation.
   */
  readonly is_edited?: boolean;
  /**
   * *Deprecated - please use likes instead* *Conditional*. True if the story is hearted by the authorized user, false if not.
   */
  readonly hearted?: boolean;
  /**
   * *Deprecated - please use likes instead*  *Conditional*. Array of likes for users who have hearted this story.
   */
  readonly hearts?: Array<Like>;
  /**
   * *Deprecated - please use likes instead*  *Conditional*. The number of users who have hearted this story.
   */
  readonly num_hearts?: number;
  /**
   * *Conditional*. True if the story is liked by the authorized user, false if not.
   */
  readonly liked?: boolean;
  /**
   * *Conditional*. Array of likes for users who have liked this story.
   */
  readonly likes?: Array<Like>;
  /**
   * *Conditional*. The number of users who have liked this story.
   */
  readonly num_likes?: number;
  /**
   * Summary of emoji reactions on this story.
   */
  readonly reaction_summary?: Array<ReactionSummaryItemCompact>;
  /**
   * <p><strong style={{ color: \"#4573D2\" }}>Full object requires scope: </strong><code>attachments:read</code></p>  *Conditional*. A collection of previews to be displayed in the story.  *Note: This property only exists for comment stories.*
   */
  readonly previews?: Array<Preview>;
  /**
   * *Conditional* The previous name of the task before a name change.
   */
  old_name?: string;
  /**
   * *Conditional* The updated name of the task after a name change.
   */
  readonly new_name?: string | null;
  old_dates?: StoryResponseDates;
  new_dates?: StoryResponseDates;
  /**
   * *Conditional*
   */
  readonly old_resource_subtype?: string;
  /**
   * *Conditional*
   */
  readonly new_resource_subtype?: string;
  story?: StoryCompact;
  assignee?: UserCompact;
  follower?: UserCompact;
  old_section?: SectionCompact;
  new_section?: SectionCompact;
  task?: TaskCompact;
  project?: ProjectCompact;
  tag?: TagCompact;
  custom_field?: CustomFieldCompact;
  /**
   * *Conditional* The previous value of a text-type field before it was updated.
   */
  readonly old_text_value?: string;
  /**
   * *Conditional* The new value of a text-type field after it was updated.
   */
  readonly new_text_value?: string;
  /**
   * *Conditional* The previous value of a number-type custom field before the update.
   */
  readonly old_number_value?: number | null;
  /**
   * *Conditional* The new value of a number-type custom field after the update.
   */
  readonly new_number_value?: number;
  old_enum_value?: EnumOption;
  new_enum_value?: EnumOption;
  /**
   * *Conditional*. The old value of a date custom field story.
   */
  readonly old_date_value?: StoryResponseDates;
  /**
   * *Conditional* The new value of a date custom field story.
   */
  readonly new_date_value?: StoryResponseDates;
  /**
   * *Conditional*. The old value of a people custom field story.
   */
  readonly old_people_value?: Array<UserCompact>;
  /**
   * *Conditional*. The new value of a people custom field story.
   */
  readonly new_people_value?: Array<UserCompact>;
  /**
   * *Conditional*. The old value of a multi-enum custom field story.
   */
  readonly old_multi_enum_values?: Array<EnumOption>;
  /**
   * *Conditional*. The new value of a multi-enum custom field story.
   */
  readonly new_multi_enum_values?: Array<EnumOption>;
  /**
   * *Conditional*. The new value of approval status.
   */
  readonly new_approval_status?: string;
  /**
   * *Conditional*. The old value of approval status.
   */
  readonly old_approval_status?: string;
  duplicate_of?: TaskCompact;
  duplicated_from?: TaskCompact;
  dependency?: TaskCompact;
  /**
   * The component of the Asana product the user used to trigger the story.
   */
  readonly source?: StoryResponse.SourceEnum;
  target?: StoryResponseAllOfTarget;
}
export namespace StoryResponse {
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
  export const TypeEnum = {
    Comment: 'comment',
    System: 'system'
  } as const;
  export type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];
  export const SourceEnum = {
    Web: 'web',
    Email: 'email',
    Mobile: 'mobile',
    Api: 'api',
    Unknown: 'unknown'
  } as const;
  export type SourceEnum = typeof SourceEnum[keyof typeof SourceEnum];
}


