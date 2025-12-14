

/**
 * The amount of time associated with the allocation, represented as a percentage or number of hours.
 */
export interface AllocationBaseEffort { 
  /**
   * The units used for tracking effort on an allocation, either \"hours\" or \"percent\".
   */
  type?: AllocationBaseEffort.TypeEnum;
  /**
   * The numeric effort value on the allocation.
   */
  value?: number;
}
export namespace AllocationBaseEffort {
  export const TypeEnum = {
    Hours: 'hours',
    Percent: 'percent'
  } as const;
  export type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];
}


