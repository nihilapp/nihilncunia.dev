import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
import { Common } from './common';

export interface DateInfo {
  year: string;
  nextYear: string;
  prevYear: string;
  month: string;
  nextMonth: string;
  prevMonth: string;
  date: string;
  day: number;
  dayString: string;
  hour: string;
  minute: string;
  endDate: string;
}

export interface CalendarMonthData {
  date: string;
  fullDate: string;
  isActive: boolean,
}

export interface CalendarTimeData {
  value: string;
  label: string;
}

export interface CalendarTime {
  hours: CalendarTimeData[];
  minutes: CalendarTimeData[];
}

export interface MonthData {
  nowDate: string;
  nowTime: string;
  now: string;
  prev: string;
  next: string;
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale(ko);

export class Calendar {
  public date(date?: (string | number | Date)) {
    return dayjs(date || new Date()).tz('Asia/Seoul');
  }

  public getDateInfo(date?: (string | number | Date)): DateInfo {
    const year = this.date(date).get('year').toString();
    let month = this.date(date).get('month').toString();
    month = (+month + 1) < 10 ? `0${+month + 1}` : `${+month + 1}`;

    let nowDate = this.date(date).get('date').toString();
    nowDate = +nowDate < 10 ? `0${nowDate}` : nowDate;

    const day = this.date(date).get('day');

    const endDate = this
      .date(new Date(+year, +month, 0))
      .get('date').toString();

    const dayToString = {
      0: '일요일',
      1: '월요일',
      2: '화요일',
      3: '수요일',
      4: '목요일',
      5: '금요일',
      6: '토요일',
    };

    let hour = this.date(date).get('hour').toString();
    hour = +hour < 10 ? `0${hour}` : hour;

    let minute = this.date(date).get('minute').toString();
    minute = +minute < 10 ? `0${minute}` : minute;

    let prevMonth = this.date(date)
      .add(-1, 'month')
      .get('month').toString();
    prevMonth = (+prevMonth + 1) < 10 ? `0${+prevMonth + 1}` : `${+prevMonth + 1}`;

    let nextMonth = this.date(date)
      .add(1, 'month')
      .get('month').toString();
    nextMonth = (+nextMonth + 1) < 10 ? `0${+nextMonth + 1}` : `${+nextMonth + 1}`;

    let prevYear: string;
    let nextYear: string;

    if (month === '12') {
      prevYear = year;
      nextYear = (+year + 1).toString();
    } else if (month === '01') {
      prevYear = (+year - 1).toString();
      nextYear = year;
    } else {
      prevYear = year;
      nextYear = year;
    }

    return {
      year,
      prevYear,
      nextYear,
      month,
      prevMonth,
      nextMonth,
      date: nowDate,
      day,
      dayString: dayToString[day],
      hour,
      minute,
      endDate,
    };
  }

  public getNowDate() {
    const { year, month, date, } = this.getDateInfo();

    return `${year}-${month}-${date}`;
  }

  public monthData(date?: string | number | Date): MonthData {
    const initDate = this.getDateInfo(date);

    let dateData = this.getDateInfo(`${initDate.year}-${initDate.month}-01`);
    const nowDate = `${initDate.year}-${initDate.month}-${initDate.date}`;
    const nowTime = `${initDate.hour}:${initDate.minute}`;

    return {
      nowDate,
      nowTime,
      now: `${dateData.year}-${dateData.month}`,
      prev: `${dateData.prevYear}-${dateData.prevMonth}`,
      next: `${dateData.nextYear}-${dateData.nextMonth}`,
    };
  }

  public monthArray(date?: string | number | Date) {
    const monthData = this.monthData(date);

    let dateData = this.getDateInfo(`${monthData.now}-01`);

    const monthStartDay = dateData.day;
    const monthEndDate = dateData.endDate;

    const prevDateData = this.getDateInfo(`${dateData.prevYear}-${dateData.prevMonth}`);

    const prevMonthEndDate = prevDateData.endDate;

    const dateOfMonth: CalendarMonthData[] = [];

    for (let i = monthStartDay; i > 0; i--) {
      const nowDate = +prevMonthEndDate - i + 1 < 10
        ? `0${+prevMonthEndDate - i + 1}`
        : (+prevMonthEndDate - i + 1).toString();

      dateOfMonth.push({
        date: nowDate,
        fullDate: `${dateData.prevYear}-${dateData.prevMonth}-${nowDate}`,
        isActive: false,
      });
    }

    for (let i = 1; i <= +monthEndDate; i++) {
      const nowDate = i < 10
        ? `0${i}`
        : (i).toString();

      dateOfMonth.push({
        date: nowDate,
        fullDate: `${dateData.year}-${dateData.month}-${nowDate}`,
        isActive: true,
      });
    }

    for (let i = dateOfMonth.length, n = 1; i < 42; i++, n++) {
      const nowDate = n < 10
        ? `0${n}`
        : (n).toString();

      dateOfMonth.push({
        date: nowDate,
        fullDate: `${dateData.nextYear}-${dateData.nextMonth}-${nowDate}`,
        isActive: false,
      });
    }

    const common = new Common();

    return common.arraySlice<CalendarMonthData>(dateOfMonth, 7);
  }

  public timeData(): CalendarTime {
    const hours: CalendarTimeData[] = new Array(24)
      .fill(0)
      .map((item: number, index) => {
        const value = (item + index) < 10
          ? `0${item + index}`
          : (item + index).toString();

        return {
          value,
          label: `${value}시`,
        };
      });

    const minutes: CalendarTimeData[] = new Array(61)
      .fill(0)
      .map((item: number, index) => {
        const value = (item + index) < 10
          ? `0${item + index}`
          : (item + index).toString();

        return {
          value,
          label: `${value}분`,
        };
      });

    return {
      hours,
      minutes,
    };
  }

  public dateToFormat(
    date?: (string | number | Date),
    format?: string
  ) {
    return this.date(date).format(format || 'YYYY년 MM월 DD일');
  }

  public dateToTimeFormat(
    date?: (string | number | Date),
    format?: string
  ) {
    return this.date(date).format(format || 'YYYY년 MM월 DD일 HH:mm');
  }

  public UTCString(date?: (string | number | Date)) {
    return this.date(date).toISOString();
  }
}
