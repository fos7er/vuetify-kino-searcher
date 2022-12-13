import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

export default dayjs
