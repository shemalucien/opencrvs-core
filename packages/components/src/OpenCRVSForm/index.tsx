import React, { InputHTMLAttributes, PropsWithChildren, useEffect } from 'react'
import { InputField } from '../InputField'
import { MessageDescriptor, useIntl } from 'react-intl'

type FieldData = {
  name: string
  validate: (value: string) => { message: MessageDescriptor } | undefined
  section: string
  label: MessageDescriptor
  group: string
}

type SectionData = {
  id: string
  viewType: 'form'
  hasDocumentSection?: boolean
  name: MessageDescriptor
  title: MessageDescriptor
}

type GroupData = {
  id: string
}

export interface IFormSection {
  id: string
  viewType: string
  name: MessageDescriptor
  title: MessageDescriptor
  groups: Array<{
    id: string
    // title?: MessageDescriptor
    // @todo
    fields: any[]
    // @todo
    // previewGroups?: any[]
    // disabled?: boolean
    // ignoreSingleFieldView?: boolean
    // @todo
    // conditionals?: any[]
    // error?: MessageDescriptor
    // preventContinueIfError?: boolean
    // showExitButtonOnly?: boolean
  }>
  // disabled?: boolean
  // optional?: boolean
  // notice?: MessageDescriptor
  // @todo
  // mapping?: IFormSectionMapping
  // hasDocumentSection?: boolean
}

export const OpenCRVSFormContext = React.createContext<{
  getFormSections: () => IFormSection[]
  getFormData: () => any
  registerFormField: (field: FieldData) => void
  registerFormSection: (section: SectionData) => void
  registerFormGroup: (group: GroupData) => void
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void
  getFormValues: () => Record<string, any>
  getInputProps: (name: string) => React.InputHTMLAttributes<HTMLInputElement>
  getFieldProps: (name: string) => {
    id: string
    error: string | undefined
    touched: boolean
  }
} | null>(null)

export const useOpenCRVSForm = () => {
  const useOpenCRVSFormContext = React.useContext(OpenCRVSFormContext)

  if (!useOpenCRVSFormContext) {
    throw new Error('useRegisterFormField must be used within a OpenCRVSForm')
  }

  return useOpenCRVSFormContext
}

export function OpenCRVSForm(props: React.PropsWithChildren<{}>) {
  const form = useOpenCRVSForm()
  return <form onSubmit={form.submitForm}>{props.children}</form>
}

export function OpenCRVSFormSection(props: PropsWithChildren<SectionData>) {
  const form = useOpenCRVSForm()
  const { children, ...dataProps } = props
  React.useEffect(() => {
    form.registerFormSection(dataProps)
  }, [dataProps, form, props])

  return <>{props.children}</>
}
export function OpenCRVSFormGroup(props: PropsWithChildren<GroupData>) {
  const form = useOpenCRVSForm()
  const { children, ...dataProps } = props
  React.useEffect(() => {
    form.registerFormGroup(dataProps)
  }, [form, dataProps])

  return <>{props.children}</>
}
export function OpenCRVSFormField(
  props: FieldData & { children: React.ReactElement<{ name: string }> }
) {
  const form = useOpenCRVSForm()
  const fieldProps = form.getFieldProps(props.name)

  // @TODO only accept one child and check if it's a InputField
  const { children, ...dataProps } = props

  React.useEffect(() => {
    form.registerFormField({ ...dataProps })
    // @todo remove validate key
  }, [form, dataProps])

  return (
    <InputField {...fieldProps}>
      {React.cloneElement(props.children, { name: props.name })}
    </InputField>
  )
}

/*
 * Wrapper element to connect any type of input to the form
 * <OpenCRVSInput name="applicant-name">
 *   <TextField />
 * </OpenCRVSInput>
 */

export function OpenCRVSInput<T extends HTMLInputElement>(props: {
  name?: string
  children: React.ReactElement<InputHTMLAttributes<T>>
}) {
  // @TODO check that we are inside a OpenCRVSFormField
  const form = useOpenCRVSForm()
  const inputProps = form.getInputProps(props.name!)
  return React.cloneElement(props.children, inputProps)
}

export function OpenCRVSFormProvider(props: React.PropsWithChildren<{}>) {
  const [sections, setSections] = React.useState<SectionData[]>([])
  const [groups, setGroups] = React.useState<GroupData[]>([])
  const [data, setData] = React.useState<FieldData[]>([])
  const [formData, setFormData] = React.useState<Record<string, any>>({})
  const intl = useIntl()
  const [formErrors, setFormErrors] = React.useState<
    Record<string, string | undefined>
  >({})
  const [touchedFields, setTouchedFields] = React.useState<
    Record<string, boolean>
  >({})

  const registerFormSection = React.useCallback(
    (newSection: SectionData) => {
      if (sections.find((field) => field.id === newSection.id)) {
        return
      }
      console.log('OpenCRVS Form Provider: Registering section', newSection)
      setSections([...sections, newSection])
    },
    [sections]
  )
  const registerFormGroup = React.useCallback(
    (newGroup: GroupData) => {
      if (groups.find((field) => field.id === newGroup.id)) {
        return
      }
      console.log('OpenCRVS Form Provider: Registering group', newGroup)
      setGroups([...groups, newGroup])
    },
    [groups]
  )
  const registerFormField = React.useCallback(
    (newField: FieldData) => {
      if (data.find((field) => field.name === newField.name)) {
        return
      }
      console.log(
        data.length,
        'OpenCRVS Form Provider: Registering field',
        newField
      )
      setData((data) => [...data, newField])
    },
    [data]
  )

  useEffect(() => {
    console.log({ data })
  }, [data])
  const getFormSections = React.useCallback(() => {
    const sectionsById = {}
    for (const field of data) {
      const { section, group } = field
      if (!sectionsById[section]) {
        sectionsById[section] = {
          ...sections.find((s) => s.id === section),
          groups: {}
        }
      }

      if (!sectionsById[section].groups[group]) {
        sectionsById[section].groups[group] = {
          ...groups.find((g) => g.id === group),
          fields: []
        }
      }

      sectionsById[section].groups[group].fields.push(field)
    }

    return Object.values(sectionsById).map(
      (
        section: SectionData & {
          groups: Record<string, GroupData & { fields: FieldData[] }>
        }
      ) => {
        return {
          ...section,
          groups: Object.values(section.groups)
        }
      }
    )
  }, [data, groups, sections])

  const getFormData = React.useCallback(() => {
    const sectionsById = {}
    for (const field of data) {
      const { section } = field
      if (!sectionsById[section]) {
        sectionsById[section] = {}
      }

      sectionsById[section][field.name] = formData[field.name]
    }
    return sectionsById
  }, [data, formData])

  const submitForm = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log('OpenCRVS Form Provider: Form was submitted')
      console.log(
        'OpenCRVS Form Provider: Form definition on submission',
        data.join(', ')
      )
    },
    [data]
  )
  const getInputProps = React.useCallback(
    (name: string) => {
      function validate(value: string) {
        const validate = data.find((field) => field.name === name)?.validate

        if (validate) {
          const error = validate(value)
          if (error) {
            setFormErrors({
              ...formErrors,
              [name]: intl.formatMessage(error.message)
            })
          } else {
            setFormErrors({
              ...formErrors,
              [name]: undefined
            })
          }
        }
      }
      return {
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
          validate(event.target.value)
          setTouchedFields({
            ...touchedFields,
            [name]: true
          })
        },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value
          validate(value)

          setFormData({
            ...formData,
            [name]: value
          })
        },
        value: formData[name] || ''
      }
    },
    [data, formData, formErrors, intl, touchedFields]
  )
  const getFieldProps = React.useCallback(
    (name: string) => {
      const fieldConfiguration = data.find((field) => field.name === name)
      return {
        touched: touchedFields[name] || false,
        error: formErrors[name] || undefined,
        label: fieldConfiguration?.label
          ? intl.formatMessage(fieldConfiguration.label)
          : '',
        id: name // @todo
      }
    },
    [data, formErrors, intl, touchedFields]
  )
  const getFormValues = React.useCallback(() => {
    return formData
  }, [formData])

  const value = React.useMemo(
    () => ({
      registerFormField,
      registerFormSection,
      registerFormGroup,
      submitForm,
      getFormData,
      getInputProps,
      getFieldProps,
      getFormValues,
      getFormSections
    }),
    [
      registerFormField,
      registerFormSection,
      registerFormGroup,
      submitForm,
      getFormData,
      getInputProps,
      getFieldProps,
      getFormValues,
      getFormSections
    ]
  )

  return (
    <OpenCRVSFormContext.Provider value={value}>
      {props.children}
    </OpenCRVSFormContext.Provider>
  )
}
