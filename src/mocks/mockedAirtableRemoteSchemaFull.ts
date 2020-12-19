import size from 'lodash.size';
import { AirtableSchema } from '../types/airtableDataset/AirtableSchema';
import {
  GenericPostConsolidationTransformationValueInputProps,
  GenericPostSanitizationValueInputProps,
} from '../types/airtableDataset/FieldSchema';
import { Customer } from '../types/data/Customer';
import { EducationalProgram } from '../types/data/EducationalProgram';
import { EducationalProgramStep } from '../types/data/EducationalProgramStep';
import { ModTFP } from '../types/data/ModTFP';
import { StudentSolution } from '../types/data/StudentSolution';
import { VISIBILITY_STATUS_PUBLISHED } from '../types/data/VisibilityStatus';
import { GenericRecord } from '../utils/data/record';
import { buildEligibilityCriteria } from '../utils/studentSolution';
import { mockedFullCustomerRef } from './mockedCustomer';

export const mockedAirtableRemoteSchemaFull: AirtableSchema = {
  Asset: {
    // Fetch all assets that either belong to the customer, or belong to no one (fallback assets)
    filterByFormula: `OR({customerOwnerRef} = '${mockedFullCustomerRef}', {customerOwnerRef} = '')`,
    fields: {
      ref: {},
      asset: {},
      width: {},
      height: {},
      title: {},
      alt: {},
      linkUrl: {},
      linkTarget: {},
    },
    isExtendedAttachmentTable: true,
    attachmentFieldName: 'asset',
  },
  Campus: {
    filterByFormula: `AND({customerOwnerRef} = '${mockedFullCustomerRef}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
    fields: {
      ref: {},
      label: {
        isI18n: true,
      },
      educationalProgramSteps: {
        relationship: {
          table: 'EducationalProgramStep',
        },
      },
      place: {
        relationship: {
          table: 'Place',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
    },
  },
  Contact: {
    filterByFormula: `AND({customerOwnerRef} = '${mockedFullCustomerRef}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}', {isUnlyPrivateContact} != TRUE())`,
    fields: {
      ref: {},
      isCustomerStaff: {},
      isMultiOffices: {
        transformations: {
          defaultSanitizedValue: false,
        },
      },
      singleOffice: {
        relationship: {
          table: 'Place',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      multiOffices: {
        relationship: {
          table: 'ContactPlaceInfo',
        },
      },
      firstname: {},
      lastname: {},
      name: {},
      title: {
        isI18n: true,
      },
      email: {},
      languages: {},
      singleOfficeBuildingRoomInfo: {
        isI18n: true,
      },
      singleOfficeDescription: {
        isI18n: true,
      },
      singleOfficePhone: {},
    },
  },
  ContactPlaceInfo: {
    filterByFormula: `{customerOwnerRef} = '${mockedFullCustomerRef}'`,
    fields: {
      ref: {},
      buildingRoomInfo: {
        isI18n: true,
      },
      description: {
        isI18n: true,
      },
      place: {
        relationship: {
          table: 'Place',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      contact: {
        relationship: {
          table: 'Contact',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
    },
  },
  Customer: {
    filterByFormula: `{ref} = '${mockedFullCustomerRef}'`,
    fields: {
      ref: {},
      label: {
        isI18n: true,
      },
      labelShort: {
        isI18n: true,
        transformations: {
          defaultSanitizedValue: (props: GenericPostSanitizationValueInputProps<Customer>): string => {
            const { rawRecord } = props;

            return rawRecord?.fields.labelShort ?? rawRecord?.fields.label;
          },
        },
      },
      previewBaseUrl: {},
      productionBaseUrl: {},
      stackerBaseUrl: {},
      availableLanguages: {},
      theme: {
        relationship: {
          table: 'Theme',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      modTFP: {
        relationship: {
          table: 'ModTFP',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      modChatbot: {
        relationship: {
          table: 'ModChatbot',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      modSLG: {
        relationship: {
          table: 'ModSLG',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      modSLS: {
        relationship: {
          table: 'ModSLS',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      ownedCampuses: {
        relationship: {
          table: 'Campus',
        },
        transformations: {
          renameAs: 'campuses',
        },
      },
      ownedContacts: {
        relationship: {
          table: 'Contact',
        },
        transformations: {
          renameAs: 'contacts',
        },
      },
      ownedEducationalPrograms: {
        relationship: {
          table: 'EducationalProgram',
        },
        transformations: {
          renameAs: 'educationalPrograms',
        },
      },
      ownedPlaces: {
        relationship: {
          table: 'Place',
        },
        transformations: {
          renameAs: 'places',
        },
      },
      ownedStudentSolutions: {
        relationship: {
          table: 'StudentSolution',
        },
        transformations: {
          renameAs: 'studentSolutions',
        },
      },
      ownedStudentSolutionsCategories: {
        relationship: {
          table: 'StudentSolutionsCategory',
        },
        transformations: {
          renameAs: 'studentSolutionsCategories',
        },
      },
    },
  },
  EducationalProgram: {
    filterByFormula: `AND({customerOwnerRef} = '${mockedFullCustomerRef}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
    fields: {
      ref: {},
      label: {
        isI18n: true,
      },
      labelShort: {
        isI18n: true,
        transformations: {
          defaultSanitizedValue: (props: GenericPostSanitizationValueInputProps<EducationalProgram>): string => {
            const { rawRecord } = props;

            return rawRecord.fields.labelShort ?? rawRecord.fields.label;
          },
        },
      },
      educationalProgramSteps: {
        relationship: {
          table: 'EducationalProgramStep',
        },
        transformations: {
          renameAs: 'steps',
        },
      },
    },
  },
  EducationalProgramStep: {
    filterByFormula: `AND({customerOwnerRef} = '${mockedFullCustomerRef}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
    fields: {
      ref: {},
      label: {
        isI18n: true,
      },
      labelShort: {
        isI18n: true,
        transformations: {
          defaultSanitizedValue: (props: GenericPostSanitizationValueInputProps<EducationalProgramStep>): string => {
            const { rawRecord } = props;

            return rawRecord.fields.labelShort ?? rawRecord.fields.label;
          },
        },
      },
      tuitionFeesDescription: {
        isI18n: true,
      },
      tuitionFeesDocuments: {
        isI18n: true,
        relationship: {
          table: 'Asset',
        },
      },
      campuses: {
        relationship: {
          table: 'Campus',
        },
      },
      educationalProgram: {
        relationship: {
          table: 'EducationalProgram',
        },
        transformations: {
          asSingleRecord: true,
          renameAs: 'program',
        },
      },
    },
  },
  ModChatbot: {
    filterByFormula: `{customerOwnerRef} = '${mockedFullCustomerRef}'`,
    fields: {
      isEnabled: {
        transformations: {
          defaultSanitizedValue: false,
        },
      },
      homeTitle: {
        isI18n: true,
      },
      homeSubtitle: {
        isI18n: true,
      },
      homeDescription: {
        isI18n: true,
      },
      homeButtonLabel: {
        isI18n: true,
      },
      dialogIntroduction: {
        isI18n: true,
      },
    },
  },
  ModChatbotFallback: {
    fields: {
      homeTitle: {
        isI18n: true,
      },
      homeSubtitle: {
        isI18n: true,
      },
      homeDescription: {
        isI18n: true,
      },
      homeButtonLabel: {
        isI18n: true,
      },
      dialogIntroduction: {
        isI18n: true,
      },
    },
  },
  ModSLG: {
    filterByFormula: `{customerOwnerRef} = '${mockedFullCustomerRef}'`,
    fields: {
      isEnabled: {
        transformations: {
          defaultSanitizedValue: false,
        },
      },
      homeTitle: {
        isI18n: true,
      },
      homeSubtitle: {
        isI18n: true,
      },
      homeDescription: {
        isI18n: true,
      },
      homeButtonLabel: {
        isI18n: true,
      },
    },
  },
  ModSLGFallback: {
    fields: {
      homeTitle: {
        isI18n: true,
      },
      homeSubtitle: {
        isI18n: true,
      },
      homeDescription: {
        isI18n: true,
      },
      homeButtonLabel: {
        isI18n: true,
      },
    },
  },
  ModSLS: {
    filterByFormula: `{customerOwnerRef} = '${mockedFullCustomerRef}'`,
    fields: {
      isEnabled: {
        transformations: {
          defaultSanitizedValue: false,
        },
      },
      homeTitle: {
        isI18n: true,
      },
      homeSubtitle: {
        isI18n: true,
      },
      homeDescription: {
        isI18n: true,
      },
      homeButtonLabel: {
        isI18n: true,
      },
      borrowingAssistanceTitle: {
        isI18n: true,
      },
      borrowingAssistanceDescription: {
        isI18n: true,
      },
      recommendedInterestRate: {},
      studentSolutionsGroupsType: {},
    },
  },
  ModSLSFallback: {
    fields: {
      homeTitle: {
        isI18n: true,
      },
      homeSubtitle: {
        isI18n: true,
      },
      homeDescription: {
        isI18n: true,
      },
      homeButtonLabel: {
        isI18n: true,
      },
      borrowingAssistanceTitle: {
        isI18n: true,
      },
      borrowingAssistanceDescription: {
        isI18n: true,
      },
      recommendedInterestRate: {},
      studentSolutionsGroupsType: {},
    },
  },
  ModTFP: {
    filterByFormula: `{customerOwnerRef} = '${mockedFullCustomerRef}'`,
    fields: {
      favicon: {
        transformations: {
          asSingleRecord: true,
          // Convert object containing the url into the url itself (object > string)
          transformSanitizedValue: (props: GenericPostSanitizationValueInputProps<ModTFP>): string => props.sanitizedFieldValue?.url || null,
          asAttachment: {
            fields: ['url'], // Only keep the url field, ignore the other fields
          },
        },
      },
      serviceLabel: {
        isI18n: true,
      },
      serviceLogo: {
        isI18n: true,
        relationship: {
          table: 'Asset',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      footerLogo: {
        isI18n: true,
        relationship: {
          table: 'Asset',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      footerCredits: {
        isI18n: true,
      },
      footerCopyright: {
        isI18n: true,
      },
      solutionsIntroduction: {
        isI18n: true,
      },
      termsDescription: {
        isI18n: true,
      },
      privacyDescription: {
        isI18n: true,
      },
      slsReleaseName: {
        transformations: {
          asSingleRecord: true,
        },
      },
    },
  },
  ModTFPFallback: {
    fields: {
      favicon: {
        transformations: {
          asSingleRecord: true,
          asAttachment: {
            fields: ['url'], // Only keep the url field, ignore the other fields
          },
          // Convert object containing the url into the url itself (object > string)
          transformSanitizedValue: (props: GenericPostSanitizationValueInputProps<ModTFP>): string => props.sanitizedFieldValue?.url || null,
        },
      },
      serviceLabel: {
        isI18n: true,
      },
      serviceLogo: {
        isI18n: true,
        relationship: {
          table: 'Asset',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      footerLogo: {
        isI18n: true,
        relationship: {
          table: 'Asset',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      footerCredits: {
        isI18n: true,
      },
      footerCopyright: {
        isI18n: true,
      },
      solutionsIntroduction: {
        isI18n: true,
      },
      termsDescription: {
        isI18n: true,
      },
      privacyDescription: {
        isI18n: true,
      },
      slsReleaseName: {
        transformations: {
          asSingleRecord: true,
        },
      },
    },
  },
  Place: {
    filterByFormula: `{customerOwnerRef} = '${mockedFullCustomerRef}'`,
    fields: {
      ref: {},
      label: {
        isI18n: true,
      },
      address: {},
      campus: {
        relationship: {
          table: 'Campus',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      contactPlaceInfos: {
        relationship: {
          table: 'ContactPlaceInfo',
        },
      },
    },
  },
  StudentSolution: {
    filterByFormula: `AND({customerOwnerRef} = '${mockedFullCustomerRef}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
    fields: {
      ref: {},
      label: {
        isI18n: true,
      },
      logo: {
        isI18n: true,
        relationship: {
          table: 'Asset',
        },
        transformations: {
          asSingleRecord: true,
        },
      },
      version: {
        transformations: {
          defaultSanitizedValue: 1,
        },
      },
      isGenericDuplicate: {},
      genericDuplicateType: {},
      displayPriorityScore: {
        transformations: {
          defaultSanitizedValue: 0,
        },
      },
      isVisibleSLS: {
        transformations: {
          defaultSanitizedValue: false,
        },
      },
      description: {
        isI18n: true,
      },
      benefitsDescription: {
        isI18n: true,
      },
      eligibilityConditionsDescription: {
        isI18n: true,
      },
      loanInterestRate: {},
      loanMaxAmount: {},
      expiresAt: {},
      isExpired: {},
      behaviourWhenExpired: {},
      links: {
        isI18n: true,
        // Links are stored as a long text field, but we want them as an array of strings
        transformations: {
          transformSanitizedValue: (props: GenericPostSanitizationValueInputProps<StudentSolution>): string[] => {
            const { rawRecord } = props;

            // If there is any value, convert it into an array
            // Breakline (\n) is used to split multiple links on Airtable
            if (size(rawRecord?.fields.links) > 0) {
              return (rawRecord?.fields.links as unknown as string)?.split('\n');
            } else {
              return [];
            }
          },
        },
      },
      documents: {
        isI18n: true,
        relationship: {
          table: 'Asset',
        },
      },
      categories: {
        relationship: {
          table: 'StudentSolutionsCategory',
        },
      },
      isContactsAdvancedMatchingModEnabled: {},
      isSolutionsAdvancedMatchingModEnabled: {},
      campusesBasicMatches: {
        relationship: {
          table: 'Campus',
        },
      },
      contactsBasicMatches: {
        relationship: {
          table: 'Contact',
        },
      },
      educationalProgramStepsBasicMatches: {
        relationship: {
          table: 'EducationalProgramStep',
        },
      },
      // XXX eligibilityCriteria/enhancedEligibilityCriteria must be described at last, because they need all relationships to be resolved (steps, campuses, categories)
      eligibilityCriteria: {
        isVirtual: true,
        consolidations: {
          transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): GenericRecord => {
            const { sanitizedDataset, sanitizedRecord: studentSolution } = props;
            return buildEligibilityCriteria(mockedFullCustomerRef, studentSolution as StudentSolution, sanitizedDataset, 'minimal');
          },
        },
      },
      enhancedEligibilityCriteria: {
        isVirtual: true,
        consolidations: {
          transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): GenericRecord => {
            const { sanitizedDataset, sanitizedRecord: studentSolution } = props;
            return buildEligibilityCriteria(mockedFullCustomerRef, studentSolution as StudentSolution, sanitizedDataset, 'all');
          },
        },
      },
    },
  },
  StudentSolutionsCategory: {
    filterByFormula: `AND({customerOwnerRef} = '${mockedFullCustomerRef}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
    fields: {
      ref: {},
      label: {
        isI18n: true,
      },
      displayPriorityScore: {
        transformations: {
          defaultSanitizedValue: 0,
        },
      },
    },
  },
  Theme: { // XXX Theme default values are handled through initCustomerTheme
    filterByFormula: `{customerOwnerRef} = '${mockedFullCustomerRef}'`,
    fields: {
      primaryColor: {},
      primaryColorVariant1: {},
      onPrimaryColor: {},
      secondaryColor: {},
      secondaryColorVariant1: {},
      onSecondaryColor: {},
      backgroundColor: {},
      onBackgroundColor: {},
      surfaceColor: {},
      onSurfaceColor: {},
      errorColor: {},
      onErrorColor: {},
    },
  },
};
