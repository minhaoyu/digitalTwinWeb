import { getShortcuts } from '@/utils/tool'

export const realTimeBatteryLabels = [
  'FCAS Event',
  'Full charge energy',
  'Nominal energy',
  'Expected energy',
  'Date',
  'Charge p max',
  'Discharge p max',
  'Available blocks',
  'Three phase voltage',
  'Three phase current',
  'Three phase power',
  'Three phase reactive power',
  'Three phase apparent power',
  'Power factor',
  'Frequency',
  'Real energy imported',
  'Real energy exported',
  'Reactive energy imported',
  'Reactive energy exported',
  'Apparent energy',
  'Energy price',
  'Raise 6 sec price',
  'Raise 60 sec price',
  'Raise 5 min price',
]
export const realTimeBatteryDict = [
  { label: 'Date ', key: '0', unit: '' },
  { label: 'Full charge energy ', key: '2', unit: 'kWh' },
  { label: 'Nominal energy ', key: '3', unit: 'kWh' },
  { label: 'Expected energy', key: '4', unit: 'kWh' },
  { label: 'Real energy imported', key: '15', unit: 'kWh' },
  { label: 'Real energy exported', key: '16', unit: 'kWh' },
  { label: 'Reactive energy imported', key: '17', unit: 'kVArh' },
  { label: 'Reactive energy exported', key: '18', unit: 'kVArh' },
  { label: 'Energy price ', key: '20', unit: '$/MWh' },
]
export const realTimeBldngDict = [
  { label: 'Date', key: '0', unit: '' },
  { label: 'Time', key: '1', unit: '' },
  { label: 'PV(KW) ', key: '2', unit: '' },
  { label: 'PV(KWh)', key: '3', unit: '' },
]
export const meanBatteryDataLabels = [
  {
    label: 'Full Charge Energy',
    key: 'Full Charge Energy (kWh)',
    unit: 'kWh',
  },
  { label: 'Nominal Energy', key: 'Nominal Energy (kWh)', unit: 'kWh' },
  { label: 'Expected Energy', key: 'Expected Energy (kWh)', unit: 'kWh' },
  { label: 'Charge P Max', key: 'Charge P Max (kW)', unit: 'kW' },
  { label: 'Discharge P Max', key: 'Discharge P Max (kW)', unit: 'kW' },
  { label: 'Available Blocks', key: 'Available Blocks', unit: '' },
  {
    label: 'Three Phase Voltage',
    key: '3 Phase Voltage (V)',
    unit: 'V',
  },
  { label: 'Three Phase Current', key: '3 Phase Current (A)', unit: 'A' },
  { label: 'Three Phase Power', key: '3 Phase Power (kW)', unit: 'kW' },
  {
    label: 'Three Phase Reactive Power',
    key: '3 Phase Reactive Power (kVAr)',
    unit: 'kVAr',
  },
  {
    label: 'Three Phase Apparent Power',
    key: '3 Phase Apparent Power (kVA)',
    unit: 'kVA',
  },

  { label: 'Power Factor', key: 'Power Factor', unit: '' },
  { label: 'Frequency', key: 'Frequency (Hz)', unit: 'Hz' },
  {
    label: 'Real Energy Imported',
    key: 'Real Energy Imported (kWh)',
    unit: 'kWh',
  },
  {
    label: 'Real Energy Exported',
    key: 'Real Energy Exported (kWh)',
    unit: 'kWh',
  },
  {
    label: 'Reactive Energy Imported',
    key: 'Reactive Energy Imported (kVArh)',
    unit: 'kVArh',
  },
  {
    label: 'Reactive Energy Exported',
    key: 'Reactive Energy Exported (kVArh)',
    unit: 'kVArh',
  },
  {
    label: 'Apparent Energy',
    key: 'Apparent Energy (kVAh)',
    unit: 'kVAh',
  },
  { label: 'Energy Price', key: 'Energy Price ($/MWh)', unit: '$/MWh' },

  {
    label: 'Raise 6sec Price',
    key: 'Raise 6sec Price ($/MWh)',
    unit: '$/MWh',
  },

  {
    label: 'Raise 60sec Price',
    key: 'Raise 60sec Price ($/MWh)',
    unit: '$/MWh',
  },

  {
    label: 'Raise 5min Price',
    key: 'Raise 5min Price ($/MWh)',
    unit: '$/MWh',
  },
]

export const miMaxBatteryDataLabels = [
  { label: 'Date', key: 'measurement_time', unit: '' },
  { label: 'Full charge energy (kWh)', key: 'full_charge_energy', unit: 'kWh' },
  { label: 'Nominal energy (kWh)', key: 'nominal_energy', unit: 'kWh' },
  { label: 'Expected energy (kWh)', key: 'expected_energy', unit: 'kWh' },
  { label: 'Charge p max (kW)', key: 'charge_p_max', unit: 'kW' },
  { label: 'Discharge p max (kW)', key: 'discharge_p_max', unit: 'kW' },
  { label: 'Available blocks', key: 'available_blocks', unit: '' },
  { label: 'Three phase voltage (V)', key: '_3_phase_voltage', unit: 'V' },
  { label: 'Three phase current (A)', key: '_3_phase_current', unit: 'A' },
  { label: 'Three phase power (kW)', key: '_3_phase_power', unit: 'kW' },
  {
    label: 'Three phase reactive power (kVAr)',
    key: '_3_phase_reactive_power',
    unit: 'kVAr',
  },
  {
    label: 'Three phase apparent power (kVAr)',
    key: '_3_phase_apparent_power',
    unit: 'kVA',
  },
  { label: 'Power factor', key: 'power_factor', unit: '' },
  { label: 'Frequency (Hz)', key: 'frequency', unit: 'Hz' },
  {
    label: 'Real energy imported (kWh)',
    key: 'real_energy_imported',
    unit: 'kWh',
  },
  {
    label: 'Real energy exported (kWh)',
    key: 'real_energy_exported',
    unit: 'kWh',
  },
  {
    label: 'Reactive energy imported (kVArh)',
    key: 'reactive_energy_imported',
    unit: 'kVArh',
  },
  {
    label: 'Reactive energy exported (kVArh)',
    key: 'reactive_energy_exported',
    unit: 'kVArh',
  },
  { label: 'Apparent energy (kVArh)', key: 'apparent_energy', unit: 'kVAh' },
  { label: 'Energy price ($/MWh)', key: 'energy_price', unit: '$/MWh' },
  { label: 'Raise 6 sec price ($/MWh)', key: 'raise_6_sec_price', unit: '$/MWh' },
  {
    label: 'Raise 60 sec price ($/MWh)',
    key: 'raise_60_sec_price',
    unit: '$/MWh',
  },
  { label: 'Raise 5 min price ($/MWh)', key: 'raise_5_min_price', unit: '$/MWh' },
]

export const realtimeBatteryUnit = [
  '%',
  'kWh',
  'kWh',
  'kWh',
  '',
  'kW',
  'kW',
  '',
  'V',
  'A',
  'kW',
  'kVAr',
  'kVA',
  '',
  'Hz',
  'kWh',
  'kWh',
  'kVArh',
  'kVArh',
  'kVAh',
  '$/MWh',
  '$/MWh',
  '$/MWh',
  '$/MWh',
]

export const typeOptions = [
  {
    value: 'battery',
    label: 'Tesla Battery',
  },
  {
    value: 'bldng_049',
    label: 'Building 49',
  },
  {
    value: 'bldng_078',
    label: 'Building 78',
  },
]

export const bldngDict = [
  { label: 'ID', key: 'id', unit: '' },
  { label: 'Date', key: 'date', unit: '' },
  { label: 'Time', key: 'time', unit: '' },
  { label: 'PV KW', key: 'pv_w', unit: '' },
  { label: 'PV KWH', key: 'pv_wh', unit: '' },
  { label: 'Date Time', key: 'date_time', unit: '' },
]

export const dateIntervalSelectOptions = [
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'quarter',
  'year',
]

export const shortcuts = [
  {
    text: 'Last hour',
    value: getShortcuts(1),
  },
  {
    text: 'Last 4 hours',
    value: getShortcuts(4),
  },
  {
    text: 'Last 8 hours',
    value: getShortcuts(8),
  },
  {
    text: 'Last 24 hours',
    value: getShortcuts(24),
  },
  {
    text: 'Last week',
    value: getShortcuts(24 * 7),
  },
  {
    text: 'Last month',
    value: getShortcuts(24 * 30),
  },
  {
    text: 'Last 3 months',
    value: getShortcuts(24 * 90),
  },
]

export const fieldsOption = {
  battery: miMaxBatteryDataLabels,
  bldng_049: [
    { label: 'PV (KW)', key: 'pv_w', unit: '' },
    { label: 'PV (KWH)', key: 'pv_wh', unit: '' },
  ],
  bldng_078: [
    { label: 'PV (KW)', key: 'pv_w', unit: '' },
    { label: 'PV (KWH)', key: 'pv_wh', unit: '' },
  ],
}

export const yAxisIndexDict = {
  pv_w: 0,
  pv_wh: 0,
}
