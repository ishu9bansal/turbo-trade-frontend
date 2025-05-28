import { type Schema } from '../components/FormRenderer';

const schema: Schema = {
  start_date: { type: 'date' },
  end_date: { type: 'date' },
  capital: { type: 'number' },
  lot_size: { type: 'number' },
  position: {
    type: 'group',
    label: 'Position Configuration',
    fields: {
      per_day_positions_threshold: { type: 'number' },
      entry: {
        type: 'group',
        label: 'Entry Criteria',
        fields: {
          time: { type: 'time' },
        },
      },
      exit: {
        type: 'group',
        label: 'Exit Criteria',
        fields: {
          time: { type: 'time' },
          movement: { type: 'number', optional: true },
        },
      },
      focus: {
        type: 'group',
        label: 'Focus',
        fields: {
          symbol: {
            type: 'select',
            options: ['BANKNIFTY', 'NIFTY'], // Adjust based on your enum values
          },
          step: { type: 'number' },
          expiry: {
            type: 'group',
            fields: {
              weekday: {
                type: 'select',
                options: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
              },
              frequency: {
                type: 'select',
                options: ['WEEKLY', 'MONTHLY'],
              },
            },
          },
        },
      },
      legs: {
        type: 'array',
        label: 'Legs',
        itemFields: {
          strike: {
            type: 'group',
            fields: {
              offset: { type: 'number' },
            },
          },
          type: {
            type: 'select',
            options: ['CALL', 'PUT'],
          },
          transaction: {
            type: 'select',
            options: ['BUY', 'SELL'],
          },
        },
      },
    },
  },
};

export default schema;
