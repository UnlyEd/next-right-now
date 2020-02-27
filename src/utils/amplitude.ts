/**
 * Event actions
 *
 * All actions must use action verb (imperative form)
 *
 * DA Usefulness: Avoids using anonymous constants that will likely duplicate each other
 *  Using constants ensures strict usage with a proper definition for the analytics team and the developers
 *  Example: Using both "remove" and "delete" could lead to misunderstanding or errors when configuring charts
 */
export enum AMPLITUDE_ACTIONS {
  CLICK = 'click', // When an element is clicked (mouse) or tapped (screen, mobile)
  SELECT = 'select', // When an element is selected (checkbox, select input, multi choices)
  REMOVE = 'remove', // When an element is removed/delete
  OPEN = 'open', // When an element is opened
  CLOSE = 'close', // When an element is closed
}
