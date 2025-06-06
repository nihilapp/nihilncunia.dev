import { Common } from './common';
import { Calendar } from './calendar';

export interface Tools {
  common: Common;
  calendar: Calendar;
}

export const tools: Tools = {
  common: new Common(),
  calendar: new Calendar(),
};
