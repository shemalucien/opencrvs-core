/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import { ApolloQueryResult } from '@apollo/client'
import { ValidationInitializer } from '@client/utils/validate'
import { IDynamicValues } from '@opencrvs/client/src/navigation'
import { ICheckboxOption as CheckboxComponentOption } from '@opencrvs/components/lib/Checkbox'
import { THEME_MODE } from '@opencrvs/components/lib/InputField'
import {
  IRadioOption as RadioComponentOption,
  RadioSize
} from '@opencrvs/components/lib/Radio'
import { ISelectOption as SelectComponentOption } from '@opencrvs/components/lib/Select'
import { GQLQuery } from '@opencrvs/gateway/src/graphql/schema.d'
import { MessageDescriptor } from 'react-intl'

import { ICertificate as IDeclarationCertificate } from '@client/declarations'
import { IFormDraft } from '@client/forms/configuration/formDrafts/utils'
import {
  ICustomSelectOption,
  IQuestionConfig
} from '@client/forms/questionConfig'
import { messages } from '@client/i18n/messages/views/formConfig'
import { IOfflineData } from '@client/offline/reducer'
import * as validators from '@opencrvs/client/src/utils/validate'
import { IFont } from '@opencrvs/components/lib/fonts'
import { ISearchLocation } from '@opencrvs/components/lib/LocationSearch'
import * as labels from './mappings/label'
import * as mutations from './mappings/mutation'
import * as graphQLQueries from './mappings/queries'
import * as queries from './mappings/query'
import * as responseTransformers from './mappings/response-transformers'
import * as types from './mappings/type'
import { UserDetails } from '@client/utils/userUtils'

export const TEXT = 'TEXT'
export const TEL = 'TEL'
export const NUMBER = 'NUMBER'
export const BIG_NUMBER = 'BIG_NUMBER'
export const RADIO_GROUP = 'RADIO_GROUP'
export const RADIO_GROUP_WITH_NESTED_FIELDS = 'RADIO_GROUP_WITH_NESTED_FIELDS'
export const INFORMATIVE_RADIO_GROUP = 'INFORMATIVE_RADIO_GROUP'
export const CHECKBOX_GROUP = 'CHECKBOX_GROUP'
export const CHECKBOX = 'CHECKBOX'
export const DATE = 'DATE'
export const DATE_RANGE_PICKER = 'DATE_RANGE_PICKER'
export const TEXTAREA = 'TEXTAREA'
export const SUBSECTION = 'SUBSECTION'
export const FIELD_GROUP_TITLE = 'FIELD_GROUP_TITLE'
export const LIST = 'LIST'
export const PARAGRAPH = 'PARAGRAPH'
export const DOCUMENTS = 'DOCUMENTS'
export const SELECT_WITH_OPTIONS = 'SELECT_WITH_OPTIONS'
export const SELECT_WITH_DYNAMIC_OPTIONS = 'SELECT_WITH_DYNAMIC_OPTIONS'
export const FIELD_WITH_DYNAMIC_DEFINITIONS = 'FIELD_WITH_DYNAMIC_DEFINITIONS'
export const IMAGE_UPLOADER_WITH_OPTIONS = 'IMAGE_UPLOADER_WITH_OPTIONS'
export const DOCUMENT_UPLOADER_WITH_OPTION = 'DOCUMENT_UPLOADER_WITH_OPTION'
export const SIMPLE_DOCUMENT_UPLOADER = 'SIMPLE_DOCUMENT_UPLOADER'
export const WARNING = 'WARNING'
export const LINK = 'LINK'
export const DYNAMIC_LIST = 'DYNAMIC_LIST'
export const FETCH_BUTTON = 'FETCH_BUTTON'
export const LOCATION_SEARCH_INPUT = 'LOCATION_SEARCH_INPUT'
export const NID_VERIFICATION_BUTTON = 'NID_VERIFICATION_BUTTON'

export enum Sort {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SubmissionAction {
  SUBMIT_FOR_REVIEW = 'submit for review',
  APPROVE_DECLARATION = 'approve',
  REGISTER_DECLARATION = 'register',
  CERTIFY_DECLARATION = 'certify declaration',
  REJECT_DECLARATION = 'reject',
  ARCHIVE_DECLARATION = 'archive',
  REQUEST_CORRECTION_DECLARATION = 'request correction',
  ISSUE_DECLARATION = 'issue certificate',
  CERTIFY_AND_ISSUE_DECLARATION = 'certify and issue declaration'
}

export enum DownloadAction {
  LOAD_REVIEW_DECLARATION = 'load declaration data for review',
  LOAD_CERTIFICATE_DECLARATION = 'load declaration data for certificate collection',
  LOAD_REQUESTED_CORRECTION_DECLARATION = 'load declaration data for which is requested correction'
}

export type Action = SubmissionAction | DownloadAction

export interface IFormDataSet {
  _id: string
  fileName: string
  options: ICustomSelectOption[]
  resource?: string
}

export interface IFormConfig {
  questionConfig: IQuestionConfig[]
  formDrafts: IFormDraft[]
  formDataset?: IFormDataSet[]
}

export interface ISelectOption {
  value: SelectComponentOption['value']
  label: MessageDescriptor
}
export interface IRadioOption {
  value: RadioComponentOption['value']
  label: MessageDescriptor
  conditionals?: RadioComponentOption['conditionals']
}
export interface ICheckboxOption {
  value: CheckboxComponentOption['value']
  label: MessageDescriptor
}

export interface IDynamicOptions {
  dependency?: string
  jurisdictionType?: string
  resource?: string
  options?: { [key: string]: ISelectOption[] }
  initialValue?: string
}

export interface IDispatchOptions {
  action: string
  payloadKey: string
}

export interface IDynamicItems {
  dependency: string
  valueMapper: IDynamicValueMapper
  items: { [key: string]: MessageDescriptor[] }
}

export interface IDynamicFormFieldValidators {
  validator: ValidationInitializer
  dependencies: string[]
}

export type IDynamicFormFieldLabelMapper = (
  key: string
) => MessageDescriptor | undefined

export type IDynamicFormFieldHelperTextMapper = (
  key: string
) => MessageDescriptor | undefined

export type IDynamicFormFieldToolTipMapper = (
  key: string
) => MessageDescriptor | undefined

export type IDynamicValueMapper = (key: string) => string

export type IDynamicFieldTypeMapper = (key: string) => string

export interface ISerializedDynamicFormFieldDefinitions {
  label?: {
    dependency: string
    labelMapper: Operation<typeof labels>
  }
  helperText?: {
    dependency: string
    helperTextMapper: Operation<typeof labels>
  }
  tooltip?: {
    dependency: string
    tooltipMapper: Operation<typeof labels>
  }
  type?:
    | IStaticFieldType
    | {
        kind: 'dynamic'
        dependency: string
        typeMapper: Operation<typeof types>
      }
  validate?: Array<{
    dependencies: string[]
    validator: FactoryOperation<typeof validators, IQueryDescriptor>
  }>
}

export interface IDynamicFormFieldDefinitions {
  label?: IDynamicFieldLabel
  helperText?: IDynamicFieldHelperText
  tooltip?: IDynamicFieldTooltip
  type?: IDynamicFieldType | IStaticFieldType
  validate?: IDynamicFormFieldValidators[]
}

export interface IDynamicFieldLabel {
  dependency: string
  labelMapper: IDynamicFormFieldLabelMapper
}

export interface IDynamicFieldHelperText {
  dependency: string
  helperTextMapper: IDynamicFormFieldHelperTextMapper
}

export interface IDynamicFieldTooltip {
  dependency: string
  tooltipMapper: IDynamicFormFieldToolTipMapper
}

export interface IDynamicFieldType {
  kind: 'dynamic'
  dependency: string
  typeMapper: IDynamicFieldTypeMapper
}

export interface IStaticFieldType {
  kind: 'static'
  staticType: string
}

export interface IFieldInput {
  name: string
  valueField: string
  type?: string
}

export type IFormFieldValue =
  | string
  | string[]
  | number
  | boolean
  | Date
  | IDeclarationCertificate
  | IFileValue
  | IAttachmentValue
  | FieldValueArray
  | FieldValueMap
  | IContactPoint
  | IInformant
  | IDateRangePickerValue

interface FieldValueArray extends Array<IFormFieldValue> {}
export interface FieldValueMap {
  [key: string]: IFormFieldValue
}

export interface IQuestionnaireQuestion {
  fieldId: string
  value: string
}
export interface IQuestionnaire {
  data: IQuestionnaireQuestion[]
}

export interface IFileValue {
  optionValues: IFormFieldValue[]
  type: string
  data: string
  fileSize: number
}

export interface IContactPointPhone {
  registrationPhone: string
}

interface IInformantOtherInformantType {
  otherInformantType: string
}
export interface IInformant {
  value: string
  nestedFields: IInformantOtherInformantType
}

export interface IContactPoint {
  value: string
  nestedFields: IContactPointPhone
}

export interface IDateRangePickerValue {
  exact: string | undefined
  rangeStart: string | undefined
  rangeEnd: string | undefined
  isDateRangeActive: boolean | undefined
}

export interface IAttachmentValue {
  name?: string
  type: string
  data: string
  uri?: string
}

export type IFormFieldMutationMapFunction = (
  transFormedData: TransformedData,
  draftData: IFormData,
  sectionId: string,
  fieldDefinition: IFormField,
  nestedFieldDefinition?: IFormField
) => void

export type IFormFieldQueryMapFunction = (
  transFormedData: IFormData,
  queryData: any,
  sectionId: string,
  fieldDefinition: IFormField,
  nestedFieldDefinition?: IFormField,
  offlineData?: IOfflineData
) => void

export type IFormFieldTemplateMapOperation =
  | [string, IFormFieldQueryMapFunction]
  | [string]
/*
 * Takes in an array of function arguments (array, number, string, function)
 * and replaces all functions with the descriptor type
 *
 * So type Array<number | Function | string> would become
 * Array<number | Descriptor | string>
 */
type FunctionParamsToDescriptor<T, Descriptor> =
  // It's an array - recursively call this type for all items
  T extends Array<any>
    ? { [K in keyof T]: FunctionParamsToDescriptor<T[K], Descriptor> }
    : T extends IFormFieldQueryMapFunction | IFormFieldMutationMapFunction // It's a query transformation function - return a query transformation descriptor
    ? Descriptor
    : T // It's a none of the above - return self

interface FactoryOperation<
  OperationMap,
  Descriptor extends IQueryDescriptor | IMutationDescriptor,
  Key extends keyof OperationMap = keyof OperationMap
> {
  operation: Key
  parameters: FunctionParamsToDescriptor<Params<OperationMap[Key]>, Descriptor>
}
interface Operation<
  OperationMap,
  Key extends keyof OperationMap = keyof OperationMap
> {
  operation: Key
}

export type IFormFieldQueryMapDescriptor<
  T extends keyof typeof queries = keyof typeof queries
> = {
  operation: T
  parameters: FunctionParamsToDescriptor<
    Params<typeof queries[T]>,
    IQueryDescriptor
  >
}

export type IFormFieldMapping = {
  mutation?: IFormFieldMutationMapFunction
  query?: IFormFieldQueryMapFunction
  template?: IFormFieldTemplateMapOperation
}

/*
 * These types are here only for replacing mapping types to
 * serializable ones in IFormField. The default Omit type doesn't work
 * with type unions :(
 */

type UnionKeys<T> = T extends any ? keyof T : never
type UnionPick<T, K extends any> = T extends any
  ? Pick<T, Extract<K, keyof T>>
  : never

type UnionOmit<T, K extends UnionKeys<T>> = UnionPick<
  T,
  Exclude<UnionKeys<T>, K>
>

type SerializedFormFieldWithDynamicDefinitions = UnionOmit<
  IFormFieldWithDynamicDefinitions,
  'dynamicDefinitions'
> & {
  dynamicDefinitions: ISerializedDynamicFormFieldDefinitions
}
type SerializedSelectFormFieldWithOptions = Omit<
  ISelectFormFieldWithOptions,
  'options'
> & {
  options: ISelectOption[] | { resource: string }
}

type ILoaderButtonWithSerializedQueryMap = Omit<ILoaderButton, 'queryMap'> & {
  queryMap: ISerializedQueryMap
}

type SerializedRadioGroupWithNestedFields = Omit<
  IRadioGroupWithNestedFieldsFormField,
  'nestedFields'
> & {
  nestedFields: { [key: string]: SerializedFormField[] }
}

export type SerializedFormField = UnionOmit<
  | Exclude<
      IFormField,
      | IFormFieldWithDynamicDefinitions
      | ILoaderButton
      | ISelectFormFieldWithOptions
      | IRadioGroupWithNestedFieldsFormField
    >
  | SerializedSelectFormFieldWithOptions
  | SerializedFormFieldWithDynamicDefinitions
  | ILoaderButtonWithSerializedQueryMap
  | SerializedRadioGroupWithNestedFields,
  'validate' | 'mapping'
> & {
  validate: IValidatorDescriptor[]
  mapping?: {
    mutation?: IMutationDescriptor
    query?: IQueryDescriptor
    template?: ITemplateDescriptor
  }
}
export interface IAttachment {
  data: string
  uri?: string
  optionValues: string[]
  type: string
  title?: string
  description?: string
}

export enum REVIEW_OVERRIDE_POSITION {
  BEFORE = 'before',
  AFTER = 'after'
}

export interface IFormFieldBase {
  name: string
  type: IFormField['type']
  label: MessageDescriptor
  helperText?: MessageDescriptor
  tooltip?: MessageDescriptor
  validate: validators.Validation[]
  required?: boolean
  prefix?: string
  postfix?: string
  disabled?: boolean
  enabled?: string
  custom?: boolean
  initialValue?: IFormFieldValue
  initialValueKey?: string
  extraValue?: IFormFieldValue
  conditionals?: IConditional[]
  description?: MessageDescriptor
  placeholder?: MessageDescriptor
  mapping?: IFormFieldMapping
  hideAsterisk?: boolean
  hideHeader?: boolean
  mode?: THEME_MODE
  hidden?: boolean
  previewGroup?: string
  nestedFields?: { [key: string]: IFormField[] }
  hideValueInPreview?: boolean
  // This flag will only remove the change link from preview/review screen
  // Default false
  readonly?: boolean
  hideInPreview?: boolean
  ignoreNestedFieldWrappingInPreview?: boolean
  reviewOverrides?: {
    residingSection: string
    reference: {
      sectionID: string
      groupID: string
      fieldName: string
    }
    position?: REVIEW_OVERRIDE_POSITION
    labelAs?: MessageDescriptor
    conditionals?: IConditional[]
  }
  ignoreFieldLabelOnErrorMessage?: boolean
  ignoreBottomMargin?: boolean
  customisable?: boolean
  customQuesstionMappingId?: string
  ignoreMediaQuery?: boolean
}

export interface ISelectFormFieldWithOptions extends IFormFieldBase {
  type: typeof SELECT_WITH_OPTIONS
  options: ISelectOption[]
}
export interface ISelectFormFieldWithDynamicOptions extends IFormFieldBase {
  type: typeof SELECT_WITH_DYNAMIC_OPTIONS
  dynamicOptions: IDynamicOptions
}

export interface IFormFieldWithDynamicDefinitions extends IFormFieldBase {
  type: typeof FIELD_WITH_DYNAMIC_DEFINITIONS
  dynamicDefinitions: IDynamicFormFieldDefinitions
}

export type INestedInputFields = {
  [key: string]: IFormField[]
}

export enum FLEX_DIRECTION {
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
  COLUMN = 'column',
  COLUMN_REVERSE = 'column-reverse',
  INITIAL = 'initial',
  INHERIT = 'inherit'
}

export interface IRadioGroupFormField extends IFormFieldBase {
  type: typeof RADIO_GROUP
  options: IRadioOption[]
  size?: RadioSize
  notice?: MessageDescriptor
  flexDirection?: FLEX_DIRECTION
}

export interface IRadioGroupWithNestedFieldsFormField
  extends Omit<IRadioGroupFormField, 'type'> {
  type: typeof RADIO_GROUP_WITH_NESTED_FIELDS
  nestedFields: INestedInputFields
}

export interface IInformativeRadioGroupFormField extends IFormFieldBase {
  type: typeof INFORMATIVE_RADIO_GROUP
  information: IFormSectionData
  dynamicInformationRetriever?: (obj: any) => IFormSectionData
  options: IRadioOption[]
}

export interface ITextFormField extends IFormFieldBase {
  type: typeof TEXT
  maxLength?: number
  dependency?: string
}

export interface ITelFormField extends IFormFieldBase {
  type: typeof TEL
  isSmallSized?: boolean
}
export interface INumberFormField extends IFormFieldBase {
  type: typeof NUMBER
  step?: number
  max?: number
  inputFieldWidth?: string
}
export interface IBigNumberFormField extends IFormFieldBase {
  type: typeof BIG_NUMBER
  step?: number
}
export interface ICheckboxGroupFormField extends IFormFieldBase {
  type: typeof CHECKBOX_GROUP
  options: ICheckboxOption[]
}
export interface ICheckboxFormField extends IFormFieldBase {
  type: typeof CHECKBOX
  checkedValue?: 'true' | 'false' | boolean
  uncheckedValue?: 'true' | 'false' | boolean
}
export interface IDateFormField extends IFormFieldBase {
  type: typeof DATE
  notice?: MessageDescriptor
  ignorePlaceHolder?: boolean
}
export interface IDateRangePickerFormField extends IFormFieldBase {
  type: typeof DATE_RANGE_PICKER
  notice?: MessageDescriptor
  ignorePlaceHolder?: boolean
}

export interface ITextareaFormField extends IFormFieldBase {
  type: typeof TEXTAREA
  maxLength?: number
}
export interface ISubsectionFormField extends IFormFieldBase {
  type: typeof SUBSECTION
}
export interface IFieldGroupTitleField extends IFormFieldBase {
  type: typeof FIELD_GROUP_TITLE
}
export interface IDocumentsFormField extends IFormFieldBase {
  type: typeof DOCUMENTS
}
export interface IListFormField extends IFormFieldBase {
  type: typeof LIST
  items: MessageDescriptor[]
}

export interface IDynamicListFormField extends IFormFieldBase {
  type: typeof DYNAMIC_LIST
  dynamicItems: IDynamicItems
}
export interface IParagraphFormField extends IFormFieldBase {
  type: typeof PARAGRAPH
  fontVariant?: string
}
export interface IImageUploaderWithOptionsFormField extends IFormFieldBase {
  type: typeof IMAGE_UPLOADER_WITH_OPTIONS
  optionSection: IFormSection
}
export interface IDocumentUploaderWithOptionsFormField extends IFormFieldBase {
  type: typeof DOCUMENT_UPLOADER_WITH_OPTION
  options: ISelectOption[]
  hideOnEmptyOption?: boolean
  splitView?: boolean
}
export interface ISimpleDocumentUploaderFormField extends IFormFieldBase {
  type: typeof SIMPLE_DOCUMENT_UPLOADER
  allowedDocType?: string[]
}

export interface ILocationSearchInputFormField extends IFormFieldBase {
  type: typeof LOCATION_SEARCH_INPUT
  searchableResource: Array<
    Extract<keyof IOfflineData, 'facilities' | 'locations' | 'offices'>
  >
  locationList?: ISearchLocation[]
  searchableType: string[]
  dispatchOptions?: IDispatchOptions
  dynamicOptions?: IDynamicOptions
}

export interface IWarningField extends IFormFieldBase {
  type: typeof WARNING
}

export interface ILink extends IFormFieldBase {
  type: typeof LINK
}

export interface IQuery {
  query: any
  inputs: IFieldInput[]
  variables?: IDynamicValues
  modalInfoText: MessageDescriptor
  errorText: MessageDescriptor
  networkErrorText: MessageDescriptor
  responseTransformer: (response: ApolloQueryResult<GQLQuery>) => void
}

export interface ISerializedQueryMap {
  [key: string]: Omit<IQuery, 'responseTransformer' | 'query'> & {
    responseTransformer: Operation<typeof responseTransformers>
    query: Operation<typeof graphQLQueries>
  }
}
export interface IQueryMap {
  [key: string]: IQuery
}
export interface ILoaderButton extends IFormFieldBase {
  type: typeof FETCH_BUTTON
  queryMap: IQueryMap
  queryData?: IQuery
  querySelectorInput: IFieldInput
  onFetch?: (response: any) => void
  modalTitle: MessageDescriptor
  successTitle: MessageDescriptor
  errorTitle: MessageDescriptor
}

export interface INidVerificationButton extends IFormFieldBase {
  type: typeof NID_VERIFICATION_BUTTON
  labelForVerified: MessageDescriptor
  labelForUnverified: MessageDescriptor
  labelForOffline: MessageDescriptor
}

export type IFormField =
  | ITextFormField
  | ITelFormField
  | INumberFormField
  | IBigNumberFormField
  | ISelectFormFieldWithOptions
  | ISelectFormFieldWithDynamicOptions
  | IFormFieldWithDynamicDefinitions
  | IRadioGroupFormField
  | IRadioGroupWithNestedFieldsFormField
  | IInformativeRadioGroupFormField
  | ICheckboxGroupFormField
  | ICheckboxFormField
  | IDateFormField
  | ITextareaFormField
  | ISubsectionFormField
  | IFieldGroupTitleField
  | IDocumentsFormField
  | IListFormField
  | IParagraphFormField
  | IImageUploaderWithOptionsFormField
  | IDocumentUploaderWithOptionsFormField
  | IWarningField
  | ILink
  | IDynamicListFormField
  | ILoaderButton
  | ISimpleDocumentUploaderFormField
  | ILocationSearchInputFormField
  | IDateRangePickerFormField
  | INidVerificationButton

export interface IPreviewGroup {
  id: string
  label: MessageDescriptor
  fieldToRedirect?: string
  delimiter?: string
  required?: boolean
  initialValue?: string
}

export interface IDynamicFormField
  extends ISelectFormFieldWithDynamicOptions,
    IFormFieldWithDynamicDefinitions {
  type: any
}

export interface IConditional {
  description?: string
  action: string
  expression: string
}

export interface IConditionals {
  informantType: IConditional
  iDType: IConditional
  isOfficePreSelected: IConditional
  fathersDetailsExist: IConditional
  primaryAddressSameAsOtherPrimary: IConditional
  countryPrimary: IConditional
  statePrimary: IConditional
  districtPrimary: IConditional
  addressLine4Primary: IConditional
  addressLine3Primary: IConditional
  country: IConditional
  state: IConditional
  district: IConditional
  addressLine4: IConditional
  addressLine3: IConditional
  uploadDocForWhom: IConditional
  motherCollectsCertificate: IConditional
  fatherCollectsCertificate: IConditional
  informantCollectsCertificate: IConditional
  otherPersonCollectsCertificate: IConditional
  birthCertificateCollectorNotVerified: IConditional
  deathCertificateCollectorNotVerified: IConditional
  placeOfBirthHospital: IConditional
  placeOfDeathTypeHeathInstitue: IConditional
  otherBirthEventLocation: IConditional
  isNotCityLocation: IConditional
  isCityLocation: IConditional
  isDefaultCountry: IConditional
  isNotCityLocationPrimary: IConditional
  isDefaultCountryPrimary: IConditional
  isCityLocationPrimary: IConditional
  informantPrimaryAddressSameAsCurrent: IConditional
  iDAvailable: IConditional
  deathPlaceOther: IConditional
  deathPlaceAtPrivateHome: IConditional
  deathPlaceAtOtherLocation: IConditional
  causeOfDeathEstablished: IConditional
  isMarried: IConditional
  identifierIDSelected: IConditional
  fatherContactDetailsRequired: IConditional
  withInTargetDays: IConditional
  between46daysTo5yrs: IConditional
  after5yrs: IConditional
  deceasedNationIdSelected: IConditional
  isRegistrarRoleSelected: IConditional
  certCollectorOther: IConditional
  userAuditReasonSpecified: IConditional
  userAuditReasonOther: IConditional
  isAuditActionDeactivate: IConditional
  isAuditActionReactivate: IConditional
}

export type ViewType = 'form' | 'preview' | 'review' | 'hidden'

type Params<Fn> = Fn extends (...args: infer A) => void ? A : never

type FilterType<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}

// Validation

type ValidationFactoryOperationKeys = FilterType<
  typeof validators,
  (...args: any[]) => (...args: any[]) => any
>[keyof typeof validators]

type ValidationDefaultOperationKeys = Exclude<
  keyof typeof validators,
  ValidationFactoryOperationKeys
>

export type ValidationFactoryOperation<
  T extends ValidationFactoryOperationKeys = ValidationFactoryOperationKeys
> = {
  operation: T
  parameters: Params<typeof validators[T]>
}

type ValidationDefaultOperation<
  T extends ValidationDefaultOperationKeys = ValidationDefaultOperationKeys
> = {
  operation: T
}

export type IValidatorDescriptor =
  | ValidationFactoryOperation
  | ValidationDefaultOperation

// Queries

type QueryFactoryOperationKeys = FilterType<
  typeof queries,
  (...args: any[]) => (...args: any[]) => any
>[keyof typeof queries]

type QueryDefaultOperationKeys = Exclude<
  keyof typeof queries,
  QueryFactoryOperationKeys
>

export type QueryFactoryOperation<
  T extends QueryFactoryOperationKeys = QueryFactoryOperationKeys
> = {
  operation: T
  parameters: FunctionParamsToDescriptor<
    Params<typeof queries[T]>,
    IQueryDescriptor
  >
}

type QueryDefaultOperation<
  T extends QueryDefaultOperationKeys = QueryDefaultOperationKeys
> = {
  operation: T
}

export type IQueryDescriptor = QueryFactoryOperation | QueryDefaultOperation

type ISimpleTemplateDescriptor = { fieldName: string }
export type IQueryTemplateDescriptor = ISimpleTemplateDescriptor &
  IQueryDescriptor
export type ITemplateDescriptor =
  | IQueryTemplateDescriptor
  | ISimpleTemplateDescriptor
// Mutations

type MutationFactoryOperationKeys = FilterType<
  typeof mutations,
  (...args: any[]) => (...args: any[]) => any
>[keyof typeof mutations]

type MutationDefaultOperationKeys = Exclude<
  keyof typeof mutations,
  MutationFactoryOperationKeys
>

export type MutationFactoryOperation<
  T extends MutationFactoryOperationKeys = MutationFactoryOperationKeys
> = {
  operation: T
  parameters: FunctionParamsToDescriptor<
    Params<typeof mutations[T]>,
    IMutationDescriptor
  >
}

type MutationDefaultOperation<
  T extends MutationDefaultOperationKeys = MutationDefaultOperationKeys
> = {
  operation: T
}

export type IMutationDescriptor =
  | MutationFactoryOperation
  | MutationDefaultOperation

// Initial type as it's always used as an object.
// @todo should be stricter than this
export type TransformedData = { [key: string]: any }

export type IFormSectionMapping = {
  mutation?: IFormSectionMutationMapFunction
  query?: IFormSectionQueryMapFunction
  template?: [string, IFormSectionQueryMapFunction][]
}

export type IFormSectionMutationMapFunction = (
  transFormedData: TransformedData,
  draftData: IFormData,
  sectionId: string
) => void

export type IFormSectionQueryMapFunction = (
  transFormedData: IFormData,
  queryData: any,
  sectionId: string,
  targetSectionId?: string, // used for template query mappings
  targetFieldName?: string, // used for template query mappings
  offlineData?: IOfflineData, // used for template offline mappings
  userDetails?: UserDetails // user for template user mappings
) => void

export enum BirthSection {
  Registration = 'registration',
  Child = 'child',
  Mother = 'mother',
  Father = 'father',
  Informant = 'informant',
  Documents = 'documents',
  Preview = 'preview'
}

export enum DeathSection {
  Registration = 'registration',
  Deceased = 'deceased',
  Event = 'deathEvent',
  Informant = 'informant',
  DeathDocuments = 'documents',
  Preview = 'preview'
}

export enum MarriageSection {
  Registration = 'registration',
  Groom = 'groom',
  Bride = 'bride',
  Event = 'marriageEvent',
  WitnessOne = 'witnessOne',
  WitnessTwo = 'witnessTwo',
  Documents = 'documents',
  Preview = 'preview'
}

export type WizardSection = BirthSection | DeathSection | 'settings'

export enum UserSection {
  User = 'user',
  Preview = 'preview'
}

export enum AdvancedSearchSection {
  Birth = 'birth',
  Death = 'death'
}

export enum CertificateSection {
  Collector = 'collector',
  CollectCertificate = 'collectCertificate',
  CollectDeathCertificate = 'collectDeathCertificate'
}

export enum CorrectionSection {
  Corrector = 'corrector',
  Reason = 'reason',
  SupportingDocuments = 'supportingDocuments',
  CorrectionFeesPayment = 'currectionFeesPayment',
  Summary = 'summary'
}

export enum PaymentSection {
  Payment = 'payment'
}

export enum ReviewSection {
  Review = 'review'
}

export enum InformantSection {
  Registration = 'registration'
}

export type Section =
  | ReviewSection
  | PaymentSection
  | BirthSection
  | DeathSection
  | UserSection
  | CertificateSection
  | CorrectionSection
  | InformantSection
  | MarriageSection

export interface IFormSection {
  id: Section
  viewType: ViewType
  name: MessageDescriptor
  title: MessageDescriptor
  groups: IFormSectionGroup[]
  disabled?: boolean
  optional?: boolean
  notice?: MessageDescriptor
  mapping?: IFormSectionMapping
  hasDocumentSection?: boolean
}

export type ISerializedFormSectionGroup = Omit<IFormSectionGroup, 'fields'> & {
  fields: SerializedFormField[]
}

export type ISerializedFormSection = Omit<
  IFormSection,
  'groups' | 'mapping'
> & {
  groups: ISerializedFormSectionGroup[]
  mapping?: {
    mutation?: IMutationDescriptor
    query?: IQueryDescriptor
    template?: (IQueryDescriptor & { fieldName: string })[]
  }
}

export interface IFormSectionGroup {
  id: string
  title?: MessageDescriptor
  fields: IFormField[]
  previewGroups?: IPreviewGroup[]
  disabled?: boolean
  ignoreSingleFieldView?: boolean
  conditionals?: IConditional[]
  error?: MessageDescriptor
  preventContinueIfError?: boolean
  showExitButtonOnly?: boolean
}

export interface IForm {
  sections: IFormSection[]
}
export interface ISerializedForm {
  sections: ISerializedFormSection[]
}

export interface Ii18nSelectOption {
  value: string
  label: string
}

export interface Ii18nFormFieldBase {
  name: string
  type: string
  label: string
  helperText?: string
  tooltip?: string
  description?: string
  validate: validators.Validation[]
  required?: boolean
  prefix?: string
  initialValue?: IFormFieldValue
  extraValue?: IFormFieldValue
  postfix?: string
  disabled?: boolean
  conditionals?: IConditional[]
  hideAsterisk?: boolean
  hideHeader?: boolean
  mode?: THEME_MODE
  placeholder?: string
  hidden?: boolean
  nestedFields?: { [key: string]: Ii18nFormField[] }
  ignoreBottomMargin?: boolean
  ignoreMediaQuery?: boolean
}

export interface Ii18nSelectFormField extends Ii18nFormFieldBase {
  type: typeof SELECT_WITH_OPTIONS
  options: SelectComponentOption[]
}

export type Ii18nNestedInputFields = {
  [key: string]: Ii18nFormField[]
}

export interface Ii18nRadioGroupFormField extends Ii18nFormFieldBase {
  type: typeof RADIO_GROUP
  options: RadioComponentOption[]
  size?: RadioSize
  notice?: string
  flexDirection?: string
}

export interface Ii18nRadioGroupWithNestedFieldsFormField
  extends Omit<Ii18nRadioGroupFormField, 'type'> {
  type: typeof RADIO_GROUP_WITH_NESTED_FIELDS
  nestedFields: Ii18nNestedInputFields
}

type Name = {
  firstNames: string
  familyName: string
}
type Identifier = {
  id: string
  type: string
}
type Infomation = {
  name: Name[]
  birthDate: string
  nationality: [string]
  identifier: [Identifier] | null
}

export interface Ii18nInformativeRadioGroupFormField
  extends Ii18nFormFieldBase {
  type: typeof INFORMATIVE_RADIO_GROUP
  information: Infomation
  options: RadioComponentOption[]
}

export interface Ii18nTextFormField extends Ii18nFormFieldBase {
  type: typeof TEXT
  maxLength?: number
}
export interface Ii18nTelFormField extends Ii18nFormFieldBase {
  type: typeof TEL
  isSmallSized?: boolean
}
export interface Ii18nNumberFormField extends Ii18nFormFieldBase {
  type: typeof NUMBER
  step?: number
  max?: number
  inputFieldWidth?: string
}

export interface Ii18nBigNumberFormField extends Ii18nFormFieldBase {
  type: typeof BIG_NUMBER
  step?: number
}

export interface Ii18nCheckboxGroupFormField extends Ii18nFormFieldBase {
  type: typeof CHECKBOX_GROUP
  options: CheckboxComponentOption[]
}

export interface Ii18nCheckboxFormField extends Ii18nFormFieldBase {
  type: typeof CHECKBOX
  checkedValue?: 'true' | 'false' | boolean
  uncheckedValue?: 'true' | 'false' | boolean
}
export interface Ii18nDateFormField extends Ii18nFormFieldBase {
  type: typeof DATE
  notice?: string
  ignorePlaceHolder?: boolean
}
export interface Ii18nDateRangePickerFormField extends Ii18nFormFieldBase {
  type: typeof DATE_RANGE_PICKER
  notice?: string
  ignorePlaceHolder?: boolean
}
export interface Ii18nTextareaFormField extends Ii18nFormFieldBase {
  type: typeof TEXTAREA
  maxLength?: number
}
export interface Ii18nSubsectionFormField extends Ii18nFormFieldBase {
  type: typeof SUBSECTION
}
export interface Ii18nFieldGroupTitleField extends Ii18nFormFieldBase {
  type: typeof FIELD_GROUP_TITLE
}
export interface Ii18nDocumentsFormField extends Ii18nFormFieldBase {
  type: typeof DOCUMENTS
}
export interface Ii18nListFormField extends Ii18nFormFieldBase {
  type: typeof LIST
  items: MessageDescriptor[]
}
export interface Ii18nParagraphFormField extends Ii18nFormFieldBase {
  type: typeof PARAGRAPH
  fontVariant?: IFont
}
export interface Ii18nImageUploaderWithOptionsFormField
  extends Ii18nFormFieldBase {
  type: typeof IMAGE_UPLOADER_WITH_OPTIONS
  optionSection: IFormSection
}
export interface Ii18nDocumentUploaderWithOptions extends Ii18nFormFieldBase {
  type: typeof DOCUMENT_UPLOADER_WITH_OPTION
  options: SelectComponentOption[]
  hideOnEmptyOption?: boolean
  splitView?: boolean
}
export interface Ii18nSimpleDocumentUploaderFormField
  extends Ii18nFormFieldBase {
  type: typeof SIMPLE_DOCUMENT_UPLOADER
  allowedDocType?: string[]
}

export interface Ii18nLocationSearchInputFormField extends Ii18nFormFieldBase {
  type: typeof LOCATION_SEARCH_INPUT
  searchableResource: Array<
    Extract<keyof IOfflineData, 'facilities' | 'locations' | 'offices'>
  >
  searchableType: string[]
  locationList?: ISearchLocation[]
  dispatchOptions?: IDispatchOptions

  dynamicOptions?: IDynamicOptions
}

export interface Ii18nWarningField extends Ii18nFormFieldBase {
  type: typeof WARNING
}

export interface Ii18nLinkField extends Ii18nFormFieldBase {
  type: typeof LINK
}

export interface Ii18nLoaderButtonField extends Ii18nFormFieldBase {
  type: typeof FETCH_BUTTON
  queryMap: IQueryMap
  queryData?: IQuery
  querySelectorInput: IFieldInput
  onFetch?: (response: any) => void
  modalTitle: string
  successTitle: string
  errorTitle: string
  errorText: string
  networkErrorText: string
}
export interface Ii18nNidVerificationButtonField extends Ii18nFormFieldBase {
  type: typeof NID_VERIFICATION_BUTTON
  onClick: () => void
  labelForVerified: string
  labelForUnverified: string
  labelForOffline: string
}

export type Ii18nFormField =
  | Ii18nTextFormField
  | Ii18nTelFormField
  | Ii18nNumberFormField
  | Ii18nBigNumberFormField
  | Ii18nSelectFormField
  | Ii18nRadioGroupFormField
  | Ii18nRadioGroupWithNestedFieldsFormField
  | Ii18nInformativeRadioGroupFormField
  | Ii18nCheckboxGroupFormField
  | Ii18nCheckboxFormField
  | Ii18nDateFormField
  | Ii18nTextareaFormField
  | Ii18nSubsectionFormField
  | Ii18nFieldGroupTitleField
  | Ii18nDocumentsFormField
  | Ii18nListFormField
  | Ii18nParagraphFormField
  | Ii18nImageUploaderWithOptionsFormField
  | Ii18nDocumentUploaderWithOptions
  | Ii18nWarningField
  | Ii18nLinkField
  | Ii18nLoaderButtonField
  | Ii18nSimpleDocumentUploaderFormField
  | Ii18nLocationSearchInputFormField
  | Ii18nDateRangePickerFormField
  | Ii18nNidVerificationButtonField

export interface IFormSectionData {
  [key: string]: IFormFieldValue
}

export interface IFormData {
  [key: string]: IFormSectionData
}

type PaymentType = 'MANUAL'

type PaymentOutcomeType = 'COMPLETED' | 'ERROR' | 'PARTIAL'

type Payment = {
  paymentId?: string
  type: PaymentType
  total: string
  amount: string
  outcome: PaymentOutcomeType
  date: number
}

export interface ICertificate {
  collector?: IFormSectionData
  hasShowedVerifiedDocument?: boolean
  payments?: Payment[]
  data?: string
}

export function fieldTypeLabel(type: IFormField['type']) {
  const labelDict: {
    [key in IFormField['type']]: MessageDescriptor
  } = {
    TEXT: messages.textInput,
    TEXTAREA: messages.textAreaInput,
    SUBSECTION: messages.heading,
    FIELD_GROUP_TITLE: messages.fieldGroup,
    DOCUMENTS: messages.documents,
    LIST: messages.list,
    PARAGRAPH: messages.paragraph,
    IMAGE_UPLOADER_WITH_OPTIONS: messages.imageUploader,
    DOCUMENT_UPLOADER_WITH_OPTION: messages.documentUploader,
    SIMPLE_DOCUMENT_UPLOADER: messages.simpleDocumentUploader,
    LOCATION_SEARCH_INPUT: messages.locationSearch,
    WARNING: messages.warning,
    LINK: messages.link,
    FETCH_BUTTON: messages.fetchButton,
    TEL: messages.tel,
    NUMBER: messages.numberInput,
    BIG_NUMBER: messages.numberInput,
    SELECT_WITH_OPTIONS: messages.selectWithOption,
    SELECT_WITH_DYNAMIC_OPTIONS: messages.selectWithDynamicOption,
    FIELD_WITH_DYNAMIC_DEFINITIONS: messages.fieldWithDynamicDefinition,
    RADIO_GROUP: messages.radioGroup,
    RADIO_GROUP_WITH_NESTED_FIELDS: messages.radioGroupWithNestedField,
    INFORMATIVE_RADIO_GROUP: messages.informativeRadioGroup,
    CHECKBOX_GROUP: messages.checkboxGroup,
    CHECKBOX: messages.checkbox,
    DATE: messages.date,
    DATE_RANGE_PICKER: messages.dateRangePickerForFormField,
    DYNAMIC_LIST: messages.dynamicList,
    NID_VERIFICATION_BUTTON: messages.nidVerificationButton
  }

  return labelDict[type]
}
