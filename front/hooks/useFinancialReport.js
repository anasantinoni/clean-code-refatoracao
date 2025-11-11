import { useState, useEffect } from "react";
import { useDatabase } from "../database/useDatabase";

const STATUS = {
  RECEIVABLE: 1, 
  PAYABLE: 2,   
};

export const useFinancialReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [financialData, setFinancialData] = useState([]); 
  const { getFinanceiros } = useDatabase();

  const loadFinancialData = async () => {
    try {
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];
      const response = await getFinanceiros({ startDate: start, endDate: end }); 
      setFinancialData(response);
    } catch (error) {
      console.error("Error loading financial data:", error); 
    }
  };

  const calculateTotals = () => {
    let totalReceivable = 0;
    let totalPayable = 0;

    financialData.forEach((item) => {
      if (item.status === STATUS.RECEIVABLE) {
          totalReceivable += item.valor;
      } else if (item.status === STATUS.PAYABLE) {
          totalPayable += item.valor;
      }
    });

    return { totalReceivable, totalPayable };
  };

  useEffect(() => {
    loadFinancialData();
  }, [startDate, endDate]);

  const { totalReceivable, totalPayable } = calculateTotals();

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    totalReceivable,
    totalPayable,
  };
};