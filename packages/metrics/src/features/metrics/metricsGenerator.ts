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
import { INFLUXDB_URL, INFLUX_DB } from '@metrics/influxdb/constants'
import {
  FEMALE,
  MALE,
  WITHIN_1_YEAR
} from '@metrics/features/metrics/constants'
import {
  calculateInterval,
  fetchEstimateByLocation,
  fetchEstimateForTargetDaysByLocationId,
  generateEmptyBirthKeyFigure,
  IPoint,
  LABEL_FOMRAT,
  Location,
  EVENT_TYPE,
  fillEmptyDataArrayByKey,
  getRegistrationTargetDays
} from '@metrics/features/metrics/utils'
import { IAuthHeader } from '@metrics/features/registration'
import { query } from '@metrics/influxdb/client'
import { csvToJSON } from '@metrics/utils/csvHelper'
import { format } from 'date-fns'
import fetch from 'node-fetch'
interface IGroupedByGender {
  total: number
  gender: string
}

interface IGroupByTimeLabel {
  total: number
  timeLabel: string
}
interface IGroupByEventDate {
  total: number
  dateLabel: string
  timeLabel: string
}

interface IMetricsTotalGroup extends IGroupedByGender {
  practitionerRole: string
  registrarPractitionerId: string
  timeLabel: string
}

interface IMetricsTotalGroupByLocation {
  time: string
  total: number
  eventLocationType: string
  officeLocation: string
  timeLabel: string
}

interface IMetricsTotalGroupByTime {
  time: string
  month: string
  total: number
  eventLocationType: string
  timeLabel: string
}

export interface IBirthKeyFigures {
  label: string
  value: number
  total: number
  estimate: number
  categoricalData: IBirthKeyFiguresData[]
}

interface IBirthKeyFiguresData {
  name: string
  value: number
}

export interface IEstimation {
  totalEstimation: number
  maleEstimation: number
  femaleEstimation: number
  locationId: string
  locationLevel: string
  estimationYear: number
}

export interface IRegistrationInTargetDayEstimation {
  locationId: string
  registrationInTargetDay: number
  estimatedRegistration: number
  estimationYear: number
  estimationLocationLevel: string
  estimationPercentage: number
}

interface ICurrentAndLowerLocationLevels {
  currentLocationLevel: string
  lowerLocationLevel: string
}
interface IGenderBasisMetrics {
  location: string
  maleUnder18: number
  femaleUnder18: number
  maleOver18: number
  femaleOver18: number
  total: number
}

interface IGenderBasisPoint {
  gender: string
  over18: number
  under18: number
  locationLevel2?: string
  locationLevel3?: string
  locationLevel4?: string
  locationLevel5?: string
}

type Payment = {
  total: number
}

export async function fetchCertificationPayments(
  timeStart: string,
  timeEnd: string,
  locationId: string,
  currentLocationLevel: string,
  lowerLocationLevel: string,
  eventType: EVENT_TYPE,
  childLocationIds: Array<string>
) {
  const payments = await query(
    `SELECT SUM(total) as total FROM certification_payment WHERE time > $timeStart AND time <= $timeEnd
      AND ${currentLocationLevel}=$locationId
      AND eventType = $eventType
      GROUP BY ${lowerLocationLevel}`,
    {
      placeholders: {
        timeStart,
        timeEnd,
        locationId,
        eventType
      }
    }
  )

  const dataFromInflux = payments.map((payment: Payment) => ({
    total: payment.total,
    locationId: payment[lowerLocationLevel]
  }))

  const emptyData = childLocationIds.map((id) => ({ locationId: id, total: 0 }))

  const paymentsData = fillEmptyDataArrayByKey(
    dataFromInflux,
    emptyData,
    'locationId'
  )
  return paymentsData
}

const birthRegWithinTimeFramesQuery = (
  timeStart: string,
  timeEnd: string,
  locationId: string,
  currentLocationLevel: string,
  lowerLocationLevel: string,
  birthRegistrationTargetInDays: number
): string => {
  const EXPECTED_BIRTH_REGISTRATION_IN_DAYS = birthRegistrationTargetInDays
  return `SELECT
  SUM(withinTargetDays) AS regWithinTargetd,
  SUM(withinTargetDTo1Yr) AS regWithinTargetdTo1yr,
  SUM(within1YrTo5Yr) AS regWithin1yrTo5yr,
  SUM(over5Yr) AS regOver5yr
 FROM (
   SELECT withinTargetDays, withinTargetDTo1Yr, within1YrTo5Yr, over5Yr, ${lowerLocationLevel}
   FROM (
    SELECT COUNT(ageInDays) AS withinTargetDays FROM birth_registration WHERE time > $timeStart AND time <= $timeEnd
  AND ageInDays > -1 AND ageInDays <= ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS} AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ), (
    SELECT COUNT(ageInDays) AS withinTargetDTo1Yr FROM birth_registration WHERE time > $timeStart AND time <= $timeEnd
  AND ageInDays > ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS} AND ageInDays <= 365 AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ), (
    SELECT COUNT(ageInDays) AS within1YrTo5Yr FROM birth_registration WHERE time > $timeStart AND time <= $timeEnd
  AND ageInDays > 366 AND ageInDays <= 1825 AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ), (
    SELECT COUNT(ageInDays) AS over5Yr FROM birth_registration WHERE time > $timeStart AND time <= $timeEnd
  AND ageInDays > 1826 AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ) FILL(0)
 ) GROUP BY ${lowerLocationLevel}
 `
}

const deathRegWithinTimeFramesQuery = (
  timeStart: string,
  timeEnd: string,
  locationId: string,
  currentLocationLevel: string,
  lowerLocationLevel: string,
  deathRegistrationTargetInDays: number
): string => {
  const EXPECTED_BIRTH_REGISTRATION_IN_DAYS = deathRegistrationTargetInDays
  return `SELECT
  SUM(withinTargetDays) AS regWithinTargetd,
  SUM(withinTargetDTo1Yr) AS regWithinTargetdTo1yr,
  SUM(within1YrTo5Yr) AS regWithin1yrTo5yr,
  SUM(over5Yr) AS regOver5yr
 FROM (
   SELECT withinTargetDays, withinTargetDTo1Yr, within1YrTo5Yr, over5Yr, ${lowerLocationLevel}
   FROM (
    SELECT COUNT(deathDays) AS withinTargetDays FROM death_registration WHERE time > $timeStart AND time <= $timeEnd
  AND deathDays > -1 AND deathDays <= ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS} AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ), (
    SELECT COUNT(deathDays) AS withinTargetDTo1Yr FROM death_registration WHERE time > $timeStart AND time <= $timeEnd
  AND deathDays > ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS} AND deathDays <= 365 AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ), (
    SELECT COUNT(deathDays) AS within1YrTo5Yr FROM death_registration WHERE time > $timeStart AND time <= $timeEnd
  AND deathDays > 366 AND deathDays <= 1825 AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ), (
    SELECT COUNT(deathDays) AS over5Yr FROM death_registration WHERE time > $timeStart AND time <= $timeEnd
  AND deathDays > 1826 AND ${currentLocationLevel}=$locationId
    GROUP BY ${lowerLocationLevel}
   ) FILL(0)
 ) GROUP BY ${lowerLocationLevel}
 `
}

export async function fetchRegWithinTimeFrames(
  timeStart: string,
  timeEnd: string,
  locationId: string,
  currentLocationLevel: string,
  lowerLocationLevel: string,
  event: string,
  childLocationIds: Array<string>,
  registrationTargetInDays: number
) {
  let queryString = ''
  //const registrationTargetInDays = await getRegistrationTargetDays(event)
  if (event === EVENT_TYPE.BIRTH) {
    queryString = birthRegWithinTimeFramesQuery(
      timeStart,
      timeEnd,
      locationId,
      currentLocationLevel,
      lowerLocationLevel,
      registrationTargetInDays
    )
  } else if (event === EVENT_TYPE.DEATH) {
    queryString = deathRegWithinTimeFramesQuery(
      timeStart,
      timeEnd,
      locationId,
      currentLocationLevel,
      lowerLocationLevel,
      registrationTargetInDays
    )
  }

  const timeFramePoints = await query(queryString, {
    placeholders: {
      timeStart,
      timeEnd,
      locationId
    }
  })

  const dataFromInflux = timeFramePoints.map((point: any) => {
    const {
      regWithinTargetd,
      regWithinTargetdTo1yr,
      regWithin1yrTo5yr,
      regOver5yr
    } = point
    const total =
      regWithinTargetd + regWithinTargetdTo1yr + regWithin1yrTo5yr + regOver5yr
    return {
      locationId: point[lowerLocationLevel],
      regWithinTargetd,
      regWithinTargetdTo1yr,
      regWithin1yrTo5yr,
      regOver5yr,
      total
    }
  })

  const placeholder = {
    total: 0,
    regWithinTargetd: 0,
    regWithinTargetdTo1yr: 0,
    regWithin1yrTo5yr: 0,
    regOver5yr: 0
  }

  const emptyData = childLocationIds.map((id) => ({
    locationId: id,
    ...placeholder
  }))

  const timeFrameData = fillEmptyDataArrayByKey(
    dataFromInflux,
    emptyData,
    'locationId'
  )

  return timeFrameData
}

export async function getCurrentAndLowerLocationLevels(
  timeStart: string,
  timeEnd: string,
  locationId: string,
  event: EVENT_TYPE
): Promise<ICurrentAndLowerLocationLevels> {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const allPointsContainingLocationId = await query(
    `SELECT LAST(*) FROM ${measurement} WHERE time > $timeStart AND time <= $timeEnd
      AND ( officeLocation = $locationId
        OR locationLevel1 = $locationId
        OR locationLevel2 = $locationId
        OR locationLevel3 = $locationId
        OR locationLevel4 = $locationId
        OR locationLevel5 = $locationId )
      GROUP BY officeLocation,locationLevel2,locationLevel3,locationLevel4,locationLevel5`,
    {
      placeholders: {
        timeStart,
        timeEnd,
        locationId
      }
    }
  )

  if (
    allPointsContainingLocationId &&
    allPointsContainingLocationId.length > 0 &&
    allPointsContainingLocationId[0].officeLocation &&
    allPointsContainingLocationId[0].officeLocation === locationId
  ) {
    return {
      currentLocationLevel: 'officeLocation',
      lowerLocationLevel: 'officeLocation'
    }
  }

  const locationLevelOfQueryId =
    allPointsContainingLocationId &&
    allPointsContainingLocationId.length > 0 &&
    Object.keys(allPointsContainingLocationId[0]).find(
      (key) => allPointsContainingLocationId[0][key] === locationId
    )
  const oneLevelLowerLocationColumn =
    locationLevelOfQueryId &&
    locationLevelOfQueryId.replace(/\d/, (level: string) =>
      level === '5' ? level : String(Number(level) + 1)
    )

  if (!locationLevelOfQueryId || !oneLevelLowerLocationColumn) {
    throw new Error(`Location level not found for location ${locationId}`)
  }

  return {
    currentLocationLevel: locationLevelOfQueryId,
    lowerLocationLevel: oneLevelLowerLocationColumn
  }
}

export const regWithinTargetDays = async (
  timeStart: string,
  timeEnd: string
) => {
  const interval = calculateInterval(timeStart, timeEnd)
  const points = await query(
    `
      SELECT COUNT(ageInDays) AS count
        FROM birth_registration
      WHERE time >= ${timeStart} AND time <= ${timeEnd}
        GROUP BY time(${interval})
    `
  )

  const total =
    (points &&
      points.reduce((pointsTotal: IPoint, point: IPoint) => ({
        count: pointsTotal.count + point.count
      }))) ||
    0
  const label = LABEL_FOMRAT[interval]

  return (
    (points &&
      points.map((point: IPoint) => ({
        label: format(new Date(point.time), label),
        value: point.count,
        totalEstimate: total.count
      }))) ||
    []
  )
}

export async function fetchKeyFigures(
  timeStart: string,
  timeEnd: string,
  location: Location,
  authHeader: IAuthHeader
) {
  const estimatedFigureForTargetDays = await fetchEstimateByLocation(
    location,
    EVENT_TYPE.BIRTH,
    authHeader,
    timeStart,
    timeEnd
  )

  const keyFigures: IBirthKeyFigures[] = []
  const queryLocationId = `Location/${estimatedFigureForTargetDays.locationId}`

  const EXPECTED_BIRTH_REGISTRATION_IN_DAYS = await getRegistrationTargetDays(
    EVENT_TYPE.BIRTH,
    authHeader.Authorization
  )

  /* Populating < 45D data */
  const withinTargetDaysData: IGroupedByGender[] = await query(
    `SELECT COUNT(ageInDays) AS total
      FROM birth_registration
    WHERE time >= ${timeStart}
      AND time <= ${timeEnd}
      AND ( locationLevel1 = $queryLocationId
          OR locationLevel2 = $queryLocationId
          OR locationLevel3 = $queryLocationId
          OR locationLevel4 = $queryLocationId
          OR locationLevel5 = $queryLocationId )
      AND ageInDays <= ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS}
    GROUP BY gender`,
    {
      placeholders: {
        queryLocationId
      }
    }
  )
  const WITHIN_TARGET_DAYS = `DAYS_0_TO_${EXPECTED_BIRTH_REGISTRATION_IN_DAYS}`
  const WITHIN_TARGET_DAYS_TO_1_YEAR = `DAYS_${
    EXPECTED_BIRTH_REGISTRATION_IN_DAYS + 1
  }_TO_365`
  keyFigures.push(
    populateBirthKeyFigurePoint(
      WITHIN_TARGET_DAYS,
      withinTargetDaysData,
      estimatedFigureForTargetDays.totalEstimation
    )
  )
  /* Populating > 45D and < 365D data */
  const estimatedFigureFor1Year = await fetchEstimateByLocation(
    location,
    EVENT_TYPE.BIRTH,
    authHeader,
    timeStart,
    timeEnd
  )
  const within1YearData: IGroupedByGender[] = await query(
    `SELECT COUNT(ageInDays) AS total
      FROM birth_registration
    WHERE time >= ${timeStart}
      AND time <= ${timeEnd}
      AND ( locationLevel1 = $queryLocationId
          OR locationLevel2 = $queryLocationId
          OR locationLevel3 = $queryLocationId
          OR locationLevel4 = $queryLocationId
          OR locationLevel5 = $queryLocationId )
      AND ageInDays > ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS}
      AND ageInDays <= 365
    GROUP BY gender`,
    {
      placeholders: {
        queryLocationId
      }
    }
  )
  keyFigures.push(
    populateBirthKeyFigurePoint(
      WITHIN_TARGET_DAYS_TO_1_YEAR,
      within1YearData,
      estimatedFigureFor1Year.totalEstimation
    )
  )
  /* Populating < 365D data */
  let fullData: IGroupedByGender[] = []
  if (withinTargetDaysData) {
    fullData = fullData.concat(withinTargetDaysData)
  }
  if (within1YearData) {
    fullData = fullData.concat(within1YearData)
  }
  keyFigures.push(
    populateBirthKeyFigurePoint(
      WITHIN_1_YEAR,
      fullData,
      estimatedFigureFor1Year.totalEstimation
    )
  )
  return keyFigures
}

const populateBirthKeyFigurePoint = (
  figureLabel: string,
  groupedByGenderData: IGroupedByGender[],
  estimation: number
): IBirthKeyFigures => {
  if (
    !groupedByGenderData ||
    (Array.isArray(groupedByGenderData) && groupedByGenderData.length === 0)
  ) {
    return generateEmptyBirthKeyFigure(figureLabel, estimation)
  }
  let percentage = 0
  let totalMale = 0
  let totalFemale = 0

  groupedByGenderData.forEach((data) => {
    if (data.gender === FEMALE) {
      totalFemale += data.total
    } else if (data.gender === MALE) {
      totalMale += data.total
    }
  })
  if (totalMale + totalFemale === 0) {
    return generateEmptyBirthKeyFigure(figureLabel, estimation)
  }

  /* TODO: need to implement different percentage calculation logic
     based on different date range here */
  percentage = Math.round(((totalMale + totalFemale) / estimation) * 100)

  return {
    label: figureLabel,
    value: percentage,
    total: totalMale + totalFemale,
    estimate: estimation,
    categoricalData: [
      {
        name: FEMALE,
        value: totalFemale
      },
      {
        name: MALE,
        value: totalMale
      }
    ]
  }
}

const birthGenderBasisMetricsQuery = (
  timeFrom: string,
  timeTo: string,
  currLocation: string,
  currLocationLevel: string,
  locationLevel: string
): string => {
  return `
  SELECT
    SUM(under18) AS under18,
    SUM(over18) AS over18
  FROM (
    SELECT under18, over18, gender, ${locationLevel} FROM (
      SELECT
        COUNT(ageInDays) AS under18
      FROM birth_registration
      WHERE ageInDays < 6574
       AND time > $timeFrom
       AND time <= $timeTo
       AND ${currLocationLevel}=$currLocation
      GROUP BY gender, ${locationLevel}
    ), (
      SELECT
        COUNT(ageInDays) AS over18
      FROM birth_registration
      WHERE ageInDays >= 6574
       AND time > $timeFrom
       AND time <= $timeTo
       AND ${currLocationLevel}=$currLocation
      GROUP BY gender, ${locationLevel}
    ) FILL(0)
  )
  GROUP BY gender, ${locationLevel}
  `
}

const deathGenderBasisMetricsQuery = (
  timeFrom: string,
  timeTo: string,
  currLocation: string,
  currLocationLevel: string,
  locationLevel: string
): string => {
  return `
  SELECT
    SUM(under18) AS under18,
    SUM(over18) AS over18
  FROM (
    SELECT under18, over18, gender, ${locationLevel} FROM (
      SELECT
        COUNT(ageInYears) AS under18
      FROM death_registration
      WHERE ageInYears < 18
       AND time > $timeFrom
       AND time <= $timeTo
       AND ${currLocationLevel}=$currLocation
      GROUP BY gender, ${locationLevel}
    ), (
      SELECT
        COUNT(ageInYears) AS over18
      FROM death_registration
      WHERE ageInYears >= 18
       AND time > $timeFrom
       AND time <= $timeTo
       AND ${currLocationLevel}=$currLocation
      GROUP BY gender, ${locationLevel}
    ) FILL(0)
  )
  GROUP BY gender, ${locationLevel}
  `
}

export async function fetchGenderBasisMetrics(
  timeFrom: string,
  timeTo: string,
  currLocation: string,
  currLocationLevel: string,
  locationLevel: string,
  event: EVENT_TYPE,
  childLocationIds: Array<string>
) {
  let queryString = ''
  if (event === EVENT_TYPE.BIRTH) {
    queryString = birthGenderBasisMetricsQuery(
      timeFrom,
      timeTo,
      currLocation,
      currLocationLevel,
      locationLevel
    )
  } else if (event === EVENT_TYPE.DEATH) {
    queryString = deathGenderBasisMetricsQuery(
      timeFrom,
      timeTo,
      currLocation,
      currLocationLevel,
      locationLevel
    )
  }

  const points = await query(queryString, {
    placeholders: {
      timeFrom,
      timeTo,
      currLocation
    }
  })

  const dataFromInflux = populateGenderBasisMetrics(points, locationLevel)
  const placeholder = {
    total: 0,
    maleOver18: 0,
    maleUnder18: 0,
    femaleOver18: 0,
    femaleUnder18: 0
  }

  const emptyData = childLocationIds.map((id) => ({
    location: id,
    ...placeholder
  }))

  const genderBasisData = fillEmptyDataArrayByKey(
    dataFromInflux,
    emptyData,
    'location'
  )
  return genderBasisData
}

export async function fetchEstimatedTargetDayMetrics(
  timeFrom: string,
  timeTo: string,
  currLocation: string,
  currLocationLevel: string,
  locationLevel: string,
  event: EVENT_TYPE,
  childLocationIds: Array<string>,
  authHeader: IAuthHeader,
  registrationTargetInDays: number
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const column = event === EVENT_TYPE.BIRTH ? 'ageInDays' : 'deathDays'
  const EXPECTED_BIRTH_REGISTRATION_IN_DAYS = registrationTargetInDays

  const points = await query(
    `SELECT
                              COUNT(${column}) AS withInTargetDay
                              FROM ${measurement}
                              WHERE ${column} <= ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS}
                              AND time > $timeFrom
                              AND time <= $timeTo
                              AND ${currLocationLevel}=$currLocation
                              GROUP BY ${locationLevel}`,
    {
      placeholders: {
        timeFrom,
        timeTo,
        currLocation
      }
    }
  )
  const dataFromInflux: IRegistrationInTargetDayEstimation[] = []
  for (const point of points) {
    const estimationOfTargetDay: IEstimation =
      await fetchEstimateForTargetDaysByLocationId(
        point[locationLevel],
        event,
        authHeader,
        timeFrom,
        timeTo
      )
    dataFromInflux.push({
      locationId: point[locationLevel],
      registrationInTargetDay: point.withInTargetDay,
      estimatedRegistration: estimationOfTargetDay.totalEstimation,
      estimationYear: estimationOfTargetDay.estimationYear,
      estimationLocationLevel: estimationOfTargetDay.locationLevel,
      estimationPercentage:
        point.withInTargetDay === 0 ||
        estimationOfTargetDay.totalEstimation === 0
          ? 0
          : Number(
              (
                (point.withInTargetDay /
                  estimationOfTargetDay.totalEstimation) *
                100
              ).toFixed(2)
            )
    })
  }

  const emptyEstimationData: IRegistrationInTargetDayEstimation[] = []
  for (const id of childLocationIds) {
    const estimationOfTargetDay: IEstimation =
      await fetchEstimateForTargetDaysByLocationId(
        id,
        event,
        authHeader,
        timeFrom,
        timeTo
      )
    emptyEstimationData.push({
      locationId: id,
      registrationInTargetDay: 0,
      estimatedRegistration: estimationOfTargetDay.totalEstimation,
      estimationYear: estimationOfTargetDay.estimationYear,
      estimationLocationLevel: estimationOfTargetDay.locationLevel,
      estimationPercentage: 0
    })
  }

  const estimatedTargetDayData = fillEmptyDataArrayByKey(
    dataFromInflux,
    emptyEstimationData,
    'locationId'
  )
  return estimatedTargetDayData
}

type Registration = {
  total: number
}

export async function getTotalNumberOfRegistrations(
  timeFrom: string,
  timeTo: string,
  locationId: string,
  event: EVENT_TYPE
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const totalRegistrationPoint: Registration[] = await query(
    `SELECT COUNT(DISTINCT(compositionId)) AS total
      FROM ${measurement}
    WHERE time > $timeFrom
      AND time <= $timeTo
      AND ( locationLevel1 = $locationId
          OR locationLevel2 = $locationId
          OR locationLevel3 = $locationId
          OR locationLevel4 = $locationId
          OR locationLevel5 = $locationId )`,
    {
      placeholders: {
        timeFrom,
        timeTo,
        locationId
      }
    }
  )
  return totalRegistrationPoint?.[0]?.total ?? 0
}

export async function fetchLocationWiseEventEstimations(
  timeFrom: string,
  timeTo: string,
  locationId: string,
  event: EVENT_TYPE,
  authHeader: IAuthHeader
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const column = event === EVENT_TYPE.BIRTH ? 'ageInDays' : 'deathDays'
  const EXPECTED_BIRTH_REGISTRATION_IN_DAYS = await getRegistrationTargetDays(
    event,
    authHeader.Authorization
  )
  const registrationsInTargetDaysPoints: IGroupedByGender[] = await query(
    `SELECT COUNT(${column}) AS total
      FROM ${measurement}
    WHERE time > $timeFrom
      AND time <= $timeTo
      AND ( locationLevel1 = $locationId
          OR locationLevel2 = $locationId
          OR locationLevel3 = $locationId
          OR locationLevel4 = $locationId
          OR locationLevel5 = $locationId )
      AND ${column} <= ${EXPECTED_BIRTH_REGISTRATION_IN_DAYS}
    GROUP BY gender`,
    {
      placeholders: {
        timeFrom,
        timeTo,
        locationId
      }
    }
  )

  let totalRegistrationInTargetDay = 0
  let totalMaleRegistrationInTargetDay = 0
  let totalFemaleRegistrationInTargetDay = 0
  registrationsInTargetDaysPoints.forEach((point) => {
    totalRegistrationInTargetDay += point.total
    if (point.gender === 'male') {
      totalMaleRegistrationInTargetDay += point.total
    } else if (point.gender === 'female') {
      totalFemaleRegistrationInTargetDay += point.total
    }
  })
  const estimationOfTargetDay: IEstimation =
    await fetchEstimateForTargetDaysByLocationId(
      locationId,
      event,
      authHeader,
      timeFrom,
      timeTo
    )

  return {
    actualRegistration: totalRegistrationInTargetDay,
    estimatedRegistration: estimationOfTargetDay.totalEstimation,
    estimatedPercentage:
      totalRegistrationInTargetDay === 0 ||
      estimationOfTargetDay.totalEstimation === 0
        ? 0
        : Number(
            (
              (totalRegistrationInTargetDay /
                estimationOfTargetDay.totalEstimation) *
              100
            ).toFixed(2)
          ),
    malePercentage:
      totalMaleRegistrationInTargetDay === 0 ||
      estimationOfTargetDay.maleEstimation === 0
        ? 0
        : Number(
            (
              (totalMaleRegistrationInTargetDay /
                estimationOfTargetDay.maleEstimation) *
              100
            ).toFixed(2)
          ),
    femalePercentage:
      totalFemaleRegistrationInTargetDay === 0 ||
      estimationOfTargetDay.femaleEstimation === 0
        ? 0
        : Number(
            (
              (totalFemaleRegistrationInTargetDay /
                estimationOfTargetDay.femaleEstimation) *
              100
            ).toFixed(2)
          )
  }
}

export async function fetchLocaitonWiseEventEstimationsGroupByTimeLabel(
  timeFrom: string,
  timeTo: string,
  locationId: string,
  event: EVENT_TYPE,
  authHeader: IAuthHeader
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const column = event === EVENT_TYPE.BIRTH ? 'ageInDays' : 'deathDays'

  const registrations: IGroupByTimeLabel[] = await query(
    `SELECT COUNT(${column}) AS total
      FROM ${measurement}
    WHERE time > $timeFrom
      AND time <= $timeTo
      AND ( locationLevel1 = $locationId
          OR locationLevel2 = $locationId
          OR locationLevel3 = $locationId
          OR locationLevel4 = $locationId
          OR locationLevel5 = $locationId )
    GROUP BY timeLabel`,
    {
      placeholders: {
        timeFrom,
        timeTo,
        locationId
      }
    }
  )
  const estimationOfTimeRange: IEstimation =
    await fetchEstimateForTargetDaysByLocationId(
      locationId,
      event,
      authHeader,
      timeFrom,
      timeTo
    )

  return {
    estimated: estimationOfTimeRange,
    results: registrations
  }
}
export async function fetchEventsGroupByMonthDates(
  timeFrom: string,
  timeTo: string,
  locationId: string | undefined,
  event: EVENT_TYPE
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const column = event === EVENT_TYPE.BIRTH ? 'ageInDays' : 'deathDays'

  const registrationsInTargetDaysPoints: IGroupByEventDate[] = await query(
    `SELECT COUNT(${column}) AS total
      FROM ${measurement}
    WHERE time > $timeFrom
      AND time <= $timeTo
      ${
        locationId
          ? `AND ( locationLevel1 = $locationId
      OR locationLevel2 = $locationId
      OR locationLevel3 = $locationId
      OR locationLevel4 = $locationId
      OR locationLevel5 = $locationId )`
          : ``
      }
    GROUP BY dateLabel, timeLabel`,
    {
      placeholders: {
        timeFrom,
        timeTo,
        locationId
      }
    }
  )

  return registrationsInTargetDaysPoints
}
export async function getTotalMetrics(
  timeFrom: string,
  timeTo: string,
  locationId: string | undefined,
  event: EVENT_TYPE,
  authHeader: IAuthHeader
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const column = event === EVENT_TYPE.BIRTH ? 'ageInDays' : 'deathDays'

  const totalMetrics: IMetricsTotalGroup[] = await query(
    `SELECT COUNT(${column}) AS total
      FROM ${measurement}
    WHERE time > $timeFrom
      AND time <= $timeTo
      ${
        locationId
          ? `AND ( locationLevel1 = $locationId
      OR locationLevel2 = $locationId
      OR locationLevel3 = $locationId
      OR locationLevel4 = $locationId
      OR locationLevel5 = $locationId
      OR officeLocation = $locationId)`
          : ``
      }
    GROUP BY gender, timeLabel, eventLocationType, practitionerRole, registrarPractitionerId`,
    {
      placeholders: {
        timeFrom,
        timeTo,
        locationId
      }
    }
  )

  const estimationOfTimeRange: IEstimation =
    await fetchEstimateForTargetDaysByLocationId(
      locationId,
      event,
      authHeader,
      timeFrom,
      timeTo
    )

  return {
    estimated: estimationOfTimeRange,
    results: totalMetrics || []
  }
}

export async function fetchRegistrationsGroupByOfficeLocation(
  timeFrom: string,
  timeTo: string,
  event: EVENT_TYPE,
  locationId: string | undefined
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const column = event === EVENT_TYPE.BIRTH ? 'ageInDays' : 'deathDays'

  const result: IMetricsTotalGroupByLocation[] = await query(
    `SELECT COUNT(${column}) AS total
      FROM ${measurement}
    WHERE time > '${timeFrom}'
      AND time <= '${timeTo}'
      ${
        locationId
          ? `AND ( locationLevel1 = '${locationId}'
      OR locationLevel2 = '${locationId}'
      OR locationLevel3 = '${locationId}'
      OR locationLevel4 = '${locationId}'
      OR locationLevel5 = '${locationId}'
      OR officeLocation = '${locationId}')`
          : ``
      }
    GROUP BY officeLocation, eventLocationType, timeLabel`
  )

  return result
}

export async function fetchRegistrationsGroupByTime(
  timeFrom: string,
  timeTo: string,
  event: EVENT_TYPE,
  locationId: string | undefined
) {
  const measurement =
    event === EVENT_TYPE.BIRTH ? 'birth_registration' : 'death_registration'
  const column = event === EVENT_TYPE.BIRTH ? 'ageInDays' : 'deathDays'

  const fluxQuery = `
   from(bucket: "${INFLUX_DB}")
   |> range(start: ${timeFrom}, stop: ${timeTo})
   |> filter(fn: (r) => r._measurement == "${measurement}") 
   ${
     locationId
       ? `|> filter(fn: (r) => 
   (r.locationLevel1 == "${locationId}" or
    r.locationLevel2 == "${locationId}" or
    r.locationLevel3 == "${locationId}" or 
    r.locationLevel4 == "${locationId}" or
    r.locationLevel5 == "${locationId}" or
    r.officeLocation == "${locationId}"))`
       : ``
   }
    |> filter(fn: (r) => r._field == "${column}")
    |> group(columns: ["timeLabel", "eventLocationType"])
    |> aggregateWindow(every: 1mo, fn: count, timeSrc: "_start")
    |> sort(columns: ["_time"], desc: true)
    |> rename(columns: {_value: "total"})
   `

  const res = await fetch(`${INFLUXDB_URL}/api/v2/query`, {
    method: 'POST',
    headers: {
      Accept: 'application/csv',
      'Content-type': 'application/vnd.flux'
    },
    body: fluxQuery
  })
  // slice(4) to ignoring unwanted rows in csv
  const fluxJson = (await csvToJSON(await res.text())).slice(4)
  const keys = ['eventLocationType', 'timeLabel', 'total', 'time']
  const fluxRes: IMetricsTotalGroupByTime[] = fluxJson
    .slice(0, -1)
    .map((item) => {
      const obj: Partial<IMetricsTotalGroupByTime> = {}
      keys.forEach((key, i) => {
        // item[i+5] to ignore the first 5 values of json & count from index 5
        obj[key] = item[i + 5]
        if (key === 'total') {
          obj[key] = Number(item[i + 5])
        }
      })
      return obj as IMetricsTotalGroupByTime
    })

  return fluxRes
}

function populateGenderBasisMetrics(
  points: IGenderBasisPoint[],
  locationLevel: string
): IGenderBasisMetrics[] {
  const metricsArray: IGenderBasisMetrics[] = []

  points.forEach((point: IGenderBasisPoint) => {
    const metrics = metricsArray.find(
      (element) => element.location === point[locationLevel]
    )
    const femaleOver18 =
      point.gender === 'female'
        ? point.over18
        : metrics
        ? metrics.femaleOver18
        : 0
    const maleOver18 =
      point.gender === 'male' ? point.over18 : metrics ? metrics.maleOver18 : 0
    const femaleUnder18 =
      point.gender === 'female'
        ? point.under18
        : metrics
        ? metrics.femaleUnder18
        : 0
    const maleUnder18 =
      point.gender === 'male'
        ? point.under18
        : metrics
        ? metrics.maleUnder18
        : 0

    const total = maleOver18 + femaleOver18 + maleUnder18 + femaleUnder18

    if (!metrics) {
      metricsArray.push({
        location: point[locationLevel],
        femaleOver18: femaleOver18,
        maleOver18: maleOver18,
        maleUnder18: maleUnder18,
        femaleUnder18: femaleUnder18,
        total: total
      })
    } else {
      const index = metricsArray.indexOf(metrics)

      metricsArray.splice(index, 1, {
        location: metrics.location,
        femaleOver18: femaleOver18,
        maleOver18: maleOver18,
        maleUnder18: maleUnder18,
        femaleUnder18: femaleUnder18,
        total: total
      })
    }
  })

  return metricsArray
}
