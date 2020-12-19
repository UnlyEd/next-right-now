import find from 'lodash.find';
import { AirtableSchema } from './types/airtableDataset/AirtableSchema';
import {
  GenericPostConsolidationTransformationValueInputProps,
  GenericPostSanitizationValueInputProps,
} from './types/airtableDataset/FieldSchema';
import { Customer } from './types/data/Customer';
import { EducationalProgram } from './types/data/EducationalProgram';
import { EducationalProgramStep } from './types/data/EducationalProgramStep';
import { LabeledLink } from './types/data/LabeledLink';
import { StudentSolution } from './types/data/StudentSolution';
import { VISIBILITY_STATUS_PUBLISHED } from './types/data/VisibilityStatus';
import applyRecordFallback from './utils/airtableDataset/applyRecordFallback';
import { GenericRecord } from './utils/data/record';
import {
  buildEligibilityCriteria,
  sanitizeLinks,
} from './utils/studentSolution';

type Props = {
  fetchAllStudentSolutions?: boolean;
}

/**
 * Airtable database schema used thorough the whole app.
 *
 * This schema describes all fields of our local model, which maps the fields returned by the Airtable API.
 * All tables you want to fetch must be described below.
 *
 * Each table describes the fields that should be fetched.
 * Fields that aren't described will not be fetched.
 *
 * Each field can describe its own data processing.
 *
 * XXX This function can be called from the client and the server.
 *  But, in practice, it's only called by the server.
 *  Hence, all "transformations" function are only called on the server-side.
 *  Be mindful of that when manipulating fields that are computed by Airtable.
 *  Because fields that are computed by Airtable will become "stale" in production.
 *  Time-related fields in particular, are very subject to that:
 *    - e.g: StudentSolution.isExpired will be correct when fetched, but will become stale afterwards, and aren't reliable.
 *  This is a concern for the production environment only, as staging/development use real-time API requests and thus use up-to-date content.
 */
export const getAirtableSchema = (props?: Props): AirtableSchema => {
  const { fetchAllStudentSolutions } = props || {};

  const studentSolutionFilterByFormula = fetchAllStudentSolutions ?
    `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'` :
    `AND({customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}', IF(AND({behaviourWhenExpired} = 'Cacher', {isExpired} = 1), FALSE(), TRUE()))`;

  return {
    Asset: {
      // Fetch all assets that either belong to the customer, or belong to no one (fallback assets)
      filterByFormula: `OR({customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}', {customerOwnerRef} = '')`,
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
      filterByFormula: `AND({customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
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
      filterByFormula: `AND({customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}', {isUnlyPrivateContact} != TRUE())`,
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
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
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
      filterByFormula: `{ref} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
      fields: {
        ref: {},
        label: {
          isI18n: true,
        },
        labelShort: {
          isI18n: true,
          transformations: {
            defaultSanitizedValue: (props: GenericPostSanitizationValueInputProps<Customer>): string => {
              const { sanitizedRecord }: { sanitizedRecord: Customer } = props;

              return sanitizedRecord.labelShort ?? sanitizedRecord.label;
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
          consolidations: {
            transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): GenericRecord => {
              const { sanitizedDataset, sanitizedRecord: customer } = props;
              return applyRecordFallback(customer, 'modTFP', find(sanitizedDataset, { __typename: 'ModTFPFallback' }));
            },
          },
        },
        modChatbot: {
          relationship: {
            table: 'ModChatbot',
          },
          transformations: {
            asSingleRecord: true,
          },
          consolidations: {
            transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): GenericRecord => {
              const { sanitizedDataset, sanitizedRecord: customer } = props;
              return applyRecordFallback(customer, 'modChatbot', find(sanitizedDataset, { __typename: 'ModChatbotFallback' }));
            },
          },
        },
        modSLG: {
          relationship: {
            table: 'ModSLG',
          },
          transformations: {
            asSingleRecord: true,
          },
          consolidations: {
            transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): GenericRecord => {
              const { sanitizedDataset, sanitizedRecord: customer } = props;
              return applyRecordFallback(customer, 'modSLG', find(sanitizedDataset, { __typename: 'ModSLGFallback' }));
            },
          },
        },
        modSLS: {
          relationship: {
            table: 'ModSLS',
          },
          transformations: {
            asSingleRecord: true,
          },
          consolidations: {
            transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): GenericRecord => {
              const { sanitizedDataset, sanitizedRecord: customer } = props;
              return applyRecordFallback(customer, 'modSLS', find(sanitizedDataset, { __typename: 'ModSLSFallback' }));
            },
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
      filterByFormula: `AND({customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
      fields: {
        ref: {},
        label: {
          isI18n: true,
        },
        labelShort: {
          isI18n: true,
          transformations: {
            defaultSanitizedValue: (props: GenericPostSanitizationValueInputProps<EducationalProgram>): string => {
              const { sanitizedRecord } = props;

              return sanitizedRecord.labelShort ?? sanitizedRecord.label;
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
      filterByFormula: `AND({customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
      fields: {
        ref: {},
        label: {
          isI18n: true,
        },
        labelShort: {
          isI18n: true,
          transformations: {
            defaultSanitizedValue: (props: GenericPostSanitizationValueInputProps<EducationalProgramStep>): string => {
              const { sanitizedRecord } = props;

              return sanitizedRecord.labelShort ?? sanitizedRecord.label;
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
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
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
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
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
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
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
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
      fields: {
        favicon: {
          transformations: {
            asSingleRecord: true,
            // Convert object containing the url into the url itself (object > string)
            transformSanitizedValue: (props: GenericPostSanitizationValueInputProps): string => props.sanitizedFieldValue?.url || null,
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
            transformSanitizedValue: (props: GenericPostSanitizationValueInputProps): string => props.sanitizedFieldValue?.url || null,
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
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
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
      filterByFormula: studentSolutionFilterByFormula,
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
        isExpired: {}, // XXX Airtable-computed field, will become stale in production
        behaviourWhenExpired: {},
        links: {
          isI18n: true,
          // Links are stored as a long text field, so we transform them as an array of LabeledLink
          transformations: {
            transformSanitizedValue: (props: GenericPostSanitizationValueInputProps<StudentSolution>): LabeledLink[] => {
              const { sanitizedFieldValue } = props;
              const links: string = sanitizedFieldValue as unknown as string;

              return sanitizeLinks(links);
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
              return buildEligibilityCriteria(process.env.NEXT_PUBLIC_CUSTOMER_REF, studentSolution as StudentSolution, sanitizedDataset, 'minimal');
            },
          },
        },
        enhancedEligibilityCriteria: {
          isVirtual: true,
          consolidations: {
            transformConsolidatedValue: (props: GenericPostConsolidationTransformationValueInputProps): GenericRecord => {
              const { sanitizedDataset, sanitizedRecord: studentSolution } = props;
              return buildEligibilityCriteria(process.env.NEXT_PUBLIC_CUSTOMER_REF, studentSolution as StudentSolution, sanitizedDataset, 'all');
            },
          },
        },
      },
    },
    StudentSolutionsCategory: {
      filterByFormula: `AND({customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}', {visibilityStatus} = '${VISIBILITY_STATUS_PUBLISHED}')`,
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
      filterByFormula: `{customerOwnerRef} = '${process.env.NEXT_PUBLIC_CUSTOMER_REF}'`,
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
};
