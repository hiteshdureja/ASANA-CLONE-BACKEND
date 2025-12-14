

/**
 * A map of the user\'s profile photo in various sizes, or null if no photo is set. Sizes provided are 21, 27, 36, 60, 128, and 1024. All images are in PNG format, except for 1024 (which is in JPEG format).
 */
export interface UserBaseResponseAllOfPhoto { 
  /**
   * PNG image of the user at 21x21 pixels.
   */
  image_21x21?: string;
  /**
   * PNG image of the user at 27x27 pixels.
   */
  image_27x27?: string;
  /**
   * PNG image of the user at 36x36 pixels.
   */
  image_36x36?: string;
  /**
   * PNG image of the user at 60x60 pixels.
   */
  image_60x60?: string;
  /**
   * PNG image of the user at 128x128 pixels.
   */
  image_128x128?: string;
  /**
   * JPEG image of the user at 1024x1024 pixels.
   */
  image_1024x1024?: string;
}

