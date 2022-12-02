import { GET } from './api'

export const fetchLocations = ({ limit = 0 }) => {
  return GET('Location', { limit })
}

export const fetchPatients = ({ limit = 0 }) => {
  return GET('Patient', { limit })
}
