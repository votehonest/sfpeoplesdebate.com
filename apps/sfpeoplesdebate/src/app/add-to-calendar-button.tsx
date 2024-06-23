'use client';

import { AddToCalendarButton as Inner } from 'add-to-calendar-button-react';

const CALENDAR_EVENT_DESCRIPTION = `Your opportunity to ask questions and hear from the mayoral candidates you haven't heard from at The San Francisco People's Debate for Mayor 2024!

Submit your question online at https://sfpeoplesdebate.com`;

export const AddToCalendarButton = () => {
  return (
    <Inner
      name="The San Francisco People's Debate 2024"
      description={CALENDAR_EVENT_DESCRIPTION}
      startDate="2024-06-01"
      startTime="13:00"
      endTime="15:00"
      timeZone="America/Los_Angeles"
      location="The Mexican Liberty Bell at Dolores and 19th Street in Mission Dolores Park"
      recurrence="weekly"
      recurrence_interval="1"
      recurrence_byDay="SA"
      availability="busy"
      options={['Apple', 'Google', 'iCal', 'Outlook.com', 'Yahoo']}
      // buttonStyle="flat"
      buttonStyle="default"
      hideBackground
    ></Inner>
  );
};

export default AddToCalendarButton;
