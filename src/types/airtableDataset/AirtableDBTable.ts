/**
 * List of tables available in the Airtable database.
 *
 * Should use the singular form in most cases.
 */
export type AirtableDBTable =
  'Customer'
  | 'Theme'
  | 'Asset'
  | 'ModTFP'
  | 'ModTFPFallback'
  | 'ModChatbot'
  | 'ModChatbotFallback'
  | 'ModSLG'
  | 'ModSLGFallback'
  | 'ModSLS'
  | 'ModSLSFallback'
  | 'Contact'
  | 'Place'
  | 'ContactPlaceInfo'
  | 'Campus'
  | 'EducationalProgram'
  | 'EducationalProgramStep'
  | 'StudentSolution'
  | 'StudentSolutionsCategory';
