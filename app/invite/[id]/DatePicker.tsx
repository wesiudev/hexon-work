"use client";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { css } from "@emotion/css";
import dayjs from "dayjs";
import moment from "moment";
export default function BasicDatePicker({
  data,
  setData,
}: {
  data: any;
  setData: any;
}) {
  const handleDateChange = (e: any) => {
    setData({ ...data, date: dayjs(e.format("MM-DD-YYYY")) });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        className={css`
          padding: 2px;
          background-color: white;
        `}
        components={["DatePicker"]}
      >
        <DatePicker
          onChange={(e: any) => handleDateChange(e)}
          value={data.date}
          className={css`
            border-color: white;
            background-color: white;
            color: white;
            outline: white;
          `}
          label="Wybierz datę"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
