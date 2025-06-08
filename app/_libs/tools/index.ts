import { Calendar } from './calendar';
import { Common } from './common';

export interface Tools {
  common: Common;
  calendar: Calendar;
}

export const tools: Tools = {
  common: new Common(),
  calendar: new Calendar(),
};
